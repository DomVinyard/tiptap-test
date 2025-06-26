'use client'

import React from 'react'

interface ScoreBarProps {
  score: number
}

export const ScoreBar = ({ score }: ScoreBarProps) => {
  const getBarColor = (value: number) => {
    const hue = (value / 100) * 120
    return `hsl(${hue}, 70%, 50%)`
  }

  const barStyle = {
    width: `${score}%`,
    backgroundColor: getBarColor(score),
  }

  return (
    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 my-2">
      <div className="h-2.5 rounded-full" style={barStyle}></div>
    </div>
  )
}
