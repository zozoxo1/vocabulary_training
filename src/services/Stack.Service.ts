import { Stack } from '@/utils/Stack'
import { Vocabulary } from '@/utils/Vocabulary'
import { singleton } from 'tsyringe'
import Api from './Api.Service'

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

	public async failedCardAnswer(
		stack_id: string,
		card_id: number
	): Promise<Stack[]> {
		const response = await this.put<any>(
			'/stack/failed/' + stack_id + '/' + card_id
		)

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async successCardAnswer(
		stack_id: string,
		card_id: number
	): Promise<Stack[]> {
		const response = await this.put<any>(
			'/stack/success/' + stack_id + '/' + card_id
		)

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

	public async resetTraining(stack_id: string): Promise<Stack[]> {
		const response = await this.put<any>('/stack/reset/' + stack_id)

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async removeVocabulary(
		vocabulary: Vocabulary,
		stack_id: string
	): Promise<Stack[]> {
		const response = await this.delete<any>(
			'/stack/' + stack_id + '/' + vocabulary.id
		)

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
			word: vocabulary.word,
			translation: vocabulary.translation,
			description: vocabulary.description,
		})

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async startTraining(
		stack_id: string,
		amount: number
	): Promise<Stack[]> {
		const response = await this.put<any>('/stack/training/' + stack_id, {
			amount: amount,
		})

		if (response === undefined) {
			throw new Error('Communication error')
		}
		return response
	}

	public async getStack(stack_id: string): Promise<Stack> {
		const response = await this.get<Stack>('/stack/' + stack_id)
		if (response === undefined) {
			throw new Error('Communication error')
		}

		return response
	}

	public async getStacks(): Promise<Stack[]> {
		const response = await this.get<Stack[]>('/stack')
		if (response === undefined) {
			throw new Error('Communication error')
		}

		console.log(response)

		return response
	}

	public async getTrainingStacks(): Promise<Stack[]> {
		const response = await this.get<Stack[]>('/stack')
		if (response === undefined) {
			throw new Error('Communication error')
		}
		const stacks: Stack[] = new Array<Stack>()

		for (const stack of response as Stack[]) {
			if (
				stack.stack_training.length > 0 ||
				stack.stack_expanded.length > 0 ||
				stack.stack_checked.length > 0
			) {
				stacks.push(stack)
			}
		}

		console.log(stacks)

		return stacks
	}
}

export { StackService }
