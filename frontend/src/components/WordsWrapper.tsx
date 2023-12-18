"use client"
import useSentenceComparator from '@/hooks/useSentenceComparator';
import React, { useEffect } from 'react'
import Word from './Word';

const WordsWrapper = () => {
    const { expected, actually } = useSentenceComparator(["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy"]); 

    useEffect(() => {
        console.log("jajshajshjahs");
     }, [actually])
    
    return (<>
        <div className='wordsWrapper'>
            <div className='words'>
                {actually.map((_, index) => {
                    return (<Word key={index}
                                  expected={expected[index]}
                                  actually={actually[index]}
                            />);
                })}
            </div>
        </div>
    </>);
}

export default WordsWrapper;