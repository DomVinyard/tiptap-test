import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson12Quiz } from '@/app/education-101/quizData'


<VideoSection>
Now that you're familiar with the basics of Wordware, let's explore some practical techniques to get better results from your AI generations. You'll learn how to write clearer prompts, guide the AI more effectively, and handle common scenarios you might encounter in your flows.
</VideoSection>

# Advanced Prompting

## Writing Clearer Prompts

When working with generation nodes in Wordware, the way you write your prompts makes a big difference in the results you get. Let's start with a simple example. Instead of writing:

"Write content about dogs"

Try being more specific about what you want:

"Write a friendly, informative blog post about golden retrievers as family pets. Include sections about their temperament, exercise needs, and grooming requirements. Keep the tone warm and approachable for first-time dog owners."

Notice how the second prompt gives the AI clear direction about the content, structure, and tone. This helps ensure you get content that matches your needs without having to make multiple adjustments.

<Quiz questions={[lesson12Quiz[0]]} onComplete={() => {}} />

## Guiding the Style and Format

Sometimes you need content in a particular style or format. Wordware's AI is great at following examples, so you can show it exactly what you're looking for. For instance, if you need a specific email format:

"Write a customer service email response using this structure:
- Start with a warm greeting
- Acknowledge their issue about [use @customer_issue]
- Provide a clear solution
- End with a helpful, positive note
- Sign off professionally

Make sure the tone is professional but friendly, and keep the response concise."

This approach of providing a clear structure helps the AI understand exactly how you want the content organized.

<Quiz questions={[lesson12Quiz[1]]} onComplete={() => {}} />

## Working with Multiple Generations

When you're using multiple generation nodes in your flow, you can make them work together effectively. Each generation can build on what came before:

1. First generation: "Create a brief outline for a blog post about @topic"
2. Second generation: "Using the outline from @previous_generation, write an engaging introduction that hooks the reader"
3. Third generation: "Based on the outline and introduction, develop the main content sections"

By breaking down complex content creation into steps, you can guide each part of the process more precisely.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Multi-Step+Generation+Flow+Example" 
    alt="Example of a flow showing multiple generation nodes working together"
    className="w-full block"
  />
</div>

<Quiz questions={[lesson12Quiz[2]]} onComplete={() => {}} />

## Refining the Results

Sometimes you might not get exactly what you want on the first try. That's normal! Here are some effective ways to refine your results:

When the content is too long: "Rewrite the above content more concisely, focusing on the key points while maintaining the same friendly tone."

When you need a different style: "Take the content from @previous_generation and adjust it to sound more professional and business-oriented."

When you want to emphasize something: "Revise the previous content to put more emphasis on the benefits and practical applications."

## Try It Yourself: Create a Multi-Step Content Flow

Let's put these techniques into practice by creating a flow that generates high-quality content in multiple steps:

1. Add an input node for your topic
2. Create your first generation node that outlines the key points
3. Add a second generation that expands on that outline
4. Include a final generation that polishes the content

Remember to use specific instructions at each step and reference previous generations using @mentions.

<Quiz 
  questions={[{
    question: 'Have you created a multi-step content generation flow?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a flow that refines content across multiple steps', isCorrect: true }
    ],
    successMessage: "Great work! You're now creating more sophisticated and refined content using multiple generations."
  }]} 
  onComplete={() => {}} 
/>

## Best Practices

When writing prompts in Wordware, keep these ideas in mind:
- Start with clear, specific instructions about what you want
- Break complex tasks into smaller steps using multiple generations
- Use @mentions to reference previous content and build on it
- Include guidance about tone and style when it matters
- Don't hesitate to ask for refinements if the first result isn't quite right

## Congratulations!

You've completed the Wordware fundamentals course! You now have a solid foundation in creating flows, working with different node types, and writing effective prompts. Keep experimenting with these techniques in your own projects, and remember that practice makes perfect when it comes to crafting great prompts. 