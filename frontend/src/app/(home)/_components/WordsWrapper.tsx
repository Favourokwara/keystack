import { MouseEventHandler, useEffect } from "react";

import useCursorPosition from "../_hooks/useCursorPosition";
import Words from "./Words";

interface WrapperProps {
	expected: string[];
	isFocused: boolean;
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	reference: string[];
}

export default function WordsWrapper({
	expected,
	isFocused,
	onClick,
	reference,
}: WrapperProps) {
	const { cursorRef, position, updatePosition } = useCursorPosition();

	useEffect(() => {
		updatePosition();
	}, [expected, updatePosition]);

	return (
		<>
			<div id="wordsWrapper" onClick={onClick}>
				{isFocused && <div id="caret" style={{ left: position.x + "px" }} />}
				<Words {...{ expected, reference, isFocused }} ref={cursorRef} />
			</div>
		</>
	);
}
