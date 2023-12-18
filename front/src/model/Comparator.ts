export default class Comparator {
    private focusedIndex = 0;
    private actual: string[];
    
    constructor(private expected: string[], private tolerance: number = 0) {
        this.actual = expected.map(() => '');
    }

    /**
     * @returns List of words being compared to the expected actual value.
     */
    public getActual(): string[] {
        return this.actual;
    }

    /**
     * @returns List of words used as a reference to evaluate actual value.
     */
    public getExpected(): string[] {
        return this.expected;
    }

    /**
     * Adds character to the typed sentence and updates the cursor position.
     * @param char Character to be added.
     * @returns True if character was successfully added, false otherwise.
     */
    public add(char: string): boolean {
        if (!this.canAddCharacter() || !this.canMoveForward()) {
            return false;
        }
        this.updateTypeSentence(char);
        return true;
    }

    /**
     * Removes a character or an entire word from the typed sentence.
     * @param entireWord If true, removes the entire word.
     * @returns True if removal was successful, false otherwise.
     */
    public remove(entireWord: boolean = false): boolean {
        if (this.focusedOnBeginning() && !this.canMoveBackwards()) {
            return false
        }

        if (entireWord) {
            this.removeWord();
        } else {
            this.removeChar();
        }
        return true;
    }

    private updateTypeSentence(char: string): void {
        if (char === " " && this.canMoveForward()) {
            this.moveToNextWord();
        } else {
            this.expected[this.focusedIndex] += char;
        }
    }

    private removeWord(): void {
        if (this.canMoveBackwards()) {
            this.moveToPrevWord();
        }
        this.actual[this.focusedIndex] = "";
    }

    private removeChar(): void {
        if (this.canMoveBackwards()) {
            this.moveToPrevWord();
            return;
        }

        if (!this.canRemoveCharacter()) {
            return;
        }
        this.actual[this.focusedIndex] = this.actual[this.focusedIndex].slice(0, -1);
    }

    private focusedOnBeginning(): boolean {
        return this.focusedIndex === 0;
    }

    private moveToNextWord() {
        this.focusedIndex++;
    }

    private moveToPrevWord() {
        this.focusedIndex--;
    }

    private getFocused(): string {
        return this.actual[this.focusedIndex];
    }

    private canAddCharacter(): boolean {
        return (this.expected[this.focusedIndex].length + 
               this.tolerance - this.getFocused().length) > 0;
    }

    private canRemoveCharacter(): boolean {
        return this.getFocused().length > 0;
    }
    
    private canMoveForward(): boolean {
        return this.getFocused().length > 0 &&
                    this.focusedIndex < this.expected.length;
    }

    private canMoveBackwards(): boolean {
        const prevExpect = this.expected[this.focusedIndex - 1];
        const prevActual = this.expected[this.focusedIndex - 1];
        return prevExpect !== prevActual && this.getFocused().length === 0 && this.focusedIndex > 0;
    }
}