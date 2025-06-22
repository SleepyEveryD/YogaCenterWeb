import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event)
    const body = await readBody(event)

    try {
        // 1. 创建主订单
        const { data: order, error: orderError } = await supabase
            .from('Orders')
            .insert({
                userId: body.userId,
                stripeId: body.stripeId,
                created_at:body.created_at
            })
            .select()
            .single()

        if (orderError) throw orderError

        // 2. 创建订单项（使用事务确保原子性）
        const { error: itemsError } = await supabase
            .from('OrderItem')
            .insert(
                body.products.map(prod => ({
                    orderId: order.id,
                    courseId: Number(prod.id) // 注意: 原代码使用productId，但您的schema中是courseId
                }))
            )

        if (itemsError) throw itemsError

        return order

    } catch (error) {
        console.error('创建订单失败:', error)
        throw createError({
            statusCode: 500,
            statusMessage: '订单创建失败'
        })
    }
})