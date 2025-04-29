import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson11Quiz } from '@/app/education-101/quizData'


<VideoSection>
todo
</VideoSection>

# Conditions & Loops

## Understanding If-Else Nodes

Think of an if-else node as a smart traffic director in your flow. It examines a condition you specify and then guides your flow down the appropriate path. Each if-else node can handle multiple conditions, checking them in order until it finds one that's true. This makes your flows more dynamic and responsive to different situations.

To add this decision-making capability to your flow, simply type `/if` in the editor and press Enter. Wordware will guide you through setting up your conditions and actions in the attributes editor, making it easy to create sophisticated logic without any coding.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=If-Else+Node+Configuration+Interface" 
    alt="Screenshot showing the if-else node interface with conditions and actions"
    className="w-full block"
  />
</div>

<Quiz questions={[lesson11Quiz[0]]} onComplete={() => {}} />

## Creating Conditions

In the attributes editor, you'll find the Expressions section where you can set up your conditions. Each condition has two parts that you can compare, along with different ways to make that comparison. The interface makes it easy to work with different types of values:

For matching exact values, use the Equals comparison. When working with text, you can use Contains to check if one piece of text appears within another. Numbers open up even more possibilities - you can check if values are greater than, less than, or equal to each other.

Want to add more conditions? Just click the "Add If" button below your existing conditions. And don't forget about the else condition - it's your catch-all that runs when none of the other conditions are true, ensuring your flow always knows what to do.

<Quiz questions={[lesson11Quiz[1]]} onComplete={() => {}} />

## Taking Action

Once you've set up your conditions, you can specify what should happen when each one is true. In the editor, simply add the nodes you want to run under each condition. You can use any type of node - generations, mentions, or even other if-else nodes for more complex logic.

For example, imagine creating a flow that greets users differently based on whether they're logged in. When the user is known, you might generate a personalized welcome message. Otherwise, you could prompt them to log in first. The if-else node makes this kind of personalization simple and intuitive.

<Quiz questions={[lesson11Quiz[2]]} onComplete={() => {}} />

## Try It Yourself: Create a Smart Greeter

Let's create a flow that responds differently based on user status. We'll use an if-else node to create a personalized experience.

Start by adding an input for the user's status. Then, add an if-else node that checks this status. In the Expressions section, set up a condition to check if the user is known. Under this condition, add a friendly greeting that welcomes them back. In the else section, add a polite message asking them to log in.

This simple example demonstrates how if-else nodes can make your flows more responsive and user-friendly. As you get comfortable with these concepts, you can create increasingly sophisticated flows that handle multiple conditions and complex scenarios.

<Quiz 
  questions={[{
    question: 'Have you created a flow that responds differently based on conditions?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a flow that adapts based on user status', isCorrect: true }
    ],
    successMessage: "Excellent! You're now creating flows that can make smart decisions!"
  }]} 
  onComplete={() => {}} 
/>

## Best Practices

When working with if-else nodes, start with the most specific conditions first and work your way down to more general cases. Keep your conditions clear and focused - it's better to use multiple simple conditions than one complex one. Remember to always include an else condition as a fallback, ensuring your flow handles all possible situations gracefully.

## Working with Loops

Sometimes you need to repeat certain actions in your flow, whether it's generating multiple variations of content or processing a list of items. That's where loops come in. To add a loop to your flow, type `/loop` in the editor and press Enter. You'll be prompted to configure your loop in the attributes editor.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Loop+Configuration+Interface" 
    alt="Screenshot showing the loop interface with its three types: Count, List, and Expression"
    className="w-full block"
  />
</div>

### Types of Loops

Wordware offers three powerful ways to structure your loops:

1. Count: Perfect when you need to repeat something a specific number of times. Simply enter the number of iterations you want, and the loop will run exactly that many times. This is great for generating multiple variations of content or running a process a fixed number of times.

2. List: When you have a collection of items to process, the List loop type lets you iterate through them one by one. This is ideal for scenarios like processing multiple user inputs or generating content for each item in a dataset.

3. Expression: The most flexible option, Expression loops continue until a specific condition is met. This is powerful for scenarios where you need to keep trying until you achieve a desired outcome, like refining content until it meets certain criteria.

<Quiz questions={[{
  question: 'What type of loop would you use to repeat an action a specific number of times?',
  type: 'multiple-choice',
  options: [
    { id: 'a', text: 'Expression Loop', isCorrect: false },
    { id: 'b', text: 'Count Loop', isCorrect: true },
    { id: 'c', text: 'List Loop', isCorrect: false },
    { id: 'd', text: 'While Loop', isCorrect: false }
  ],
  successMessage: "Correct! Count loops are perfect when you need to repeat something a specific number of times."
}]} onComplete={() => {}} />

### Using Loops Effectively

Each loop has a Label field in the attributes editor, which you'll need if you want to reference the loop's output later using @mentions. This is particularly useful when you want to use the results of your loop in other parts of your flow.

Let's look at a practical example. Imagine you want to generate three different movie pitch ideas:

1. Start by typing `/loop` and selecting the Count type
2. Set the count to 3
3. Inside the loop, add a generation node that creates a movie pitch
4. Each iteration will give you a fresh, unique pitch

<Quiz questions={[{
  question: 'What is the purpose of the Label field in a loop?',
  type: 'multiple-choice',
  options: [
    { id: 'a', text: 'To make the loop run faster', isCorrect: false },
    { id: 'b', text: 'To reference the loop\'s output using @mentions', isCorrect: true },
    { id: 'c', text: 'To change the loop\'s color', isCorrect: false },
    { id: 'd', text: 'To delete the loop', isCorrect: false }
  ],
  successMessage: "Perfect! Labels allow you to reference your loop's output in other parts of your flow using @mentions."
}]} onComplete={() => {}} />

## Try It Yourself: Create a Content Generator

Let's put both if-else and loops together to create something interesting. We'll build a flow that generates different types of content repeatedly until it meets our criteria.

1. Add an input for the content type (blog post, social media, email)
2. Use an if-else node to handle each content type differently
3. Within each branch, add a loop that generates content until it matches your desired tone or style
4. Use @mentions to reference and refine the generated content

This exercise will help you understand how combining these powerful features can create sophisticated, adaptive flows.

<Quiz 
  questions={[{
    question: 'Have you created a flow that uses both conditions and loops?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have created a flow that generates content using both features', isCorrect: true }
    ],
    successMessage: "Fantastic! You're now creating truly dynamic and powerful flows!"
  }]} 
  onComplete={() => {}} 
/>

## Best Practices

When working with if-else nodes and loops:
- Start with the most specific conditions first
- Keep your loops focused on a single task
- Use meaningful labels for easy reference
- Consider performance implications for loops
- Always include fallback conditions
- Test your flows with different inputs

## Next Steps

In our next lesson, we'll explore advanced prompting techniques that will help you create even more sophisticated AI interactions. You'll learn how to craft precise prompts that leverage the full potential of language models! 