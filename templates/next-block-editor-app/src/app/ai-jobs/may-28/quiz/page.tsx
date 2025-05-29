'use client'

import { useState, useEffect } from 'react'

// Define industry options
const industries = [
  { id: 'tech', label: 'Technology' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'finance', label: 'Finance & Banking' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail & E-commerce' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'media', label: 'Media & Entertainment' },
  { id: 'government', label: 'Government' },
  { id: 'nonprofit', label: 'Non-profit' },
  { id: 'hospitality', label: 'Hospitality & Tourism' },
  { id: 'construction', label: 'Construction & Real Estate' },
  { id: 'legal', label: 'Legal Services' },
]

// Define AI usage options
const aiUsageLevels = [
  { id: 'none', label: 'Not at all' },
  { id: 'basic', label: 'Basic tools only (search, recommendations)' },
  { id: 'intermediate', label: 'Somewhat (content generation, data analysis)' },
  { id: 'advanced', label: 'Extensively (decision making, creative work)' },
  { id: 'expert', label: 'Expert level (custom AI systems, development)' },
]

// Define AI concerns
const aiConcerns = [
  { id: 'job_loss', label: 'Job displacement' },
  { id: 'privacy', label: 'Privacy and data security' },
  { id: 'bias', label: 'Bias and discrimination' },
  { id: 'accuracy', label: 'Accuracy and reliability' },
  { id: 'control', label: 'Loss of human control' },
  { id: 'dependency', label: 'Over-dependency on technology' },
  { id: 'creativity', label: 'Impact on human creativity' },
  { id: 'social', label: 'Social isolation' },
  { id: 'economic', label: 'Economic inequality' },
  { id: 'none', label: 'I have no concerns' },
]

// Define questions
const questions = [
  {
    id: 'industries',
    title: 'Which industries do you work in?',
    description: 'Select all that apply to you.',
    options: industries,
    multiSelect: true,
    progressPercent: 10,
  },
  {
    id: 'ai_usage',
    title: 'How much do you use AI in your daily work?',
    description: 'Select the option that best describes your AI usage.',
    options: aiUsageLevels,
    multiSelect: false,
    progressPercent: 30,
  },
  {
    id: 'ai_concerns',
    title: 'What concerns you most about AI?',
    description: 'Select all that apply to you.',
    options: aiConcerns,
    multiSelect: true,
    progressPercent: 50,
  },
  {
    id: 'results',
    title: 'Your AI Survival Score',
    progressPercent: 100,
  },
]

// Get a personalized survival score based on selections
const calculateSurvivalScore = (selections: { [key: string]: string[] }) => {
  // This would normally be a more complex algorithm
  // For now, we'll use a simplified approach

  const industryScores: { [key: string]: number } = {
    tech: 85,
    healthcare: 70,
    finance: 65,
    education: 60,
    retail: 50,
    manufacturing: 45,
    media: 55,
    government: 60,
    nonprofit: 65,
    hospitality: 40,
    construction: 35,
    legal: 60,
  }

  const aiUsageScores: { [key: string]: number } = {
    none: 30,
    basic: 50,
    intermediate: 70,
    advanced: 85,
    expert: 95,
  }

  // Calculate industry score (average of selected industries)
  let industryScore = 0
  const selectedIndustries = selections.industries || []
  if (selectedIndustries.length > 0) {
    const sum = selectedIndustries.reduce((total, ind) => total + (industryScores[ind] || 50), 0)
    industryScore = sum / selectedIndustries.length
  } else {
    industryScore = 50
  }

  // Calculate AI usage score
  let aiUsageScore = 50
  const selectedAiUsage = selections.ai_usage?.[0] || 'basic'
  aiUsageScore = aiUsageScores[selectedAiUsage] || 50

  // Calculate concern factor (more concerns = more awareness = better score)
  let concernFactor = 1.0
  const concernCount = (selections.ai_concerns || []).length
  if (concernCount > 0 && !selections.ai_concerns?.includes('none')) {
    concernFactor = 1.0 + Math.min(concernCount, 5) * 0.05 // Up to 25% boost for concerns
  } else if (selections.ai_concerns?.includes('none')) {
    concernFactor = 0.9 // 10% penalty for no concerns
  }

  // Calculate final score
  const baseScore = industryScore * 0.4 + aiUsageScore * 0.6
  const finalScore = Math.min(99, Math.max(1, Math.round(baseScore * concernFactor)))

  return finalScore
}

// Get personalized analysis text based on selections
const getAnalysisText = (selections: { [key: string]: string[] }, score: number) => {
  const selectedIndustries = selections.industries || []
  const aiUsageLevel = selections.ai_usage?.[0] || 'basic'
  const concerns = selections.ai_concerns || []

  let industryText = ''
  let aiUsageText = ''
  let concernsText = ''
  let overallText = ''

  // Industry analysis
  if (selectedIndustries.includes('tech')) {
    industryText =
      'Your technology industry background is a significant advantage, as this sector is actively shaping AI development rather than just responding to it.'
  } else if (selectedIndustries.includes('healthcare')) {
    industryText =
      'Healthcare is experiencing major AI-driven transformation in diagnostics and patient care, though regulatory factors may slow immediate displacement.'
  } else if (selectedIndustries.includes('finance')) {
    industryText =
      'The finance sector is rapidly adopting AI for risk assessment and algorithmic trading, making AI literacy particularly valuable in your field.'
  } else if (selectedIndustries.length > 0) {
    industryText = `Your experience in ${selectedIndustries.length > 1 ? 'multiple industries' : 'your industry'} provides you with valuable perspective on how AI adoption varies across sectors.`
  }

  // AI usage analysis
  if (aiUsageLevel === 'none') {
    aiUsageText =
      'Your limited exposure to AI tools presents an opportunity for rapid skill development that could significantly improve your outlook.'
  } else if (aiUsageLevel === 'basic') {
    aiUsageText =
      'Your familiarity with basic AI tools gives you a foundation to build upon, though deepening this expertise would be beneficial.'
  } else if (aiUsageLevel === 'intermediate') {
    aiUsageText =
      'Your intermediate-level AI skills put you ahead of many peers and position you well for adapting to new AI developments.'
  } else if (aiUsageLevel === 'advanced' || aiUsageLevel === 'expert') {
    aiUsageText =
      'Your advanced AI expertise is a major asset that makes you well-equipped to thrive as AI continues transforming the workplace.'
  }

  // Concerns analysis
  if (concerns.includes('job_loss')) {
    concernsText =
      'Your awareness of potential job displacement shows foresight that can help you prepare strategically.'
  } else if (concerns.includes('bias') || concerns.includes('privacy')) {
    concernsText =
      'Your attention to ethical considerations in AI demonstrates critical thinking that will become increasingly valuable.'
  } else if (concerns.length > 3) {
    concernsText =
      'Your nuanced understanding of multiple AI challenges indicates a sophisticated perspective that employers and clients will value.'
  } else if (concerns.includes('none')) {
    concernsText =
      "Developing a more critical perspective on AI's challenges could enhance your ability to anticipate and navigate changes."
  } else {
    concernsText = "Your awareness of AI's implications shows you're thinking beyond just the technology itself."
  }

  // Overall assessment based on score ranges
  if (score >= 85) {
    overallText =
      "You're exceptionally well-positioned for the AI era, likely to be among those who lead and shape how AI transforms your field."
  } else if (score >= 70) {
    overallText =
      'You have a strong foundation for thriving with AI, with skills and awareness that put you ahead of most of your peers.'
  } else if (score >= 50) {
    overallText =
      'You have a moderate level of AI readiness with clear opportunities to strengthen your position through targeted upskilling.'
  } else {
    overallText =
      'Your current position suggests vulnerability to AI disruption, but with focused effort on the recommendations below, you can significantly improve your outlook.'
  }

  return {
    industryText,
    aiUsageText,
    concernsText,
    overallText,
  }
}

// Get personalized recommendations
const getRecommendations = (selections: { [key: string]: string[] }, score: number) => {
  const selectedIndustries = selections.industries || []
  const aiUsageLevel = selections.ai_usage?.[0] || 'basic'

  const recommendations = []

  // Skill recommendations
  if (aiUsageLevel === 'none' || aiUsageLevel === 'basic') {
    recommendations.push({
      title: 'Develop AI Literacy',
      description: 'Take an introductory course on AI concepts and applications to build foundational knowledge.',
      action: 'Explore courses on platforms like Coursera or edX that cover AI fundamentals.',
    })
  }

  if (aiUsageLevel !== 'expert') {
    recommendations.push({
      title: 'Gain Hands-on Experience',
      description: 'Practice using AI tools relevant to your specific industry and role.',
      action: 'Identify 2-3 AI tools used in your field and incorporate them into your workflow.',
    })
  }

  // Industry-specific recommendations
  if (selectedIndustries.includes('tech')) {
    recommendations.push({
      title: 'Develop Complementary Technical Skills',
      description:
        "Focus on skills that AI can't easily replicate, such as complex problem solving and system architecture.",
      action: 'Consider specialized certifications in emerging tech areas that complement AI.',
    })
  } else if (selectedIndustries.includes('healthcare')) {
    recommendations.push({
      title: 'Focus on AI-Human Collaboration',
      description: 'Develop expertise in how AI can augment clinical decision-making rather than replace it.',
      action: 'Research case studies of successful AI implementation in healthcare settings.',
    })
  } else if (selectedIndustries.includes('finance')) {
    recommendations.push({
      title: 'Combine Domain Expertise with AI Knowledge',
      description: 'Your industry knowledge becomes more valuable when paired with understanding of AI capabilities.',
      action: 'Study how financial regulations interact with AI applications in your specific sector.',
    })
  }

  // General recommendations
  recommendations.push({
    title: 'Build a Portfolio of AI Projects',
    description: 'Document your experience using and implementing AI solutions to demonstrate practical expertise.',
    action: 'Create at least one showcase project where you use AI to solve a real problem in your domain.',
  })

  if (score < 70) {
    recommendations.push({
      title: 'Diversify Your Skill Set',
      description:
        'Develop complementary skills that are harder for AI to replicate, such as creative problem-solving, interpersonal communication, and ethical reasoning.',
      action: 'Identify the most human-centric aspects of your role and focus on excelling in those areas.',
    })
  }

  return recommendations.slice(0, 4) // Return at most 4 recommendations
}

// Component to render comparison stats
const ComparisonStat = ({ label, score }: { label: string; score: number }) => {
  // Determine color based on score (1-10 scale)
  const getBarColor = (score: number) => {
    if (score < 4) return 'bg-red-600' // Poor - red
    if (score < 7) return 'bg-yellow-500' // Average - yellow
    return 'bg-green-500' // Good - green
  }

  // Get performance label based on score
  const getPerformanceLabel = (score: number) => {
    if (score < 4) return 'Needs improvement'
    if (score < 7) return 'Average'
    return 'Strong'
  }

  const barColor = getBarColor(score)
  const performanceLabel = getPerformanceLabel(score)

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-neutral-300">{label}</span>
        <div className="flex items-center">
          <span
            className={`text-xs mr-2 ${score < 4 ? 'text-red-400' : score < 7 ? 'text-yellow-400' : 'text-green-400'}`}
          >
            {performanceLabel}
          </span>
          <span className="font-semibold">{score}/10</span>
        </div>
      </div>
      <div className="w-full bg-neutral-800 rounded-full h-2.5">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${score * 10}%` }}
        ></div>
      </div>
    </div>
  )
}

// Generate more varied scores for a better demo
const generateScores = (baseScore: number) => {
  // Convert percentage score to 1-10 scale
  const baseTenScore = Math.max(1, Math.min(10, Math.round(baseScore / 10)))

  // Create highly varied scores for different categories to show different colors
  return {
    overall: baseTenScore,
    humanAI: Math.max(1, Math.min(10, Math.floor(Math.random() * 10) + 1)), // Random 1-10
    futureProof: Math.max(1, Math.min(10, Math.ceil(baseTenScore / 2) + Math.floor(Math.random() * 5))), // Bottom half scores
    critical: Math.max(1, Math.min(10, baseTenScore > 5 ? baseTenScore - 4 : baseTenScore + 2)), // Opposite of base
  }
}

// Add a function to generate industry-specific roasts
const getIndustryRoast = (industry: string) => {
  const roasts: Record<string, string> = {
    tech: "As someone in tech, you probably thought you were safe, didn't you? That's adorable. The coders are always the first to go. AI is already writing better code than most developers, debugging faster, and it doesn't need a ping-pong table or free snacks. Your job security is now officially measured in months, not years. Enjoy those stock options while they last!",

    healthcare:
      "Working in healthcare? AI can already diagnose diseases from images better than radiologists with 30 years of experience. Soon, robots will be performing surgery with precision humans can't match, and they don't need coffee breaks or get shaky hands. Hope you didn't spend too much on medical school, because your student loans might outlast your career.",

    finance:
      "Ah, finance. Where humans spend 80 hours a week doing what AI can do in seconds. Algorithms are already making trading decisions faster and more accurately than any human ever could. Even financial advisors are being replaced by robo-advisors that don't need massive bonuses. Your industry is basically a walking zombie at this point. Time to reconsider that vacation home purchase.",

    education:
      "A teacher, huh? AI tutors never lose patience, can personalize learning for thousands of students simultaneously, and don't need summer vacations. Plus, they actually remember all students' names and learning preferences. Sure, kids need human connection, but they also need TikTok – guess which one's winning? Your classroom management skills won't save you when education goes fully digital.",

    retail:
      "Retail is already half-dead thanks to e-commerce, and now AI is coming for what's left. Self-checkout was just the beginning. Soon, entire stores will be automated with robots handling inventory and AI predicting what customers want before they know it themselves. Human sales associates will be as obsolete as mall fountains. But hey, at least you won't have to deal with Black Friday crowds anymore!",

    manufacturing:
      "Manufacturing jobs surviving automation was always a fantasy. Now AI-powered robots work 24/7, never join unions, don't need health insurance, and improve themselves constantly. They're also significantly less likely to accidentally crush their own fingers. Your entire career path is being 3D-printed into oblivion as we speak.",

    media:
      "Media professionals are particularly amusing. AI is already writing news articles, creating images, editing videos, and generating music indistinguishable from human work. Your 'creative eye' and 'unique voice' are just patterns AI can mimic after analyzing thousands of examples. Soon, entire movies will be AI-generated – no divas, no overtime, no craft services needed.",

    government:
      "Government work used to be the definition of job security. Not anymore! AI systems can process paperwork, analyze policy impacts, and serve citizens without taking coffee breaks or retiring with pensions. Plus, they're significantly less likely to be involved in scandals. Your safe government job is about as secure as a political promise during election season.",

    nonprofit:
      "Nonprofits are all about doing more with less, right? Well, AI is the ultimate efficiency tool. It can write grant proposals, optimize donation campaigns, and coordinate volunteers without ever experiencing burnout or moral fatigue. Your passion for making a difference is admirable, but AI's ability to maximize impact while minimizing costs makes you look like an expensive luxury.",

    hospitality:
      "The hospitality industry is built on human connection, right? Tell that to the hotels replacing concierges with chatbots and the restaurants using robot servers. Turns out guests prefer accurate, instant service over the charming human who might forget their order. Your warm smile and personable nature can't compete with perfect memory and 24/7 availability.",

    construction:
      "Construction seems safe because it's physical work, but have you seen 3D-printed buildings? Or prefab homes assembled by robots? AI is already designing structures that human architects couldn't conceive, optimizing for efficiency, sustainability, and cost. Your hard hat won't protect you from the coming wave of automation that works in any weather without lunch breaks.",

    legal:
      "The legal profession thought it was special because of all that specialized knowledge and judgment. Meanwhile, AI is reviewing contracts in seconds instead of hours, predicting case outcomes more accurately than experienced lawyers, and never billing for bathroom breaks. Your billable hours are about to take a historic downturn. Should have gone into tech... oh wait, they're doomed too.",

    // Default roast for any other industry
    default:
      "Whatever industry you're in, it's probably already half-disrupted by AI. The skills you've spent years developing are being replicated by algorithms that learn in seconds and never ask for raises. Your professional expertise is rapidly transforming from 'valuable asset' to 'quaint historical curiosity.' But don't worry – the AI revolution needs humans too... mostly to clean the server rooms and occasionally flip the power switch.",
  }

  return roasts[industry] || roasts.default
}

// Add a function to get a custom heading based on the survival score
const getSurvivalHeading = (score: number): string => {
  if (score < 30) return "Wow, You're Absolutely Screwed"
  if (score < 50) return 'Yeah, You Should Be Worried'
  if (score < 70) return "You'll Survive... Probably"
  if (score < 85) return "You're Actually Doing Okay"
  return 'Congratulations, Future AI Overlord'
}

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({
    industries: [],
    ai_usage: [],
    ai_concerns: [],
  })

  const currentQuestion = questions[currentQuestionIndex]

  // Toggle option selection
  const toggleOption = (optionId: string) => {
    const questionId = currentQuestion.id

    if (questionId === 'results') return

    if (currentQuestion.multiSelect) {
      // For multi-select questions
      setSelectedOptions(prev => {
        const currentSelections = [...(prev[questionId] || [])]

        if (currentSelections.includes(optionId)) {
          return {
            ...prev,
            [questionId]: currentSelections.filter(id => id !== optionId),
          }
        } else {
          return {
            ...prev,
            [questionId]: [...currentSelections, optionId],
          }
        }
      })
    } else {
      // For single-select questions
      setSelectedOptions(prev => ({
        ...prev,
        [questionId]: [optionId],
      }))
    }
  }

  // Check if any option is selected for current question
  const hasSelection = () => {
    if (currentQuestion.id === 'results') return true
    return (selectedOptions[currentQuestion.id] || []).length > 0
  }

  // Handle continue button click
  const handleContinue = () => {
    if (!hasSelection() && currentQuestion.id !== 'results') {
      alert('Please select at least one option')
      return
    }

    // Move to next question or handle results page action
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // On the results page, the Share button navigates back to the landing page
      window.location.href = '/ai-jobs/may-28'
    }
  }

  // Render the current question content
  const renderQuestionContent = () => {
    if (currentQuestion.id === 'results') {
      // Calculate the survival score based on their selections
      const survivalScorePercent = calculateSurvivalScore(selectedOptions)

      // Convert to 1-10 scale for display
      const survivalScore = Math.max(1, Math.min(10, Math.round(survivalScorePercent / 10)))

      // Generate varied scores for a better demo
      const scores = generateScores(survivalScorePercent)

      // Get personalized analysis text (still using percentage for thresholds)
      const analysis = getAnalysisText(selectedOptions, survivalScorePercent)

      // Get personalized recommendations
      const recommendations = getRecommendations(selectedOptions, survivalScorePercent)

      // Get the selected industry for comparison (or default to tech)
      const selectedIndustry = selectedOptions.industries?.[0] || 'tech'

      // Render results screen
      return (
        <div className="text-left">
          {/* Top section with score */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-12">{getSurvivalHeading(survivalScorePercent)}</h1>

            <div className="bg-gradient-to-b from-blue-900/30 to-blue-900/10 border border-blue-700/50 rounded-2xl p-10 mb-6 max-w-2xl mx-auto">
              <div
                className="text-9xl font-bold mb-3"
                style={{
                  background: 'linear-gradient(to bottom, #4f83cc, #0D1D42)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {survivalScorePercent}%
              </div>
              <p className="text-2xl text-neutral-200">chance of thriving in the AI revolution</p>
            </div>

            {/* Social sharing buttons */}
            <div className="flex justify-center space-x-4 mb-4">
              <button className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-full px-4 py-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>
              <button className="bg-[#4267B2] hover:bg-[#365899] text-white rounded-full px-4 py-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-4 py-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white rounded-full px-4 py-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
                </svg>
                Instagram
              </button>
            </div>
            <p className="text-neutral-400">Share your score with your network</p>
          </div>

          {/* Analysis section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-neutral-100">Your AI Readiness Analysis</h2>
            <div className="space-y-8">
              <p className="text-lg text-neutral-300">{analysis.overallText}</p>
              <p className="text-lg text-neutral-300">{analysis.industryText}</p>
              <p className="text-lg text-neutral-300">{analysis.aiUsageText}</p>
              <p className="text-lg text-neutral-300">{analysis.concernsText}</p>
            </div>
          </div>

          {/* AI Roast section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-red-500">The Brutal AI Truth</h2>
            <div className="bg-neutral-900/80 border border-red-900/30 rounded-xl p-8">
              <div className="flex items-start mb-4">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg italic text-neutral-300 font-medium">
                  {getIndustryRoast(selectedOptions.industries?.[0] || 'default')}
                </p>
              </div>
            </div>
          </div>

          {/* Skills breakdown section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-neutral-100">Your AI Readiness Skills</h2>
            <div className="bg-neutral-900 rounded-xl p-8">
              <ComparisonStat label="Overall AI Readiness" score={scores.overall} />
              <ComparisonStat label="Human-AI Collaboration" score={scores.humanAI} />
              <ComparisonStat label="Critical AI Thinking" score={scores.critical} />
              <ComparisonStat label="Future-Proof Skill Set" score={scores.futureProof} />
            </div>
          </div>

          {/* Recommendations section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-neutral-100">Your Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">{rec.title}</h3>
                  <p className="text-neutral-300 mb-4">{rec.description}</p>
                  <p className="text-neutral-400 text-sm font-medium">→ {rec.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Return to start button */}
          <div className="text-center mb-12">
            <button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-8 py-3"
            >
              Return to Home
            </button>
          </div>
        </div>
      )
    }

    // Render normal question
    return (
      <>
        <div className="mb-12">
          <p className="text-neutral-400 text-lg mb-3">
            Question {currentQuestionIndex + 1} of {questions.length - 1}
          </p>
          <h1 className="text-4xl font-bold mb-6">{currentQuestion.title}</h1>
          <p className="text-xl text-neutral-300">{currentQuestion.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {currentQuestion.options &&
            currentQuestion.options.map(option => {
              const isSelected = (selectedOptions[currentQuestion.id] || []).includes(option.id)

              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`
                  p-5 border text-left rounded-lg transition-all
                  ${isSelected ? 'border-blue-500 bg-blue-900/20' : 'border-neutral-700 hover:border-neutral-500'}
                `}
                >
                  <div className="flex items-center">
                    <div
                      className={`
                      w-5 h-5 rounded-sm mr-3 flex items-center justify-center
                      ${isSelected ? 'bg-blue-500' : 'border border-neutral-500'}
                    `}
                    >
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-lg">{option.label}</span>
                  </div>
                </button>
              )
            })}
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1">
        <div
          className="bg-blue-600 h-full transition-all duration-500 ease-in-out"
          style={{ width: `${currentQuestion.progressPercent}%` }}
        ></div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto px-6 py-16">
        {renderQuestionContent()}

        {currentQuestion.id !== 'results' && (
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!hasSelection()}
              className={`
                px-8 py-3 rounded-full text-lg font-medium transition-all
                ${hasSelection() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-700 cursor-not-allowed'}
              `}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
