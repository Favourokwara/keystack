/**
 * Object responsible for comparing a typed sentence with a reference sentence,
 * tracking errors and cursor position.
 */
export default class SentenceComparator {
    private cursorIndex: number = 0;
    private typedSentence: string[];

    constructor(private reference: string[], private mistakeLimit: number = 0) {
        // initialized typed sentences
        this.typedSentence = this.reference.map(() => "");
    }

    /**
     * Adds character to the typed sentence and updates the cursor position.
     * @param char Character to be added.
     * @returns True if character was successfully added, false otherwise.
     */
    public add(char: string): boolean {
        if (this.cursorAtEnd() || !this.canAddCharacter(char)){
            return false;
        }

        this.updateTypedSentence(char);
        return true;
    }

    /**
     * Removes a character or an entire word from the typed sentence. 
     * @param entireWord If true, removes the entire word.
     * @returns True if removal was successful, false otherwise.
     */
    public remove(entireWord: boolean = false): boolean {
        if (this.cursorAtBeginning() && this.getCurrentWord() === "") {
            return false;
        }

        if (entireWord) {
            this.removeEntireWord();
        } else {
            this.removeCharacter();
        }
        return true;
    }

    public getCursorIndex() {
        return this.cursorIndex;
    }

    private canAddCharacter(char: string): boolean {
        const remainder = 
            this.reference[this.cursorIndex].length +
            this.mistakeLimit -
            this.getCurrentWord().length;
        
        if (char === " " && this.getCurrentWord() == "") {
            return false;
        }
        
        return remainder > 0 || (char === " ");
    }

    private updateTypedSentence(char: string): void {
        const isEmpty = this.getCurrentWord() === "";

        if (!isEmpty && char === " ") {
            this.moveToNextWord();
        } else {
            this.typedSentence[this.cursorIndex] += char;
        }
    }

    private removeEntireWord(): void {
        if (this.getCurrentWord() === "" && this.cursorIndex > 0) {
            this.cursorIndex--;
        }
        this.typedSentence[this.cursorIndex] = "";
    }

    private removeCharacter(): void {
        if (
            this.canMoveToPreviousWord() ||
            this.getCurrentWord() === "" &&
            !this.canRemoveCharacter()
        ) {
            return;
        }
        
        this.typedSentence[this.cursorIndex] =
            this.typedSentence[this.cursorIndex].slice(0, -1);
    }

    private canMoveToPreviousWord(): boolean {
        const preTyped = this.typedSentence[this.cursorIndex - 1];
        const preRefer = this.reference[this.cursorIndex - 1];

        return (
            this.getCurrentWord() === ""
            && this.cursorIndex > 0
            && preRefer !== preTyped
        );
    }

    private getCurrentWord(): string {
        return this.typedSentence[this.cursorIndex];
    }

    private cursorAtBeginning(): boolean {
        return this.cursorIndex === 0;
    }

    private cursorAtEnd(): boolean {
        return this.cursorIndex >= this.reference.length;
    }

    private moveToNextWord(): void {
        this.cursorIndex++;
    }

    private canRemoveCharacter(): boolean {
        return this.getCurrentWord() != "";
    }
}