"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const segments = [
  { id: 1, text: "WIN!", type: "win", color: "bg-green-500" },
  { id: 2, text: "Try Again", type: "lose", color: "bg-red-500" },
  { id: 3, text: "WIN!", type: "win", color: "bg-green-500" },
  { id: 4, text: "Try Again", type: "lose", color: "bg-red-500" },
  { id: 5, text: "WIN!", type: "win", color: "bg-green-500" },
  { id: 6, text: "Try Again", type: "lose", color: "bg-red-500" },
  { id: 7, text: "WIN!", type: "win", color: "bg-green-500" },
  { id: 8, text: "Try Again", type: "lose", color: "bg-red-500" },
]

export default function SpinWheelGame() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Generate random rotation (multiple full rotations + random segment)
    const minSpins = 5
    const maxSpins = 8
    const spins = Math.random() * (maxSpins - minSpins) + minSpins
    const segmentAngle = 360 / 8
    const randomSegment = Math.floor(Math.random() * 8)
    const finalRotation = spins * 360 + randomSegment * segmentAngle

    setRotation((prev) => prev + finalRotation)

    // Determine result after spin completes
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360
      const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % 8
      const selectedSegment = segments[segmentIndex]

      setResult(selectedSegment.text)
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Spin the Wheel!</h1>

          {/* Wheel Container */}
          <div className="relative mx-auto w-80 h-80 sm:w-96 sm:h-96">
            {/* Arrow Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-lg"></div>
            </div>

            {/* Wheel */}
            <div
              className="relative w-full h-full rounded-full border-8 border-gray-800 shadow-2xl overflow-hidden transition-transform duration-[3000ms] ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              {segments.map((segment, index) => {
                const angle = (360 / 8) * index
                return (
                  <div
                    key={segment.id}
                    className={`absolute w-1/2 h-1/2 ${segment.color} flex items-center justify-center text-white font-bold text-sm sm:text-base`}
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                      transformOrigin: "bottom right",
                      top: "50%",
                      left: "50%",
                    }}
                  >
                    <span
                      className="absolute whitespace-nowrap text-xs sm:text-sm font-bold"
                      style={{
                        transform: `rotate(${22.5}deg) translate(-50%, -100%)`,
                        left: "25%",
                        top: "25%",
                      }}
                    >
                      {segment.text}
                    </span>
                  </div>
                )
              })}

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full border-4 border-white shadow-lg z-10"></div>
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
                {result === "WIN!" ? "🎉 Congratulations!" : "😔 Better luck next time!"}
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
