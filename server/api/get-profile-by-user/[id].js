import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event)
    const profileId = event.context.params.id // 从URL路径获取id

    try {
        // 1. 验证当前用户身份
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            throw createError({
                statusCode: 401,
                statusMessage: '需要登录才能访问资料'
            })
        }

        // 2. 检查请求的是否是自己的用户ID
        if (user.id !== profileId) {
            throw createError({
                statusCode: 403,
                statusMessage: '只能查看自己的资料'
            })
        }

        // 3. 查询用户资料
        const { data: profile, error: profileError } = await supabase
            .from('Profiles')
            .select(`
        id,
        created_at,
        username,
        name,
        surname,
        "phoneNumber",
        email,
        age
      `)
            .eq('id', profileId)
            .single()

        if (profileError) throw profileError

        if (!profile) {
            throw createError({
                statusCode: 404,
                statusMessage: '用户资料不存在'
            })
        }

        return profile

    } catch (error) {
        console.error('获取资料失败:', error)

        // 如果是我们主动抛出的错误，直接传递
        if (error.statusCode) {
            throw error
        }

        // 其他数据库错误
        throw createError({
            statusCode: 500,
            statusMessage: '获取用户资料失败',
            data: error.message
        })
    }
})