export default class WordList {
    private active: number = 0;
    private actual: string[] = [];

    constructor(private readonly expected: string[], private readonly mistakes: number) {}

    /** Get list of words being evaluated. */
    public getActual() {
        return this.actual;
    }

    /** Return the list of expected words. */
    public getExpected() {
        return this.expected;
    }

    /**
     * Returns index position of the active word and letter evaluated in the list.
     */
    public getActivePosition() {
        return this.active >= this.expected.length ? undefined : 
            {word: this.active, letter: (this.actual[this.active] || '').length};
    }

    /**
     * Add character to word list to be validated against an expected list.  
     * @param char The characted to be validated against expected words.
     * @returns true if the character was successfully added, else false
     */
    public append(char: string) {
        if (this.active >= this.expected.length) {
            return false;
        }

        const wordsRemaining = this.expected[this.active].length + this.mistakes - (this.actual[this.active] || '').length;
        
        if (this.actual[this.active] && char === " ") { // space jumps to new word 
            this.active++;
            return true;
        } else if (wordsRemaining > 0 && this.expected[this.active] && char !== " ") {
            this.actual[this.active] = (this.actual[this.active] || '') + char;

            // check if you've successfully completed the last word
            if (this.active === this.expected.length - 1 &&
                this.actual[this.active] === this.expected[this.active]) {
                this.active++;
            }
            return true;
        }
        return false;
    }

    /**
     * Removes the last typed character or word from the list to be evaluated. 
     * @param wholeWord Boolean indicating whether to remove the whole word.
     * @returns true if anything was removed from the list, otherwise false.
     */
    public remove(wholeWord: boolean = false): boolean {
        if (this.active >= this.expected.length) {
            // check if the list to evaluate has been completed 
            return false;
        }

        if (wholeWord) {
            if (this.active && !this.actual[this.active] &&
                this.actual[this.active - 1] !== this.expected[this.active - 1]) {
                this.active--;  // move to the previous word
            }

            if (this.actual[this.active]) {
                this.actual = this.actual.slice(0, -1);
                return true;
            }
            return false;
        }

        // removing a single character from the list
        if (this.actual[this.active]) {
            this.actual[this.active] = this.actual[this.active].slice(0, -1);

            if (this.actual[this.active] === '') {
                this.actual = this.actual.slice(0, -1);
            }
            return true;
        }

        if (this.active) {
            if (this.actual[this.active - 1] !== this.expected[this.active - 1]) {
                this.active--;
                return true;
            }
        }
        return false;
    }
}
