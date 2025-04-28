import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson3Quiz } from '@/app/education-101/quizData'




<VideoSection>
todo
</VideoSection>

# Inputs & Outputs

## Understanding Inputs

Inputs are the gateway to making your flows dynamic and reusable. Instead of hardcoding values, you can create placeholders that get filled in when the flow runs. To add an input, simply type `/input` or click the + New Input button at the top of your flow.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Input+Types+and+Examples" 
    alt="Visual guide showing different input types with example use cases"
    className="w-full block"
  />
</div>

Let's explore the different types of inputs you can use in Wordware:

1. Text Inputs
   - Single-line text: Perfect for names, titles, or brief descriptions
   - Multi-line text: Ideal for longer content like paragraphs or prompts
   - Example: Creating a blog post generator that takes a topic and tone as inputs

2. Number Inputs
   - Integer values: For quantities, counts, or indices
   - Decimal values: For prices, measurements, or percentages
   - Example: Building a price calculator that takes quantity and unit price

3. Media Inputs
   - Images: For visual content processing or reference
   - Audio: For transcription or sound processing tasks
   - Example: Creating an image description generator that takes an uploaded image

4. Structured Inputs
   - Lists: For handling multiple related items
   - Objects: For complex data with multiple fields
   - Example: Managing a product catalog with multiple attributes

<Quiz questions={[lesson3Quiz[0]]} onComplete={() => {}} />

## Working with Generated Content

Every piece of content generated in your flow becomes available for later use through the `@` mention system. This powerful feature allows you to create chains of connected steps, each building on what came before.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=@+Mention+System+in+Action" 
    alt="Screenshot showing how @ mentions connect different parts of a flow"
    className="w-full block"
  />
</div>

Here's how the `@` mention system works:

1. Reference inputs: Type `@` followed by the input name
   Example: `@user_name` or `@product_description`

2. Reference generations: Use `@` with the generation name
   Example: `@firstDraft` or `@summary`

3. Access sub-flow outputs: Use the format `@flowName.variableName`
   Example: `@productFlow.price` or `@userFlow.preferences`

<Quiz questions={[lesson3Quiz[1]]} onComplete={() => {}} />

## Advanced Data Flow

As your applications grow more complex, you'll want to organize them into smaller, reusable flows. This modular approach makes your applications easier to maintain and update.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Advanced+Flow+Architecture" 
    alt="Diagram showing how data flows between main flows and sub-flows"
    className="w-full block"
  />
</div>

Best practices for organizing your flows:

1. Break down complex tasks into sub-flows
2. Use clear, descriptive names for inputs and generations
3. Keep related functionality together
4. Document your flow's inputs and outputs
5. Test your flows with different input values

<Quiz questions={[lesson3Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Create a Dynamic Greeting

Let's build a practical example that demonstrates inputs and outputs working together. We'll create a personalized greeting system that adapts based on user input.

1. Create these inputs:
   ```
   /input user_name (Text) "The user's name for personalization"
   /input time_of_day (Text) "Morning, Afternoon, or Evening"
   /input mood (Text) "The desired tone of the greeting (friendly, professional, casual)"
   ```

2. Add a greeting generation:
   ```
   Write a warm greeting for `@user_name` that's appropriate for the `@time_of_day` 
   and matches the `@mood` tone. Include their name at least twice.
   ```

3. Create a follow-up generation:
   ```
   Based on the greeting (`@greetingGen`), suggest a relevant 
   follow-up question to ask `@user_name` that matches the `@mood`.
   ```

<Quiz 
  questions={[{
    question: 'Have you created the personalized greeting flow?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created the flow with multiple inputs and generations', isCorrect: true }
    ],
    successMessage: "Excellent! You've created a dynamic flow that demonstrates how inputs and outputs work together to create personalized content."
  }]} 
  onComplete={() => {}} 
/>

## Working with Different Content Types

Wordware supports a rich variety of content types to handle diverse use cases:

1. Text Formats
   - Plain text: For simple, unformatted content
   - Rich text: For formatted documents with styling
   - Markdown: For structured content with formatting
   - Code: For programming snippets and scripts
   - JSON: For structured data exchange

2. Media Types
   - Images: PNG, JPG, SVG, and more
   - Audio: MP3, WAV, and other formats
   - Video: MP4, WebM, and common video formats
   - Documents: PDF, DOCX, and spreadsheets

Each content type can be:
- Input through direct entry, file upload, or URL
- Generated by AI or transformed from other content
- Referenced using the `@` mention system
- Exported in various formats for different uses

## Next Steps

In the next lesson, we'll dive into AI generation and learn how to craft effective prompts that produce the exact content you need. You'll discover how to combine the input system you've learned with AI capabilities to create powerful, dynamic applications. 