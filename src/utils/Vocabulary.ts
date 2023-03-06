class Vocabulary {
	public id: number = 0
	public word: string = ''
	public translation: string = ''
	public description: string = ''

	constructor(word: string, translation: string, description: string) {
		this.word = word
		this.translation = translation
		this.description = description
	}
}

export { Vocabulary }
