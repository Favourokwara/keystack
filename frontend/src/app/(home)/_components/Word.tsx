import { forwardRef } from "react";
import Letter from "./Letter";

interface LetterProps {
	reference: string;
	expected: string;
}

const Word = forwardRef<HTMLDivElement, LetterProps>(
	({ reference, expected = "" }, focusRef) => {
		const cls = ["word"];

		const isFocused = Boolean(focusRef);
		const isOmitted = expected.length >= reference.length;

		if (isFocused) cls.push("active"); // mark as active if word is focus

		if (!isFocused && expected.length > 0 && expected !== reference) {
			cls.push("error");
		}

		return (
			<div className={cls.join(" ")} ref={isOmitted ? focusRef : null}>
				{(isOmitted ? expected : reference).split("").map((_, index) => (
					<Letter
						key={index}
						expected={expected[index]}
						reference={reference[index]}
						ref={!isOmitted && index === expected.length ? focusRef : null}
					/>
				))}
			</div>
		);
	}
);

export default Word;
