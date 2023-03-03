class Vocabulary {
	private id: number = 0
	private word: string = ''
	private translation: string = ''
	private description: string = ''

	constructor(
		id: number,
		word: string,
		translation: string,
		description: string
	) {
		this.id = id
		this.word = word
		this.translation = translation
		this.description = description
	}

	public get getId(): number {
		return this.id
	}

	public get getWord(): string {
		return this.word
	}

	public get getTranslation(): string {
		return this.translation
	}

	public get getDescription(): string {
		return this.description
	}
}

export { Vocabulary }
