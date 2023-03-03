import { Vocabulary } from './Vocabulary'
import languages from '@/utils/languages.json'

class Stack {
	private _id: string = ''
	private lang_a: string = ''
	private lang_b: string = ''
	private stack_default: Vocabulary[] = []
	private stack_training: Vocabulary[] = []
	private stack_expanded: Vocabulary[] = []
	private stack_checked: Vocabulary[] = []

	constructor(
		_id: string,
		lang_a: string,
		lang_b: string,
		stack_default: Vocabulary[],
		stack_training: Vocabulary[],
		stack_expanded: Vocabulary[],
		stack_checked: Vocabulary[]
	) {
		this._id = _id
		this.lang_a = lang_a
		this.lang_b = lang_b
		this.stack_default = stack_default
		this.stack_training = stack_training
		this.stack_expanded = stack_expanded
		this.stack_checked = stack_checked
	}

	public get stackDefault(): Vocabulary[] {
		return this.stack_default
	}

	public get stackTraining(): Vocabulary[] {
		return this.stack_training
	}

	public get stackExpanded(): Vocabulary[] {
		return this.stack_expanded
	}

	public get stackChecked(): Vocabulary[] {
		return this.stack_checked
	}

	public get stackSize(): number {
		return (
			this.stack_default.length +
			this.stack_training.length +
			this.stack_expanded.length +
			this.stack_checked.length
		)
	}

	public get stackLanguages(): [string, string] {
		let l1 = this.lang_a
		let l2 = this.lang_b

		languages.find((language) => {
			if (language.code === this.lang_a) {
				l1 = language.language
			}

			if (language.code === this.lang_b) {
				l2 = language.language
			}
		})

		return [l1, l2]
	}

	public get languageA(): string {
		return this.lang_a
	}

	public get languageB(): string {
		return this.lang_b
	}

	public get id(): string {
		return this._id
	}
}

export { Stack }
