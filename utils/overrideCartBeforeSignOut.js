// utils/overrideCartBeforeSignOut.js

export async function overrideCartBeforeSignOut(userId, cart, supabaseClient) {
    if (!userId || !cart || cart.length === 0) {
        console.warn('无法覆盖服务器购物车：缺少 userId 或 cart 内容为空')
        return
    }

    try {
        // Step 1: 删除该用户原有的购物车内容
        const { error: deleteError } = await supabaseClient
            .from('carts')
            .delete()
            .eq('user_id', userId)

        if (deleteError) {
            console.error('删除服务器购物车失败:', deleteError)
            return
        }

        // Step 2: 插入当前前端 cart 数据
        const toInsert = cart.map(item => ({
            user_id: userId,
            course_id: item.id,
            quantity: item.quantity || 1,
        }))

        const { error: insertError } = await supabaseClient
            .from('carts')
            .insert(toInsert)

        if (insertError) {
            console.error('插入购物车失败:', insertError)
        } else {
            console.log('✅ 服务器购物车已成功被覆盖')
        }
    } catch (err) {
        console.error('覆盖购物车时发生异常:', err)
    }
}
