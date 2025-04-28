import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson2Quiz } from '@/app/education-101/quizData'



<VideoSection>
todo
</VideoSection>

# Using the Editor

## The Command Menu

The most important tool in the Wordware editor is the command menu, accessed by typing /. This brings up a list of all available actions and node types. For example, type /generation to create an AI processing node, /if for conditional logic, or /comment to add notes that won't affect the AI's behavior.

<Quiz questions={[lesson2Quiz[1]]} onComplete={() => {}} />

## Organizing Your Content

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Screenshot+showing+how+to+use+the+command+menu+and+organize+nodes+in+the+editor" 
    alt="Wordware editor interface showing nodes, command menu, and file structure"
    className="w-full block"
  />
</div>

The Files pane on the left helps you manage your projects efficiently. Here you can:
- Create new flows and organize them into folders
- Access pre-built templates to jumpstart your projects
- Share your flows with team members
- Duplicate or rename existing flows

<Quiz questions={[lesson2Quiz[2]]} onComplete={() => {}} />

## Making Your Content Clear

The editor supports Markdown formatting to help structure your content effectively:
- Use # for main headings and ## for subheadings
- Create lists with - or * characters
- Add emphasis with **bold** or *italic* text
- Insert code blocks with backticks

Remember that formatting isn't just for appearance—it helps both you and the AI understand the structure of your instructions.

<Quiz questions={[lesson2Quiz[0]]} onComplete={() => {}} />

## Try It Yourself: Format a Flow

Let's practice using the editor's formatting features. Create a new flow and try these formatting techniques:

```
# My First Formatted Flow

This is a simple example showing how to:
- Use headings
- Create lists
- Add **emphasis** to important points

/generation
Tell me what formatting you see in the text above.
```

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Screenshot+showing+the+formatted+flow+example+with+headings+lists+and+emphasis" 
    alt="Example flow showing formatted text with headings, lists, and emphasis applied"
    className="w-full block"
  />
</div>

Watch how the AI recognizes and responds to your formatted content. Notice how the structured text makes your instructions clearer and more organized.

<Quiz 
  questions={[{
    question: 'Have you created a formatted flow?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created and formatted a flow', isCorrect: true }
    ],
    successMessage: "Well done! You're now equipped with the essential editor skills needed to create clear, well-structured flows."
  }]} 
  onComplete={() => {}} 
/> 