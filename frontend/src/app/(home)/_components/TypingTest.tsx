"use client";

import React, { useEffect, useRef, useState } from "react";

import WordsWrapper from "./WordsWrapper";
import useComparator from "../_hooks/useComparator";
import RestartButton from "./RestartButton";

export default function TypingTest() {
	const { reference, expected, focusIndex, handleKeydown } = useComparator(10);

	// Todo: this might need a new custom hook
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const onFocus = () => {
		setIsFocused(true);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const handleInputFocus = () => {
		inputRef.current && inputRef.current.focus();
	};

	useEffect(() => {
		handleInputFocus();
	}, []);

	return (
		<div id="typingTest">
			<div className={"outOfFocusWarning" + (isFocused ? " hidden" : "")}>
				Click here or start typing to focus
			</div>
			<input
				type="text"
				id="wordsInput"
				onBlur={onBlur}
				onFocus={onFocus}
				onKeyDown={handleKeydown}
				ref={inputRef}
			/>
			<WordsWrapper
				expected={expected.slice(0, focusIndex + 1)}
				isFocused={isFocused}
				reference={reference}
				onClick={handleInputFocus}
			/>
			<RestartButton
				onClick={() => {
					handleInputFocus();
				}}
			/>
		</div>
	);
}
