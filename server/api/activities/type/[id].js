// api/activities/type/:id
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const { id } = event.context.params

    if (!id) {
        return createError({ statusCode: 400, statusMessage: 'Missing type id in route' })
    }

    // 并行获取课程数据和活动类型描述
    const [coursesResult, typeResult] = await Promise.all([
        // 获取课程数据
        client
            .from('Course')
            .select(`id, name, description, Type, img, Teach(Teacher:teacher(id,name,surname,img)), price, oldPrice,schedule`)
            .eq('Type', id),

        // 获取活动类型描述
        client
            .from('ActivityType')
            .select('description')
            .eq('typeName', id)
            .single()
    ])

    // 错误处理
    if (coursesResult.error) {
        console.error('Courses query error:', coursesResult.error)
        return createError({ statusCode: 500, statusMessage: 'Failed to fetch courses' })
    }

    if (typeResult.error) {
        console.error('ActivityType query error:', typeResult.error)
        // 不返回错误，只是记录日志，description设为空
    }

    // 组合返回数据
    return {
        courses: coursesResult.data || [],
        typeDescription: typeResult.data?.description || '',
        typeName: id
    }
})