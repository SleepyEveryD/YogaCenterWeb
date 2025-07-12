export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser()

    // 若用户已登录，则跳转首页
    if (user.value) {
        return navigateTo('/')
    }
})
