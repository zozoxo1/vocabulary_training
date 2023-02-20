import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Page from '../components/Page.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/training',
	},
	{
		path: '/',
		component: Page,
		children: [
			{
				path: '',
				redirect: '/training',
			},
			{
				path: 'training',
				component: () => import('../views/TrainingView.vue'),
			},
			{
				path: 'vocabulary',
				component: () => import('../views/VocabularyView.vue'),
			},
			{
				path: 'credits',
				component: () => import('../views/CreditsView.vue'),
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
