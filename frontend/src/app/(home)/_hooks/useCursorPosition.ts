import { useCallback, useEffect, useRef, useState } from 'react'

export default function useCursorPosition() {
    const cursorRef = useRef<HTMLDivElement>(null);

    // cursor position
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const updatePosition = useCallback((): void => {
        const cursor = cursorRef.current;

        let x = cursor?.offsetLeft || 0;
        let y = cursor?.parentElement?.offsetTop || 0;

        if (cursor?.classList.contains("word")) {
            x += cursor.offsetWidth;
            y = cursor.offsetTop;
        }
        setX(x);
        setY(y);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updatePosition);
        return () => { window.removeEventListener("resize", updatePosition); }
    }, [updatePosition])

    return { cursorRef, position: { x, y }, updatePosition };
}