import { shallowMount } from '@vue/test-utils'
import Home from '@/views/TrainingView.vue'

describe('Home.vue', () => {
	it('renders props.msg when passed', () => {
		const msg: string = 'new message'
		const wrapper: any = shallowMount(Home, {
			props: { msg },
		})
		console.log(wrapper.text())
		expect(wrapper.text()).toMatch(msg)
	})
})
