import { createRouter, createWebHistory, RouterView } from 'vue-router'
import i18n from '@/i18n/i18n'
import locales from '@/i18n/locales'
import HomeView from '@/views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale',
      component: RouterView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'projects',
          name: 'projects',
          component: ProjectView,
        },
        {
          path: ':catchAll(.*)',
          name: '404',
          component: NotFoundView,
        },
      ],
    },
    {
      path: '/',
      redirect(to) {
        const cookies: { [key: string]: string | undefined } =
          Object.fromEntries(
            document.cookie.split('; ').map((el) => el.split('=', 2)),
          )
        const cookieLocale = cookies['locale'] as
          | typeof locales[number]
          | undefined
        const locale =
          cookieLocale && locales.includes(cookieLocale)
            ? cookieLocale
            : i18n.global.locale
        const routeTo = ['', locale]
        if (to.path && to.path !== '/') {
          routeTo.push(to.path)
        }
        return routeTo.join('/')
      },
    },
  ],
  scrollBehavior(to, from) {
    if (to.name == 'home') {
      return { top: 0 }
    }
    if (to.name === from.name) {
      return { top: 400, behavior: 'smooth' }
    }
    return { top: 200 }
  },
})
router.beforeEach((to) => {
  const cookies: { [key: string]: string | undefined } = Object.fromEntries(
    document.cookie.split('; ').map((el) => el.split('=', 2)),
  )
  const cookieLocale = cookies['locale'] as typeof locales[number] | undefined
  const lang = to.params.locale as typeof locales[number]
  if (!lang || typeof lang === 'object' || !locales.includes(lang)) {
    const redirect = {
      name: to.name || '',
      params: { locale: i18n.global.locale },
    }
    if (cookieLocale && locales.includes(cookieLocale)) {
      redirect.params.locale = cookieLocale
    }
    return redirect
  }
  i18n.global.locale = lang
})

export default router
