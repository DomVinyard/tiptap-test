import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson1Quiz } from '@/app/education-101/quizData'

<VideoSection>
todo
</VideoSection>

# What is Wordware?

## Understanding Natural Language Programming

Wordware introduces a new paradigm in software development called "natural language programming." In this approach, you express your ideas using everyday language, and Wordware translates these instructions into functional AI workflows. The platform interprets not just text, but also images and audio, making it versatile for various applications. As stated in the documentation, Wordware "makes it almost effortless to build and maintain powerful agents" by centering everything around human-readable prompts.

<Quiz questions={[lesson1Quiz[0]]} onComplete={() => {}} />

## Building with Flows: Your AI Command Center

The heart of Wordware's functionality lies in its flow system. Flows (also called WordApps) are the fundamental building blocks of your applications. Each flow serves two essential purposes: it acts as both your documentation and your executable program. Think of a flow as a sequence of connected components - prompts, logic steps, and other elements - that work together to accomplish your goal. You can run this entire sequence with a single click or keyboard shortcut. This modular approach allows for flexible project organization: simple applications might need just one flow, while complex projects can be organized into multiple interconnected flows.

<Quiz questions={[lesson1Quiz[2]]} onComplete={() => {}} />

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Image+showing+an+empty+flow+with+some+basic+elements+labeled" 
    alt="Flow interface showing labeled basic elements"
    className="w-full block"
  />
</div>

## Key Features and Capabilities

At its foundation, Wordware excels at understanding plain English instructions. You don't need to learn complex syntax or programming constructs - simply express your intent clearly, and Wordware interprets it as a prompt for the AI system. This natural language approach makes AI development feel more like having a conversation than writing code.

Beyond text processing, Wordware provides a complete ecosystem for AI development. You can work with images and audio files, implement logical operations like conditions and loops, and connect to external services through APIs. Everything happens right in your browser, from initial development to testing and deployment.

<Quiz questions={[lesson1Quiz[1]]} onComplete={() => {}} />

This unified environment streamlines the entire development process. As you work in Wordware, your natural language instructions transform into functional applications. When you're ready, you can deploy your creation as a standalone app or API, making it immediately available for real-world use.

## Try It Yourself: Create Your First AI Flow

Let's put these concepts into practice with a simple example. First, visit wordware.ai and sign up for a free account. Once you're in, look for the "New Flow" button in the sidebar to create your first flow. In the editor, try typing a simple instruction:

```
Tell me a joke
```

Now, press Return for a new line, then add a Generation node by typing `/generation` and pressing Enter. Finally, run your flow with Ctrl+R or the Run button.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Screenshot+of+the+joke+flow" 
    alt="Screenshot showing a simple joke flow in Wordware"
    className="w-full block"
  />
</div>

Watch how Wordware processes your natural language input and produces the result. This simple interaction demonstrates the core principle: express your idea in plain language, let the AI process it, and receive your output.

<Quiz 
  questions={[{
    question: 'Have you created your first Wordware flow?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a flow and tested it', isCorrect: true }
    ],
    successMessage: "Great! You've taken your first step in building with Wordware. Feel free to experiment with more complex flows as you continue learning."
  }]} 
  onComplete={() => {}} 
/>