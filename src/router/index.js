import Vue from 'vue'
import VueRouter from 'vue-router'
//引入login组件
import Login from '../components/Login.vue'
import Home from "../components/Home"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/home",
        component: Home
    }
]

const router = new VueRouter({
    routes
})

//出问题时用
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问
    //from 从哪儿访问
    //next 接着干 next(url)重定向到url上 next()没有参数 继续访问 to
    if (to.path == "/login") return next()
    //获取user
    const userFlag = window.sessionStorage.getItem("user");//取出当前用户
    if (!userFlag) return next("/login")//无值 返回到登录界面
    next()//符合要求继续
})

export default router
