// server/api/profiles/[id].js
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event)
    const profileId = event.context.params.id // 从URL路径获取id
    const body = await readBody(event) // 获取请求体数据

    // 验证当前用户权限
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== profileId) {
        throw createError({
            statusCode: 403,
            statusMessage: '无权限修改此用户资料'
        })
    }

    try {
        // 检查资料是否已存在
        const { data: existingProfile } = await supabase
            .from('Profiles')
            .select('id')
            .eq('id', profileId)
            .single()

        let result

        if (existingProfile) {
            // 更新现有资料
            const { data, error } = await supabase
                .from('Profiles')
                .update({
                    username: body.username,
                    name: body.name,
                    surname: body.surname,
                    "phoneNumber": body.phoneNumber,
                    email: body.email,
                    age: body.age,
                    updated_at: new Date() // 可以添加更新时间
                })
                .eq('id', profileId)
                .select()
                .single()

            if (error) throw error
            result = data
        } else {
            // 创建新资料
            const { data, error } = await supabase
                .from('Profiles')
                .insert({
                    id: profileId, // 使用auth.users的相同ID
                    username: body.username,
                    name: body.name,
                    surname: body.surname,
                    "phoneNumber": body.phoneNumber,
                    email: body.email,
                    age: body.age
                })
                .select()
                .single()

            if (error) throw error
            result = data
        }

        return result

    } catch (error) {
        console.error('资料操作失败:', error)
        throw createError({
            statusCode: 500,
            statusMessage: '资料保存失败',
            data: error.message
        })
    }
})