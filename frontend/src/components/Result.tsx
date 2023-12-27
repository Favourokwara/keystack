"use client"
import React from 'react'
import LineChart from './LineChart';

const Result = () => {
  return (
    <div id="result"className='grid w-full'>
        <div className="flex flex-col gap-2 stats text-2xl">
            <div className="group wpm">
                <div className="top"><span>wpm</span></div>
                <div className="btm"><h4 className='font-medium text-6xl'>24</h4></div>
            </div>
            <div className="group acc">
                <div className="top"><span>acc</span></div>
                <div className="btm"><h4 className='font-medium text-6xl'>90%</h4></div>
            </div>
        </div>
        <LineChart wpm={[10, 15, 13, 17, 21, 20]} raw={[10, 12, 13, 19, 21, 16]} err={[0, 0, 2, 0, 0, 0]} />
    </div>
  )
}

export default Result;