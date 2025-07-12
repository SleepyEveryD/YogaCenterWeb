import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    // ✅ 获取动态路径参数 /api/activities/type/:id
    const { id } = event.context.params

    if (!id) {
        return createError({ statusCode: 400, statusMessage: 'Missing type id in route' })
    }

    const { data, error } = await client
        .from('Course')
        .select(`id, name, description, Type, img, Teach(Teacher:teacher(id,name,surname,img)), price, oldPrice`)
        .eq('Type', id) // ✅ 用动态路径参数做筛选

    if (error) {
        console.error('Supabase error:', error)
        return createError({ statusCode: 500, statusMessage: 'Supabase query failed' })
    }

    return data || []
})
