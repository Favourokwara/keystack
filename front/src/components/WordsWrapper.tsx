"use client"
import useSentenceComparator from '@/hooks/useSentenceComparator';
import React, { useEffect, useState } from 'react'
import Word from './Word';

const WordsWrapper = () => {
    const [counter, setCounter] = useState(0);
    const {expected, actually} = useSentenceComparator([
      "The",
      "quick",
      "brown",
      "fox",
      "jumped",
      "over",
      "the",
      "lazy"
    ]);
  
    const handleKeyPress = () => {
      setCounter((prevCounter) => prevCounter + 1);
      console.log("uajahs");
    };
  
    // useEffect(() => {
    //   document.addEventListener("keydown", handleKeyPress);
  
    //   return () => {
    //     document.removeEventListener("keydown", handleKeyPress);
    //   };
    // }, []);
    
    return (
        <div className="wordsWrapper">
          {/* <div className="words">{counter}</div> */}
          {/* Using expected and actually directly without map */}
          <div className="wordList flex gap-1 text-xl">
            {expected.map((word, index) => (
              <Word key={index} expected={expected[index]} actually={actually[index]} />
            ))}
          </div>
        </div>
      );
}

export default WordsWrapper;