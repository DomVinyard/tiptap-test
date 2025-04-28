import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson10Quiz } from '@/app/education-101/quizData'





<VideoSection>
todo
</VideoSection>

# Managing Context

## Understanding Context

In Wordware, context means everything the AI can "see" when it generates a response. By default, that's all text above the current generation node. This can be both powerful and challenging:

```
Some text about cats...
More context here...
/generation
```

The AI sees both lines about cats as context for its response.

<Quiz questions={[lesson10Quiz[0]]} onComplete={() => {}} />

## Using Comments

Comments are your first tool for context control. They let you write notes that the AI can't see:

1. **Adding Comments**:
   ```
   // This is a hidden note
   Type `/comment` for a full comment block
   ```

2. **Use Cases**:
   - Documentation for humans
   - Temporary text removal
   - Testing different prompts

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Comment+Usage+for+Context+Control" 
    alt="Example of using comments to control context"
    className="w-full block"
  />
</div>

<Quiz questions={[lesson10Quiz[1]]} onComplete={() => {}} />

## Context Management Strategies

Here are key strategies for managing context in larger flows:

1. **Use Sub-flows**:
   - Break complex flows into smaller pieces
   - Each sub-flow has its own context
   - Parent flow only sees final outputs

2. **Summarize When Needed**:
   ```
   After several steps, add:
   Summarize the key points so far:
   - Point 1
   - Point 2
   Then use this summary going forward
   ```

3. **Reset Context**:
   ```
   // Previous context ends here
   ---
   New section starts with clean context
   ```

<Quiz questions={[lesson10Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Context Control

Let's practice managing context:

1. Use comments to hide text:
   ```
   Type `/comment`
   Write inside:
   This is a hidden note about the flow
   
   Add a generation below and verify
   the comment is invisible to it
   ```

2. Test context visibility:
   ```
   Write some text about cats
   Add a /comment around it
   Add a generation asking about dogs
   See that it doesn't mention cats!
   ```

3. Create a sub-flow:
   ```
   Make a new flow with verbose steps
   Call it from your main flow
   Notice the main flow only sees
   the final output
   ```

<Quiz 
  questions={[{
    question: 'Have you successfully managed context in your flow?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have used comments and sub-flows to control context', isCorrect: true }
    ],
    successMessage: "Great work! You're now a master of context management!"
  }]} 
  onComplete={() => {}} 
/>

## Best Practices

1. **Keep It Clean**: Remove or comment out unnecessary text
2. **Think Modular**: Use sub-flows for complex operations
3. **Document Well**: Use comments to explain your flow
4. **Be Mindful**: Remember that everything (except comments) is context
5. **Summarize**: Use summaries to compress long contexts

## Next Steps

In the next lesson, we'll explore If/Else & Loops – how to add logic and repetition to your flows. You'll learn to create dynamic, intelligent applications that can make decisions and repeat tasks as needed! 