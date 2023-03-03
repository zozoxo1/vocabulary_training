import { Stack } from '@/utils/Stack'
import { Vocabulary } from '@/utils/Vocabulary'
import { singleton } from 'tsyringe'
import Api from './Api.Service'

class Person {
	private geburtsdatum: Date = new Date()
	private vorname: string = ' '
	private nachname: string = ' '
	constructor(
		vorname: string,
		nachname: string,
		geburtsdatum: Date = new Date()
	) {
		this.vorname = vorname
		this.nachname = nachname
		this.geburtsdatum = geburtsdatum
	}
}

@singleton()
class StackService extends Api {
	public async addStack(
		language_code_a: string,
		language_code_b: string
	): Promise<Stack[]> {
		const response = await this.post<any>('/stack', {
			spracheA: language_code_a,
			spracheB: language_code_b,
		})

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async deleteStack(stack_id: string): Promise<Stack[]> {
		const response = await this.delete<any>('/stack/' + stack_id)

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async addVocabulary(
		vocabulary: Vocabulary,
		stack_id: string
	): Promise<Stack[]> {
		const response = await this.post<any>('/card/' + stack_id, {
			word: vocabulary.getWord,
			translation: vocabulary.getTranslation,
			description: vocabulary.getDescription,
		})

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async getStacks(): Promise<Stack[]> {
		const response = await this.get<any>('/stack')
		if (response === undefined) {
			throw new Error('Communication error')
		}

		const stacks: Stack[] = new Array<Stack>()

		for (const stack of response) {
			const vocabularies_default: Vocabulary[] = new Array<Vocabulary>()
			const vocabularies_training: Vocabulary[] = new Array<Vocabulary>()
			const vocabularies_expanded: Vocabulary[] = new Array<Vocabulary>()
			const vocabularies_checked: Vocabulary[] = new Array<Vocabulary>()

			for (const vocab of stack.StandartStapel) {
				vocabularies_default.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			for (const vocab of stack.Trainingsstapel) {
				vocabularies_training.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			for (const vocab of stack.ErweiterterStapel) {
				vocabularies_expanded.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			for (const vocab of stack.gepruefterStapel) {
				vocabularies_checked.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			stacks.push(
				new Stack(
					stack._id,
					stack.spracheA,
					stack.spracheB,
					vocabularies_default,
					vocabularies_training,
					vocabularies_expanded,
					vocabularies_checked
				)
			)
		}

		return stacks
	}

	public async getTrainingStacks(): Promise<Stack[]> {
		const response = await this.get<any>('/stack')
		if (response === undefined) {
			throw new Error('Communication error')
		}

		const stacks: Stack[] = new Array<Stack>()

		for (const stack of response) {
			const vocabularies_default: Vocabulary[] = new Array<Vocabulary>()
			const vocabularies_training: Vocabulary[] = new Array<Vocabulary>()
			const vocabularies_expanded: Vocabulary[] = new Array<Vocabulary>()
			const vocabularies_checked: Vocabulary[] = new Array<Vocabulary>()

			for (const vocab of stack.StandartStapel) {
				vocabularies_default.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			for (const vocab of stack.Trainingsstapel) {
				vocabularies_training.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			for (const vocab of stack.ErweiterterStapel) {
				vocabularies_expanded.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			for (const vocab of stack.gepruefterStapel) {
				vocabularies_checked.push(
					new Vocabulary(
						vocab.id,
						vocab.word,
						vocab.translation,
						vocab.description
					)
				)
			}

			if (
				vocabularies_training.length > 0 ||
				vocabularies_expanded.length > 0 ||
				vocabularies_checked.length > 0
			) {
				stacks.push(
					new Stack(
						stack._id,
						stack.spracheA,
						stack.spracheB,
						vocabularies_default,
						vocabularies_training,
						vocabularies_expanded,
						vocabularies_checked
					)
				)
			}
		}

		return stacks
	}

	public async getPersonen(): Promise<Person[]> {
		const response = await this.get<Person[]>('/personenListe')
		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async addPerson(): Promise<Person[]> {
		const response = await this.post<Person[]>('/person')
		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async deletePerson(id: string): Promise<Person[]> {
		const response = await this.delete<Person[]>('/person/' + id)
		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}
}

export { Person, StackService }
