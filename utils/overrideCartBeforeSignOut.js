export async function overrideCartBeforeSignOut(userId, cart, supabaseClient) {
    if (!userId) {
        console.warn('无法覆盖服务器购物车：缺少 userId')
        return
    }

    if (!cart || cart.length === 0) {
        // 清空服务器购物车
        await supabaseClient.from('carts').delete().eq('user_id', userId)
        return
    }

    try {
        // 构建去重后的插入数据
        const toInsert = cart.reduce((acc, item) => {
            const existing = acc.find(i => i.course_id === item.id)
            if (existing) {
                existing.quantity = (existing.quantity || 0) + (item.quantity || 1)
            } else {
                acc.push({
                    user_id: userId,
                    course_id: item.id,
                    quantity: item.quantity || 1,
                })
            }
            return acc
        }, [])

        // 使用upsert操作
        const { error } = await supabaseClient
            .from('carts')
            .upsert(toInsert, { onConflict: ['user_id', 'course_id'] })

        if (error) throw error
        console.log('✅ 服务器购物车已成功更新')
    } catch (err) {
        console.error('覆盖购物车失败:', err)
    }
}