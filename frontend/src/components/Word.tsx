import React, { forwardRef } from 'react'

const Word = forwardRef<HTMLDivElement, { expected: string, actually: string }>(({ expected, actually }, focusRef) => {
    const wordclass = ["word"];
    const isFocus = focusRef !== null;  // check if word is the focus
    const isOmitted = actually.length >= expected.length;

    if (actually.length > 0 && !isFocus && actually !== expected ) {
        wordclass.push("error");
    }

    if (expected.length < actually.length) {
        wordclass.push("extra");
    }

    return (
        <div className={wordclass.join(" ")} ref={isOmitted ? focusRef : null}>
            {(isOmitted ? actually : expected).split("").map((_, index) => {
                const letterclass = ["letter"]
                const isExtra = expected[index] === undefined;

                if (actually[index] !== undefined) {
                    letterclass.push(expected[index] === actually[index] ?
                                                 "correct" : "incorrect");
                }

                return (
                    <div key={index} className={letterclass.join(" ")} ref={!isOmitted && index === actually.length ? focusRef : null}>
                        { isExtra? expected[index] : actually[index] }
                    </div>
                );
            })}
        </div>
    )
});

Word.displayName = "Word";

export default Word;