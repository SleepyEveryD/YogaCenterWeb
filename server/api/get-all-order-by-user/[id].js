import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event)
    const requestedUserId = event.context.params.userId

    try {
        // 1. 验证当前用户身份
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            throw createError({
                statusCode: 401,
                statusMessage: '需要登录才能访问订单'
            })
        }

        // 2. 检查请求的是否是自己的用户ID
        if (user.id !== requestedUserId) {
            throw createError({
                statusCode: 403,
                statusMessage: '只能查看自己的订单'
            })
        }

        // 3. 查询订单数据（带关联的订单项和课程信息）
        const { data: orders, error: queryError } = await supabase
            .from('Orders')
            .select(`
        id,
        stripeId,
        created_at,
        orderItem:OrderItem(
          id,
          created_at,
          course:Course(
            id,
            name,
            description,
            "Type",
            img,
            star,
            price,
            "oldPrice",
            "maximumStudent"
          )
        )
      `)
            .eq('userId', user.id)  // 确保只查询当前用户的订单
            .order('created_at', { ascending: false })

        if (queryError) throw queryError

        // 4. 格式化返回数据
        const formattedOrders = orders.map(order => ({
            ...order,
            orderItems: order.orderItem.map(item => ({
                ...item,
                course: {
                    ...item.course,
                    // 确保数组字段正确处理
                    img: item.course.img || []
                }
            }))
        }))

        return formattedOrders

    } catch (error) {
        console.error('订单查询错误:', error)

        // 如果是我们主动抛出的错误，直接传递
        if (error.statusCode) {
            throw error
        }

        // 其他数据库错误
        throw createError({
            statusCode: 500,
            statusMessage: '获取订单数据失败',
            data: error.message
        })
    }
})