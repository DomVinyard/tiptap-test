import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson8Quiz } from '@/app/education-101/quizData'



<VideoSection>
todo
</VideoSection>

# Chaining Prompts

## Understanding Prompt Chains

Just as we break down complex problems into smaller steps when explaining them to a person, we can chain multiple generations to guide the AI through a task. Each generation in the chain focuses on a specific aspect of the problem, making the overall result more accurate and reliable.

When working with complex tasks, it's often better to guide the AI through a series of steps rather than asking for everything at once. You might start by generating a structured outline to organize your thoughts. Once you have that foundation, you can expand each section with detailed content. Finally, you can refine and polish the content to ensure it flows smoothly and meets your quality standards.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Prompt+Chain+Example+Showing+Multiple+Connected+Generations" 
    alt="Example of multiple generations working together in a chain to produce better results"
    className="w-full block"
  />
</div>

<Quiz questions={[lesson8Quiz[0]]} onComplete={() => {}} />

## The Power of Progressive Refinement

Breaking down complex tasks into multiple generations gives you much more control over the final output. By guiding the AI's thinking process step by step, you can ensure each part of the task is handled correctly before moving on. This approach makes it easier to identify and fix any issues that arise, as you can see exactly where things might have gone wrong. Most importantly, each generation builds upon and improves the previous outputs, creating a progression that leads to higher quality results.

<Quiz questions={[lesson8Quiz[1]]} onComplete={() => {}} />

## Working with Multiple Generations

When chaining prompts, you can create connections between generations using @mentions. This powerful feature lets each step build upon what came before. Here's how a typical chain might flow:

```
/generation
Name: outline
Create an outline for an article about AI prompt chaining

/generation
Name: firstDraft
Using the outline from @outline, write a first draft

/generation
Name: finalVersion
Polish and improve the content from @firstDraft, focusing on clarity and flow
```

This creates a natural progression where each step enhances the previous one. Rather than trying to get perfect results in a single generation, you're guiding the AI through a thoughtful process that leads to better outcomes.

<Quiz questions={[lesson8Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Create a Prompt Chain

Let's create a chain of prompts that progressively improves content about effective communication. Begin by creating a generation named "keywords" that identifies the key aspects of effective communication. This gives us a solid foundation to build upon.

Next, create a generation named "expansion" that develops these ideas further. Reference the previous generation using @keywords, allowing the AI to take each point and add depth and detail to the content.

Finally, create a generation named "final" that weaves everything together. This step should transform the expanded points into a cohesive article, adding smooth transitions between ideas and crafting a compelling introduction and conclusion. By referencing @expansion, the AI has all the detailed content it needs to create a polished piece.

<Quiz 
  questions={[{
    question: 'Have you created a chain of generations that progressively improves the content?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created multiple connected generations that build on each other', isCorrect: true }
    ],
    successMessage: "Excellent! You're now creating sophisticated prompt chains that lead to better results!"
  }]} 
  onComplete={() => {}} 
/>

## Creating Better Chains

The key to effective prompt chaining lies in thoughtful progression. Start with simple, foundational content that establishes the basic structure or ideas. Each subsequent generation should meaningfully build upon or refine what came before. Be specific in your instructions for each generation, clearly explaining what you want it to do with the previous content. Take time to review the output at each step, ensuring you have a solid foundation before moving forward.

## Next Steps

In the next lesson, we'll explore intermediate prompting techniques – how to write more sophisticated instructions that get even better results from your AI flows. You'll learn how to use examples, structure, and advanced patterns to guide the AI's responses! 