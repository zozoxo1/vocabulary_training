import { Vocabulary } from './Vocabulary'
import languages from '@/utils/languages.json'

class Stack {
	public _id?: any
	public lang_a: string = ''
	public lang_b: string = ''
	public stack_default: Vocabulary[] = []
	public stack_training: Vocabulary[] = []
	public stack_expanded: Vocabulary[] = []
	public stack_checked: Vocabulary[] = []

	constructor(
		lang_a: string,
		lang_b: string,
		stack_default: Vocabulary[],
		stack_training: Vocabulary[],
		stack_expanded: Vocabulary[],
		stack_checked: Vocabulary[]
	) {
		this.lang_a = lang_a
		this.lang_b = lang_b
		this.stack_default = stack_default
		this.stack_training = stack_training
		this.stack_expanded = stack_expanded
		this.stack_checked = stack_checked
	}

	/*public get trainingBegan(): boolean {
		return this.stack_default.length < this.stackSize
	}*/
}

export { Stack }
