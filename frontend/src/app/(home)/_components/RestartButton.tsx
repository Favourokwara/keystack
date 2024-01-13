import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface Props {
	className?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function RestartButton({ className, disabled, onClick }: Props) {
	return (
		<>
			<button
				type="button"
				id="restartTestBtn"
				className={className}
				disabled={disabled}
				onClick={onClick}
			>
				<Image
					src="/assets/icons/refresh.svg"
					alt="reset icon"
					width={24}
					height={24}
				/>
			</button>
		</>
	);
}
