# Lesson Structure Guidelines

Each lesson in our educational content should follow this consistent structure to ensure optimal learning outcomes and maintain a cohesive experience across the platform.

## File Format
- Use `.md` extension
- Place in `/public/lessons/` directory
- Name format: `XX-lesson-name.md` where XX is the lesson number

## Required Imports
```typescript
import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson1Quiz } from '@/app/education-101/quizData'
```

## Content Structure

### 1. Title Section
- Start with a clear, concise H1 title
- Follow immediately with a VideoSection component containing:
  - Brief, engaging introduction (2-3 sentences)
  - Core concept explanation
  - Real-world context or application
  - Keep tone welcoming but professional

### 2. Main Content Sections
Write content in a narrative, flowing style:
- Use H2 headings for main sections
- Maximum 3-4 main sections per lesson
- Each section should:
  - Start with a clear concept introduction
  - Present information in narrative paragraphs
  - Include relevant examples and context
  - Add a quiz question after key concepts
  - Keep paragraphs to 3-4 sentences maximum

### 3. Visual Elements
- Use 1-2 images per lesson maximum
- Place images at key points where visual explanation adds the most value:
  - After introducing a concept that needs visualization
  - Before hands-on exercises to show what to expect
  - When demonstrating UI elements or workflows
  - After code examples to show the expected result
- When showing code examples with results:
  1. First show the code block with the example
  2. Follow immediately with an image showing how it looks in practice
  3. Then explain what to observe or what to do next
- Image implementation:
  ```html
  <div className="my-8 -mx-4 sm:-mx-6">
    <img 
      src="https://placehold.co/1200x600/e5e7eb/475569?text=Your+descriptive+text+here" 
      alt="Descriptive alt text for accessibility"
      className="w-full block"
    />
  </div>
  ```
- Image guidelines:
  - Use placeholder images during development (1200x600 size)
  - Make the placeholder text clear and descriptive
  - Write meaningful alt text for accessibility
  - Avoid redundant captions when the image text is self-explanatory
  - Keep image text concise and focused
  - When showing examples, describe both what's shown and what to look for

### 4. Quiz Integration
- Place quiz components after their relevant content sections
- Keep to 3-4 quiz questions per lesson
- Format:
  ```jsx
  <Quiz questions={[lessonQuiz[index]]} onComplete={() => {}} />
  ```

### 5. Hands-on Section
- Title as "Try It Yourself: [Action]"
- Write instructions in narrative form
- Include code examples in backticks
- End with a single-option completion check:
  ```jsx
  <Quiz 
    questions={[{
      question: 'Have you completed [action]?',
      type: 'multiple-choice',
      options: [
        { id: 'yes', text: '✓ Yes, I have [completed action]', isCorrect: true }
      ],
      successMessage: "[Encouraging message about progress]"
    }]} 
    onComplete={() => {}} 
  />
  ```

## Writing Style

### Narrative Flow
- Present information in a conversational, flowing style
- Convert lists and bullet points into coherent paragraphs
- Use transitional phrases to connect ideas
- Build concepts progressively
- Provide context before introducing new terms
- When mentioning commands, wrap them in backticks (e.g. Type `/command`)

### Voice and Tone
- Use active voice
- Write in second person ("you")
- Keep technical terms consistent
- Explain concepts before showing examples
- Use analogies to clarify complex ideas
- Maintain a professional but approachable tone

### Content Organization
1. Introduction (with video)
2. Concept explanation with narrative flow
3. Quiz validation
4. Practical example
5. Visual demonstration
6. Hands-on practice
7. Completion confirmation

## Navigation
- Each lesson should flow naturally to the next
- End each lesson with a preview of what's coming next
- Use black "Next" button for clear progression
- Keep "Previous" button subtle for hierarchy

## Common Mistakes to Avoid
- Don't use bullet points for main content presentation
- Avoid isolated lists of features or capabilities
- Don't present information in disconnected chunks
- Avoid marketing language
- Don't make completion mandatory
- Keep code examples simple and focused
- Don't overwhelm with technical jargon
- Avoid redundant image captions when text is in the image

## Accessibility
- Include alt text for all images
- Use semantic heading structure
- Maintain clear visual hierarchy
- Ensure color is not the only differentiator
- Keep language clear and concise
- Write descriptive link text
- Provide text alternatives for visual content

## Command Formatting
- Always wrap commands and user inputs in backticks
- Examples:
  - Type `/input` to create a new input
  - Use `@mention` to reference variables
  - The `/flow` command creates a new flow
- For longer commands or code blocks, use triple backticks with appropriate language tag
- Keep command examples concise and focused

## Writing Guidelines

### Converting Lists to Narrative
Instead of using bullet points or lists to present information, write in a flowing narrative style. Here are examples:

❌ Bad:
Key aspects of feature X:
- Point 1
- Point 2
- Point 3

✓ Good:
Feature X begins with [first concept], which naturally leads to [second concept]. This creates a foundation for [third concept], completing the workflow.

### Presenting Multiple Items
When you need to present multiple related items, weave them into the narrative:

❌ Bad:
Types of content:
- Type 1: Description
- Type 2: Description
- Type 3: Description

✓ Good:
Content comes in several forms. The first type [describe]. Building on this, the second type [describe]. Finally, the third type [describe] completes the picture.

### Exceptions for Lists
Lists are ONLY acceptable in these specific cases:
1. Code examples or command syntax
2. Step-by-step instructions in "Try It Yourself" sections
3. Technical specifications that must be precisely enumerated
4. Quick reference information in sidebars or callouts

Even in these cases, prefer narrative form when possible.

### Transitional Phrases
Use these to connect ideas instead of lists:
- "First... Then... Finally..."
- "This leads to... Which enables..."
- "Building on this..."
- "This creates the foundation for..."
- "This naturally progresses to..." 