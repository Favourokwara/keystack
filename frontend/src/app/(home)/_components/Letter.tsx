import React, { PropsWithChildren, forwardRef, memo } from "react";

interface LetterProps {
	expected: string;
	reference: string;
}

const Letter = forwardRef<HTMLDivElement, LetterProps>(
	({ reference, expected }, focusRef) => {
		const cls = ["letter"];

		// mark letter correct or incorrect depending on whether it was attempted
		if (expected) cls.push(expected === reference ? "correct" : "incorrect");

		// mark the letter as an extra if it has no reference.
		if (!reference) cls.push("extra");

		return (
			<div className={cls.join(" ")} ref={focusRef}>
				{reference || expected}
			</div>
		);
	}
);

export default memo(Letter);
