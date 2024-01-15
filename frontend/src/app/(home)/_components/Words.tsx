import { forwardRef } from "react";

import Word from "./Word";

interface Props {
	expected: string[];
	isFocused: boolean;
	reference: string[];
	transform?: number;
}

const Words = forwardRef<HTMLDivElement, Props>(
	({ expected, isFocused, reference, transform }, focusRef) => {
		return (
			<div
				id="words"
				className={isFocused ? "" : "blurred"}
				style={{ transform: `translateY(-${transform || 0}px)` }}
			>
				{reference.map((word: string, index: number) => (
					<Word
						key={index}
						reference={word}
						expected={expected[index]}
						ref={index === expected.length - 1 ? focusRef : null}
					/>
				))}
			</div>
		);
	}
);

export default Words;
