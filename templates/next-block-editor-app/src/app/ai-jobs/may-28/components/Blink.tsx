'use client'

import { useState, useEffect, useMemo } from 'react'

enum BackgroundState {
  Standard = 'standard',
  Side = 'side',
  Blink = 'blink',
}

export function Blink() {
  const [bgState, setBgState] = useState<BackgroundState>(BackgroundState.Standard)
  const [blinkCount, setBlinkCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Cache image URLs to prevent triggering file system events
  const imageUrls = useMemo(
    () => ({
      standard: '/ai-jobs/library/robot_std.png',
      side: '/ai-jobs/library/robot_side.png',
      blink: '/ai-jobs/library/robot_blink.png',
      logo: '/ai-jobs/library/ww_logo.png',
      login: '/ai-jobs/library/login_google.png',
    }),
    [],
  )

  // Preload images for smoother transitions
  useEffect(() => {
    Object.values(imageUrls).forEach(url => {
      const img = new Image()
      img.src = url
    })
  }, [imageUrls])

  // Handle the double-blink sequence
  const handleBlinkSequence = () => {
    setIsAnimating(true)

    // First blink
    setBgState(BackgroundState.Blink)
    setBlinkCount(1)

    setTimeout(() => {
      setBgState(BackgroundState.Standard)

      setTimeout(() => {
        // Second blink
        setBgState(BackgroundState.Blink)
        setBlinkCount(2)

        setTimeout(() => {
          setBgState(BackgroundState.Standard)
          setBlinkCount(0)
          setIsAnimating(false)
        }, 150)
      }, 200)
    }, 150)
  }

  // Handle side view animation
  const handleSideView = () => {
    setIsAnimating(true)

    setBgState(BackgroundState.Side)

    setTimeout(
      () => {
        setBgState(BackgroundState.Standard)
        setIsAnimating(false)
      },
      800 + Math.random() * 800,
    )
  }

  // where to login with email
  // gmail and text to voice

  // Set up interval for random animations
  useEffect(() => {
    const triggerRandomAnimation = () => {
      if (isAnimating) return

      const choice = Math.random() > 0.5 ? 'side' : 'blink'

      if (choice === 'side') {
        handleSideView()
      } else {
        handleBlinkSequence()
      }
    }

    const intervalId = setInterval(() => {
      if (!isAnimating) {
        if (Math.random() < 0.1) {
          triggerRandomAnimation()
        }
      }
    }, 1000)

    // Force an initial animation after 2 seconds
    const initialTimeout = setTimeout(() => {
      triggerRandomAnimation()
    }, 2000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(initialTimeout)
    }
  }, [isAnimating])

  // Handle Google login click
  const handleLoginClick = () => {
    // Navigate to the quiz page using client-side navigation
    window.location.href = '/ai-jobs/may-28/quiz'
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* All background images - only one is visible at a time */}
      <div className="absolute inset-0 w-full h-full">
        {/* Standard image */}
        <img
          src={imageUrls.standard}
          alt="Robot standard pose"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: bgState === BackgroundState.Standard ? 'block' : 'none' }}
        />

        {/* Side image */}
        <img
          src={imageUrls.side}
          alt="Robot side pose"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: bgState === BackgroundState.Side ? 'block' : 'none' }}
        />

        {/* Blink image */}
        <img
          src={imageUrls.blink}
          alt="Robot blinking pose"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: bgState === BackgroundState.Blink ? 'block' : 'none' }}
        />
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
