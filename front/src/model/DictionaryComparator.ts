export default class DictionaryComparator {
    private focusIndx: number = 0;
    private comparand: string[];

    constructor(private reference: string[], private tolerance: number = 0) {
        this.comparand = reference.map(() => "");
    }

    public append(char: string): boolean {
        if (this.focusIndx >= this.reference.length) {
            return false;
        }
        
        if (this.canMoveToNextWord() && char === " ") {
            this.moveToNextWord();  
            return true;
        } else if (this.canAddCharacter() && char !== " ") {
            this.comparand[this.focusIndx] += char;
            return true;
        }
        return false;
    }

    public remove(entireWord: boolean = false): boolean {
        if ((this.focusIndx === 0 && this.getFocusedWord() === "") ||
            this.focusIndx >= this.reference.length) {
            return false;
        }

        if (entireWord) {
            this.removeEnitreWord();
        } else {
            this.removeCharacter();
        }
        
        return true;
    }

    /**
     * @returns Sentence being compared to the specified reference.
     */
    public getTypedSentence(): string[] {
        return [...this.comparand];
    }

    /**
     * @returns Sentence used as a reference to the expected value.
     */
    public getReferenceSentence(): string[] {
        return [...this.reference];
    }

    private removeEnitreWord(): void {
        if (this.canMoveToPrevWord()) {
            this.focusIndx--;
        }
        this.comparand[this.focusIndx] = "";
    }

    private removeCharacter(): void {
        if (this.canMoveToPrevWord()) {
            this.focusIndx--;
            return;
        }
        this.comparand[this.focusIndx] = 
        this.comparand[this.focusIndx].slice(0, -1);
    }

    private canMoveToNextWord(): boolean {
        return (this.getFocusedWord().length > 0) && (this.focusIndx <= this.reference.length);
    }

    private canMoveToPrevWord(): boolean {
        const prevExp = this.comparand[this.focusIndx - 1];
        const prevRef = this.reference[this.focusIndx - 1];

        return this.focusIndx > 0 && this.focusIndx < this.reference.length && prevExp !== prevRef && this.getFocusedWord() === "";
    }

    private canAddCharacter(): boolean {
        return (this.reference[this.focusIndx].length + 
             this.tolerance - this.getFocusedWord().length) > 0;
    }

    private getFocusedWord(): string {
        return this.comparand[this.focusIndx];
    }

    private moveToNextWord(): void {
        this.focusIndx++;
    }
}