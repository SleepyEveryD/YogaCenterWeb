// server/api/starred.js
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const { data, error } = await client
        .from('Course')
        .select(`id, name, description, Type, img, star, Teach(Teacher:teacher(id,name,surname,img)), price, oldPrice`)
        .eq('star', true)

    if (error) {
        console.error('Supabase error:', error)
        return createError({ statusCode: 500, statusMessage: 'Supabase query failed' })
    }

    return data || []
})
