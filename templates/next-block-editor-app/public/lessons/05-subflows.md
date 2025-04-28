import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson5Quiz } from '@/app/education-101/quizData'


<VideoSection>
todo
</VideoSection>

# Subflows

## Understanding Subflows

Subflows are self-contained workflows that can be used as components within larger flows. Think of them as functions in programming – they take inputs, perform specific tasks, and return outputs that can be used by the parent flow. Just as you might break down a complex recipe into smaller, reusable steps, subflows help you organize your Wordware applications into manageable pieces.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Subflow+Architecture" 
    alt="Diagram showing how subflows fit into a larger application structure"
    className="w-full block"
  />
</div>

The power of subflows comes from their versatility and reusability. By breaking complex flows into smaller parts, you make them easier to understand and maintain. Each subflow can focus on a specific task, making your code more organized and easier to debug. This modular approach also enables you to share common functionality across different projects, saving time and ensuring consistency.

When you create a well-designed subflow, other team members can easily understand and use it in their own flows. This promotes collaboration and helps maintain a clear project structure. Think of subflows as building blocks that can be assembled in different ways to create more complex applications.

<Quiz questions={[lesson5Quiz[0]]} onComplete={() => {}} />

## Creating and Using Subflows

Creating a subflow begins much like creating a regular flow, but with special attention to how it will interact with other parts of your application. Let's explore how to build and use subflows effectively.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Subflow+Creation+Process" 
    alt="Visual guide showing the steps to create and integrate a subflow"
    className="w-full block"
  />
</div>

The process starts with the `/subflow` command, where you'll give your subflow a descriptive name and purpose. For example, you might create a content analyzer that examines text for tone and themes. Next, you'll define what information your subflow needs (inputs) and what it will produce (outputs). This creates a clear contract for how other flows can interact with your subflow.

Once your subflow is ready, you can reference it in any parent flow using the `@` notation. For instance, `@contentAnalyzer.analysis` would give you access to the analysis results from your content analyzer subflow. This seamless integration allows you to build complex applications while keeping your code organized and maintainable.

<Quiz questions={[lesson5Quiz[1]]} onComplete={() => {}} />

## Designing Effective Subflows

The art of creating good subflows lies in finding the right balance. Each subflow should focus on a single, well-defined task – this makes them easier to understand and maintain. Think about what inputs your subflow needs and what outputs it should produce. Document these clearly so others can easily use your subflow in their own projects.

When designing subflows, consider how they might be reused in different contexts. A well-designed subflow should be flexible enough to handle various use cases while remaining focused on its core purpose. This might mean making certain parameters configurable through inputs, allowing the subflow to adapt to different situations.

Remember to handle errors gracefully and provide clear feedback when something goes wrong. This makes your subflows more robust and easier to troubleshoot. Good documentation and consistent formatting also help make your subflows more maintainable over time.

<Quiz questions={[lesson5Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Create a Content Processing System

Let's build a practical system that uses multiple subflows to process content. We'll create two subflows that work together to clean and summarize text.

1. Create a Text Cleanup Subflow:
   ```
   /subflow
   Name: textCleaner
   
   /input rawText (Text) "Text to clean"
   
   Remove extra spaces, fix common typos, and ensure consistent formatting in:
   @rawText
   
   /output cleanText (Text) "Cleaned text"
   ```

2. Create a Summary Subflow:
   ```
   /subflow
   Name: summarizer
   
   /input text (Text) "Text to summarize"
   /input maxLength (Number) "Maximum summary length"
   
   Create a concise summary of @text in @maxLength words or less.
   
   /output summary (Text) "Generated summary"
   ```

3. Combine in Main Flow:
   ```
   First, clean the input text:
   @textCleaner(rawText: @userContent)
   
   Then create a summary:
   @summarizer(text: @textCleaner.cleanText, maxLength: 100)
   ```

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Content+Processing+System+with+Connected+Subflows" 
    alt="Diagram showing how the textCleaner and summarizer subflows work together in a content processing system"
    className="w-full block"
  />
</div>

<Quiz 
  questions={[{
    question: 'Have you created and connected multiple subflows?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a content processing system using subflows', isCorrect: true }
    ],
    successMessage: "Great work! You've created a modular system using subflows, demonstrating how they can work together to create more complex functionality."
  }]} 
  onComplete={() => {}} 
/>

## Next Steps

In the next lesson, we'll explore Basic Prompting techniques that will help you write more effective instructions for your AI generations, whether they're in main flows or subflows. 