'use client'

import { useState, useEffect, useMemo, useRef } from 'react'

export function Blink() {
  // Target position (where eyes should eventually move to)
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  // Current position (where eyes are currently at with inertia)
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const eyesRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Cache image URLs
  const imageUrls = useMemo(
    () => ({
      robotBg: '/ai-jobs/library/robot_bg.png',
      robotEyes: '/ai-jobs/library/robot_eyes.png',
      robotEyesBlink: '/ai-jobs/library/robot_eyes_blink.png',
      logo: '/ai-jobs/library/ww_logo.png',
      login: '/ai-jobs/library/login_google.png',
    }),
    [],
  )

  // Track mouse position for eye movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && eyesRef.current) {
        // Get container dimensions and position
        const containerRect = containerRef.current.getBoundingClientRect()

        // Calculate custom center point - robot is positioned more to the right
        // Approximately 25% from the left edge of the screen
        const centerX = containerRect.left + containerRect.width * 0.25
        const centerY = containerRect.top + containerRect.height * 0.5

        // Calculate the distance from center with increased sensitivity
        // Using a smaller divisor increases sensitivity
        const distanceX = (e.clientX - centerX) / (containerRect.width / 3)
        const distanceY = (e.clientY - centerY) / (containerRect.height / 3)

        // Limit movement range (eyes can't move too far)
        const maxMovement = 50 // pixels - reduced from 100 for more natural movement
        const moveX = Math.min(Math.max(distanceX * maxMovement, -maxMovement), maxMovement)
        const moveY = Math.min(Math.max(distanceY * maxMovement, -maxMovement), maxMovement)

        // Update target position state (this is where eyes should eventually move to)
        setTargetPosition({ x: moveX, y: moveY })
      }
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Smooth movement with inertia
  useEffect(() => {
    // If blinking, don't update position
    if (isBlinking) return

    // Animation frame for smooth movement
    let animationFrameId: number

    // Function to gradually move current position toward target position
    const smoothlyUpdatePosition = () => {
      setCurrentPosition(current => {
        // Calculate distance between current and target positions
        const dx = targetPosition.x - current.x
        const dy = targetPosition.y - current.y

        // Smoothing factor (lower = more inertia, higher = more responsive)
        // 0.1 means the eyes move 10% of the remaining distance each frame
        const smoothing = 0.08

        // Update position with smoothing (lerp - linear interpolation)
        return {
          x: current.x + dx * smoothing,
          y: current.y + dy * smoothing,
        }
      })

      // Continue animation loop
      animationFrameId = requestAnimationFrame(smoothlyUpdatePosition)
    }

    // Start animation loop
    animationFrameId = requestAnimationFrame(smoothlyUpdatePosition)

    // Clean up animation frame on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [targetPosition, isBlinking])

  // Add blinking effect (unrelated to cursor movement)
  useEffect(() => {
    const doBlink = () => {
      if (isBlinking) return // Don't start a new blink if already blinking

      // Randomly choose between single and double blink
      const isDoubleBlink = Math.random() > 0.4 // 60% double blinks, 40% single blinks

      // Start blink sequence
      setIsBlinking(true)

      // First blink
      setTimeout(() => {
        // End first blink
        setIsBlinking(false)

        if (isDoubleBlink) {
          // If double blink, add second blink after a small gap
          setTimeout(() => {
            // Second blink
            setIsBlinking(true)

            // End second blink
            setTimeout(() => {
              setIsBlinking(false)
            }, 150)
          }, 200)
        }
      }, 150)
    }

    // Set up random blinking interval
    const intervalId = setInterval(() => {
      // Random chance to blink (less frequent)
      if (Math.random() < 0.05) {
        // 5% chance each interval (reduced from 15%)
        doBlink()
      }
    }, 3000) // Check every 3 seconds (increased from 1 second)

    // Do an initial blink after 2 seconds
    const initialBlinkTimeout = setTimeout(() => {
      doBlink()
    }, 2000)

    // Clean up
    return () => {
      clearInterval(intervalId)
      clearTimeout(initialBlinkTimeout)
    }
  }, [isBlinking])

  // Handle Google login click
  const handleLoginClick = () => {
    // Navigate to the quiz page using client-side navigation
    window.location.href = '/ai-jobs/may-28/quiz'
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Robot with eyes that follow cursor */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        {/* Background robot image */}
        <img src={imageUrls.robotBg} alt="Robot" className="absolute inset-0 w-full h-full object-cover" />

        {/* Eyes layer - alternates between normal and blinking */}
        {isBlinking ? (
          <img
            src={imageUrls.robotEyesBlink}
            alt="Robot Eyes Blinking"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
              pointerEvents: 'none',
            }}
          />
        ) : (
          <img
            ref={eyesRef}
            src={imageUrls.robotEyes}
            alt="Robot Eyes"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
              pointerEvents: 'none', // Make sure eyes don't block mouse events
            }}
          />
        )}
      </div>

      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-10">
        <img src={imageUrls.logo} alt="Wordware Logo" className="h-16" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="ml-auto w-1/2 flex flex-col items-center px-10 md:px-20">
          <div className="text-center mt-12">
            <h1
              className="text-8xl font-black mb-10 tracking-tight leading-none uppercase"
              style={{
                background: 'linear-gradient(to bottom, #0D1D42, #303070)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: '#0D1D42', // Fallback color
                textShadow: '3px 3px 0 rgba(0,0,0,0.2), -1px -1px 0 rgba(0,0,0,0.7)',
                transform: 'skew(-2deg)',
                letterSpacing: '-0.02em',
              }}
            >
              AI IS COMING
              <br />
              FOR US ALL
            </h1>

            <button
              onClick={handleLoginClick}
              className="transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full shadow-lg mb-8"
            >
              <img src={imageUrls.login} alt="Sign in with Google" className="h-auto w-auto max-h-16" />
            </button>

            <div>
              <p
                className="text-[32px] font-semibold max-w-lg mx-auto leading-tight mt-3"
                style={{
                  background: 'linear-gradient(to bottom, #0D1D42, #203070)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: '#0D1D42', // Fallback color
                  opacity: 0.95, // Slightly more subtle than the main heading
                }}
              >
                Complete the AI survival quiz
                <br />
                to find out how long you've got
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
