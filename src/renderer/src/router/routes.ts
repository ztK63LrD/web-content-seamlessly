// 对外暴露路由(常量路由)
export const constantRoute = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@renderer/views/home/index.vue'),
        meta: {
            title: '首页',
        }
    },
    {
        path: '/imageGallery',
        name: 'imageGallery',
        component: () => import('@renderer/views/imageGallery/index.vue'),
        meta: {
            title: '收藏图库',
        }
    },
]