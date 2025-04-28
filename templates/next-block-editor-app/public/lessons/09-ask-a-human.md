import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson9Quiz } from '@/app/education-101/quizData'


<VideoSection>
todo
</VideoSection>

# Ask a Human

## Understanding Human-in-the-Loop

While AI is incredibly powerful, there are times when human judgment, creativity, or expertise is invaluable. Wordware's Ask a Human feature lets you pause your flow at strategic points to gather human input before continuing. This creates a collaborative workflow where AI and humans work together to produce the best possible results.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Human+in+the+Loop+Workflow" 
    alt="Diagram showing how Ask a Human integrates into a flow, with AI steps in blue and human input steps in green"
    className="w-full block"
  />
</div>

Common scenarios for using Ask a Human:
- Content approval and refinement
- Creative direction and brainstorming
- Quality assurance and fact-checking
- Complex decision-making
- Sensitive content review
- Expert knowledge input

<Quiz questions={[lesson9Quiz[0]]} onComplete={() => {}} />

## Creating Human Input Steps

Adding human input to your flow is straightforward. You'll use the `/human` command to create a pause point where human input is needed. Here's how to structure your human input requests effectively:

1. Set clear context
   ```
   /human
   Please review this blog post introduction and provide feedback on:
   - Tone and engagement
   - Key message clarity
   - Target audience alignment
   
   Content to review: @blogIntro
   ```

2. Define specific actions
   ```
   /human
   Based on the AI-generated image (@generatedImage), please:
   1. Choose the best color scheme (warm or cool)
   2. Suggest any composition adjustments
   3. Approve or request regeneration
   ```

3. Provide format guidance
   ```
   /human
   Review the product description (@productDesc) and provide your input as:
   APPROVE: If it's ready to use
   REVISE: Plus specific change requests
   REJECT: Plus reason for rejection
   ```

<Quiz questions={[lesson9Quiz[1]]} onComplete={() => {}} />

## Best Practices for Human Input

To make the most of human input in your flows, follow these guidelines:

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Human+Input+Best+Practices" 
    alt="Visual guide showing effective vs ineffective ways to structure human input requests"
    className="w-full block"
  />
</div>

1. Be Specific and Clear
   - Provide necessary context
   - Ask focused questions
   - Define expected response format
   - Set clear success criteria

2. Time it Right
   - Place human input steps at strategic points
   - Group related decisions together
   - Consider workflow efficiency
   - Allow for batch processing when possible

3. Handle Responses Effectively
   - Plan for different response types
   - Include validation steps
   - Provide clear next steps
   - Document decisions for future reference

<Quiz questions={[lesson9Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Create a Content Review Flow

Let's build a practical flow that incorporates human input for content review and refinement.

1. Create the initial content generation:
   ```
   /input content_type (Text) "Type of content to generate (blog post, social media, email)"
   /input topic (Text) "Main topic or subject matter"
   
   Generate a draft @content_type about @topic that's informative and engaging.
   ```

2. Add the human review step:
   ```
   /human
   Please review this @content_type draft about @topic:

   Content to review:
   @draftContent

   Please provide your input in the following format:
   QUALITY (1-5):
   STRENGTHS:
   AREAS TO IMPROVE:
   SPECIFIC CHANGES:
   ```

3. Create the refinement step:
   ```
   Based on the human feedback (@humanFeedback), revise the content while maintaining 
   the original voice and incorporating the suggested improvements.
   ```

<Quiz 
  questions={[{
    question: 'Have you created the content review flow with human input?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a flow that combines AI generation with human review', isCorrect: true }
    ],
    successMessage: "Great work! You've created a flow that effectively combines AI capabilities with human expertise for better content creation."
  }]} 
  onComplete={() => {}} 
/>

## Next Steps

In the next lesson, we'll explore how to handle errors and edge cases in your flows, ensuring your applications are robust and reliable even when things don't go exactly as planned. You'll learn strategies for graceful error handling, input validation, and creating fallback options. 