"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const segments = [
  { id: 1, text: "WIN!", type: "win" },
  { id: 2, text: "Try Again", type: "lose" },
  { id: 3, text: "WIN!", type: "win" },
  { id: 4, text: "Try Again", type: "lose" },
  { id: 5, text: "WIN!", type: "win" },
  { id: 6, text: "Try Again", type: "lose" },
  { id: 7, text: "WIN!", type: "win" },
  { id: 8, text: "Try Again", type: "lose" },
]

export default function SpinWheelGame() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    const minSpins = 5
    const maxSpins = 8
    const spins = Math.random() * (maxSpins - minSpins) + minSpins
    const segmentAngle = 360 / segments.length
    const randomSegment = Math.floor(Math.random() * segments.length)
    const finalRotation = spins * 360 + randomSegment * segmentAngle

    setRotation((prev) => prev + finalRotation)

    setTimeout(() => {
      const normalizedRotation = finalRotation % 360
      const segmentIndex =
        Math.floor(
          (360 - normalizedRotation + segmentAngle / 2) / segmentAngle
        ) % segments.length

      const selectedSegment = segments[segmentIndex]
      setResult(selectedSegment.text)
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Spin the Wheel!
          </h1>

          {/* Wheel Container */}
          <div className="relative mx-auto w-80 h-80 sm:w-96 sm:h-96">
            {/* Needle Pointer */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
              {/* Needle base */}
              <div className="w-2 h-10 bg-gray-800 rounded-t-md shadow-md"></div>
              {/* Needle head (triangle) */}
              <div className="w-0 h-0 
                border-l-[12px] border-r-[12px] border-t-[20px]
                border-l-transparent border-r-transparent border-t-red-600
                drop-shadow-lg"></div>
            </div>

            {/* Wheel with conic-gradient */}
            <div
              className="relative w-full h-full rounded-full border-8 border-gray-800 shadow-2xl transition-transform duration-[3000ms] ease-out flex items-center justify-center z-10"
              style={{
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(
                  #22c55e 0deg 45deg,
                  #ef4444 45deg 90deg,
                  #22c55e 90deg 135deg,
                  #ef4444 135deg 180deg,
                  #22c55e 180deg 225deg,
                  #ef4444 225deg 270deg,
                  #22c55e 270deg 315deg,
                  #ef4444 315deg 360deg
                )`,
              }}
            >
              {/* Segment Labels */}
              {segments.map((segment, index) => {
                const angle = (360 / segments.length) * index + 22.5
                return (
                  <div
                    key={segment.id}
                    className="absolute text-white font-bold text-sm sm:text-base drop-shadow"
                    style={{
                      transform: `rotate(${angle}deg) translate(110px) rotate(-${angle}deg)`,
                      transformOrigin: "center center",
                    }}
                  >
                    {segment.text}
                  </div>
                )
              })}

              {/* Center Circle */}
              <div className="absolute w-10 h-10 bg-gray-800 rounded-full border-4 border-white shadow-lg z-20"></div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            size="lg"
            className="w-full max-w-xs mx-auto text-lg font-semibold py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            {isSpinning ? "Spinning..." : "SPIN THE WHEEL"}
          </Button>

          {/* Result Display */}
          {result && !isSpinning && (
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <h2 className="text-2xl font-bold">
                {result === "WIN!"
                  ? "🎉 Congratulations!"
                  : "😔 Better luck next time!"}
              </h2>
              <p className="text-lg mt-1">
                You got: <strong>{result}</strong>
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="text-sm text-gray-600 mt-4">
            <p>Click the button to spin the wheel!</p>
            <p className="mt-1">4 segments win, 4 segments try again</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
