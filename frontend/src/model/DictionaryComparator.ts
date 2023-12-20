/**
 * DictionaryComparator class responsible for comparing the difference between
 * the typed sentence and the reference sentence.
 */
export default class DictionaryComparator {
    private focusIndex: number = 0;
    private comparand: string[];

    /**
     * Creates DictionaryComparator instance.
     * @param reference The reference sentence to compare against.
     * @param tolerance The allowed tolerance in character count for each word.
     */
    constructor(private reference: string[], private tolerance: number = 0) {
        this.comparand = reference.map(() => "");
    }

    /**
     * Appends a character to the current word being typed.
     * @param char The character to append.
     * @returns True if successful, false otherwise.
     */
    public append(char: string): boolean {
        if (this.hasReachedEnd()) {
            return false;
        }

        if (this.canMoveToNextWord() && char === " ") {
            this.moveToNextWord();
            return true;
        } else if (this.canAddCharacter() && char !== " ") {
            this.comparand[this.focusIndex] += char;
            return true;
        }

        return false;
    }

    /**
     * Removes a character or an entire word from the typed sentence.
     * @param entireWord If true, removes the entire word; otherwise, removes a character.
     * @returns True if successful, false otherwise.
     */
    public remove(entireWord: boolean = false): boolean {
        if (!this.canRemove()) {
            return false;
        }

        if (entireWord) {
            this.removeEntireWord();
        } else {
            this.removeCharacter();
        }

        return true;
    }

    /**
     * Retrieves the sentence being compared, composed of the words currently entered.
     * @returns A copy of the sentence being compared, represented as an array of words.
     */
    public getTypedSentence(): string[] {
        return [...this.comparand.slice(0, this.focusIndex + 1)];
    }

    /**
     * Retrieves the reference sentence used for comparison.
     * @returns A copy of the reference sentence, represented as an array of words.
     */
    public getReferenceSentence(): string[] {
        return [...this.reference];
    }

    private canRemove(): boolean {
        return !(this.focusIndex === 0 && this.getFocusedWord() === "") &&
            this.focusIndex < this.reference.length;
    }

    private removeEntireWord(): void {
        // If possible, move the focus to the previous word
        if (this.canMoveToPrevWord()) {
            this.focusIndex--;
        }
        // Clear the current word
        this.comparand[this.focusIndex] = "";
    }

    private removeCharacter(): void {
        if (this.canMoveToPrevWord()) {
            this.focusIndex--;
            return;
        }
        this.comparand[this.focusIndex] = this.comparand[this.focusIndex].slice(0, -1);
    }

    private hasReachedEnd(): boolean {
        return this.focusIndex >= this.reference.length;
    }

    private canMoveToNextWord(): boolean {
        return (this.getFocusedWord().length > 0) && (this.focusIndex < this.reference.length - 1);
    }

    private canMoveToPrevWord(): boolean {
        const prevExp = this.comparand[this.focusIndex - 1];
        const prevRef = this.reference[this.focusIndex - 1];

        return this.focusIndex > 0 && this.focusIndex <= this.reference.length && prevExp !== prevRef && this.getFocusedWord() === "";
    }

    private canAddCharacter(): boolean {
        return (this.reference[this.focusIndex].length + this.tolerance - this.getFocusedWord().length) > 0;
    }

    private getFocusedWord(): string {
        return this.comparand[this.focusIndex];
    }

    private moveToNextWord(): void {
        this.focusIndex++;
    }
}