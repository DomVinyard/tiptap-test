import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson6Quiz } from '@/app/education-101/quizData'



<VideoSection>
todo
</VideoSection>

# Basic Prompting

## The Art of Clear Instructions

Writing effective prompts is about being clear and specific in your requests. Instead of vague instructions like "Tell me about dogs," you'll get better results by being precise: "Explain three unique characteristics of golden retrievers that make them excellent family pets." This specificity helps the AI understand exactly what information you're looking for.

Think about how you'd explain a task to someone who's highly capable but needs explicit instructions. When you want structured information, show the AI exactly how you want it formatted. For example, when asking about exercise benefits, you might structure your prompt with clear sections for physical, mental, and social benefits. This guidance helps the AI organize its response in a way that's most useful to you.

<Quiz questions={[lesson6Quiz[0]]} onComplete={() => {}} />

## Crafting Effective Prompts

The way you structure your prompts significantly impacts the quality of AI responses. When you need a list of items, you can guide the AI by providing a clear format in your prompt. For instance, starting each line with a dash or number shows the AI exactly how you want the information presented.

For explanations, consider your audience. Phrases like "Explain this as if you're talking to a fifth-grader" help the AI adjust its language and complexity level appropriately. When analyzing text, provide clear focus areas to ensure the AI covers all the aspects you're interested in.

<Quiz questions={[lesson6Quiz[1]]} onComplete={() => {}} />

## Using Formatting Effectively

Wordware supports markdown formatting in your prompts, which helps organize your instructions visually. While the AI doesn't process the markdown symbols themselves, this structure makes your prompts easier to read and maintain. You can use headings to separate different parts of your request, create lists for multiple items, and emphasize important points.

The visual organization of your prompt helps both you and the AI understand the structure of the desired output. For example, using headings to separate different sections of a request helps the AI understand the logical flow of information you're looking for. Quotation marks can highlight specific text you want the AI to analyze or reference.

<Quiz questions={[lesson6Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Structured Prompting

Let's practice writing clear, structured prompts by creating a flow that analyzes Wordware's features. We'll build this in steps to see how structure improves our results.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Feature+Analysis+Flow+with+Structured+Prompts" 
    alt="Example of a feature analysis flow using structured prompts with clear sections"
    className="w-full block"
  />
</div>

1. Create your first generation:
   ```
   /generation
   Name: featureGen
   
   ## Wordware Features
   Describe three key features that make Wordware particularly user-friendly. 
   For each feature, explain how it helps users be more productive.
   ```

2. Add an analysis step:
   ```
   ## Benefits Analysis
   Based on the features described in @featureGen, explain:
   What makes these features particularly valuable for users who are new to AI tools?
   How do they work together to create a better user experience?
   ```

<Quiz 
  questions={[{
    question: 'Have you created structured prompts with clear organization?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have written organized prompts that guide the AI effectively', isCorrect: true }
    ],
    successMessage: "Excellent! You're now crafting prompts that clearly communicate your needs to the AI."
  }]} 
  onComplete={() => {}} 
/>

## Next Steps

In the next lesson, we'll explore Triggers & Actions – how to automate your flows and connect them to the outside world. You'll see how your well-crafted prompts can power automated workflows! 