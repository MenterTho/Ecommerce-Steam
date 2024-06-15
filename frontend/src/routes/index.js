import Home from '~/pages/Home'
import Gamedetails from '~/pages/GameDetails'
import Profile from '~/pages/Profile'
import Admin from '~/pages/Admin'
import Search from '~/pages/Search'

// Cho mọi tài khoản publicRoutes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/gamedetails', component: Gamedetails },
    { path: '/search', component: Search },
]

// Đăng nhập mới vào được
const privateRoutes = [
    { path: '/admin', component: Admin, layout: null },
    { path: '/profile', component: Profile },
]

export { publicRoutes, privateRoutes }
