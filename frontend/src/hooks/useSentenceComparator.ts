import SentenceComparator from "@/model/SentenceComparator"
import { useEffect, useRef, useState } from "react"

const useSentenceComparator = (reference: string[]) => {
    const comparator = useRef<SentenceComparator>(new SentenceComparator(reference));

    const [expected, setExpected] = useState(comparator.current.getReferenceSentence());
    const [actually, setActually] = useState(comparator.current.getTypedSentence());

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key.length === 1) {
            // single alpha-numeric keycap pressed
            comparator.current.add(event.key);
            setActually(comparator.current.getTypedSentence());
        } else if (event.key === "Backspace") {
            comparator.current.remove(event.ctrlKey);
            setActually(comparator.current.getTypedSentence());
        }
    }

    // useEffect(() => {
    //     document.addEventListener("keydown", handleKeydown);

    //     return () => {
    //         document.removeEventListener("keydown", handleKeydown);
    //     };
    // }, []);

    return { expected, actually, handleKeydown };
};

export default useSentenceComparator;