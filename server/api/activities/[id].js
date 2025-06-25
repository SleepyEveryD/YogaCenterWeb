import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const id = event.context.params.id
    const client = await serverSupabaseClient(event)

    try {
        const { data: data, error } = await client
            .from('Course')
            .select(`
        *,
        Teach:Teach (
          Teacher:teacher (
            id,
            name,
            surname,
            description,
            img
          )
        )
      `)
            .order('star', { ascending: false })
            .eq('id', id)
            .single() // 确保只获取单个记录

        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Database Error',
                message: error.message
            })
        }

        if (!data) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Activity not found'
            })
        }


        return data
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
            message: error.message
        })
    }
})