import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson4Quiz } from '@/app/education-101/quizData'


<VideoSection>
todo
</VideoSection>

# AI Generation

## Text Generation

Creating content with AI is as simple as describing what you want in natural language. Start by adding a generation node to your flow using the `/generation` command. Then, write your prompt to tell the AI what to create.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Text+Generation+Example" 
    alt="Screenshot showing a text generation prompt and its output"
    className="w-full block"
  />
</div>

When working with text generation, start by thinking about what you want to create. Your generation node acts as a conversation with the AI, where you explain your needs and requirements. Begin with the core content you want to generate, such as a blog post or marketing copy. Then, enhance your request by describing the style, tone, and target audience you have in mind. You can reference previous inputs or generations using the `@` symbol, making your flows dynamic and interconnected.

The AI will process your request and generate content based on your description. If the first result isn't quite what you wanted, you can refine your request and try again. This iterative process helps you get exactly the content you need.

<Quiz questions={[lesson4Quiz[0]]} onComplete={() => {}} />

## Image Generation

Wordware's AI can also bring your visual ideas to life. Using the `/image` command, you can create custom images by describing what you want to see. The process is similar to text generation – you describe your vision, and the AI creates it.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Image+Generation+Interface" 
    alt="Screenshot showing the image generation interface with prompt and settings"
    className="w-full block"
  />
</div>

When creating images, start by describing the main subject or scene you want to create. Think about the overall composition – what should be the focal point? What mood do you want to convey? Consider the style you're aiming for, whether it's photorealistic, artistic, or abstract. You can specify technical aspects like image dimensions and color schemes to match your needs.

Just like with text generation, image creation is an iterative process. Your first attempt might not capture exactly what you envisioned. When this happens, you can adjust your description and try again, refining the image until it matches your vision.

<Quiz questions={[lesson4Quiz[1]]} onComplete={() => {}} />

## Structured Generation

Sometimes you need more than just free-form text or images – you need AI to generate structured, predictable data. That's where structured generations come in. Using the `/structure` command, you can guide the AI to produce data in specific formats, perfect for when you need to work with databases, APIs, or any system that expects organized information.

Think of structured generation as giving the AI a template to fill out. Instead of asking for a general description of a recipe, you might want specific fields like ingredients, cooking time, and step-by-step instructions. The AI will then generate content that fits exactly into these predefined fields, making it easy to use the data in other parts of your application.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Structured+Generation+with+Field+Types" 
    alt="Example of a structured generation showing different field types and their configuration"
    className="w-full block"
  />
</div>

When creating a structured generation, you'll define the shape of your data using different field types. Text fields work great for descriptions or titles, while number fields handle quantities or measurements. Boolean fields give you true/false values, perfect for status flags or availability checks. You can even create nested structures using object fields, or collections using list fields.

The real power comes from how you organize these fields. The AI generates content from top to bottom, using its previous work to guide future decisions. Consider putting summary fields at the bottom of your structure, allowing the AI to reflect on all the details it's generated. You can also add descriptions to each field, helping the AI understand exactly what kind of content you're looking for.

Just like with regular generations, you can reference the output using @mentions. The difference is that you'll have access to specific fields within the structured output, making it easy to use exactly the pieces of data you need in other parts of your flow.

## Working with All Types

Text, image, and structured generation each serve different purposes, but they truly shine when used together. Imagine creating a product catalog: you might use structured generation to organize the product details, text generation to create compelling descriptions, and image generation to visualize each item. The key to success is understanding how these different types of generation complement each other.

Start simple with your generations and build complexity gradually. Consider your audience and the context where the content will be used. For instance, a corporate website might need a different approach than a creative blog. Remember that you can always refine and adjust your generations until they align perfectly with your vision.

<Quiz questions={[lesson4Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Create a Blog Post with Custom Image

Let's create a flow that generates both text and visual content for a blog post.

1. Set up your inputs:
   ```
   /input topic (Text) "Main topic of the blog post"
   /input style (Text) "Writing style (casual, professional, technical)"
   /input image_style (Text) "Visual style for the header image"
   ```

2. Generate the blog post:
   ```
   Write a blog post about @topic in a @style style. 
   Include an engaging introduction, three main points, and a conclusion.
   ```

3. Create a matching header image:
   ```
   /image
   Create a visually appealing header image for a blog post about @topic
   Style: @image_style
   Include relevant visual elements that complement the content
   Make it modern and professional
   ```

<Quiz 
  questions={[{
    question: 'Have you created content using both text and image generation?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a blog post with a custom header image', isCorrect: true }
    ],
    successMessage: "Excellent! You've experienced how text and image generation can work together to create compelling content."
  }]} 
  onComplete={() => {}} 
/>

## Next Steps

In the next lesson, we'll explore how to organize your workflows using Subflows, allowing you to create modular, reusable components that make your applications more maintainable and scalable. 