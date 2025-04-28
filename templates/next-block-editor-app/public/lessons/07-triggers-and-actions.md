import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { lesson7Quiz } from '@/app/education-101/quizData'


<VideoSection>
todo
</VideoSection>

# Triggers & Actions

Time to go on autopilot! 🚦 Wordware isn't just about clicking "Run" manually – it can run your flows automatically using Triggers and Actions. Triggers are events that start your flow, like a scheduled time or an incoming message. Actions let your flow do things in the outside world, like sending emails or creating tasks. Together, they turn your AI flows into powerful automated workflows that can react to events and take action without your intervention!

## The Power of Automation

Imagine having your AI flows run exactly when you need them, without lifting a finger. That's the magic of triggers in Wordware. A trigger is like an AI assistant watching for specific events – it could be waiting for a particular time of day, monitoring for new emails, or listening for messages in your chat apps. When that event occurs, your flow springs into action automatically.

Getting started with triggers is straightforward: simply click "Add a Trigger" at the top of your flow, or type `/trigger` in the input bar. You'll be presented with a variety of trigger types to choose from, each serving a different automation need.

<div className="my-8 -mx-4 sm:-mx-6">
  <img 
    src="https://placehold.co/1200x600/e5e7eb/475569?text=Trigger+Configuration+Interface+with+Available+Types" 
    alt="Example of Wordware's trigger configuration interface showing various trigger types"
    className="w-full block"
  />
</div>

<Quiz questions={[lesson7Quiz[0]]} onComplete={() => {}} />

## Making Time Work for You

Schedule triggers are your personal AI timekeeper. They can wake up your flows at specific times, perfect for daily reports, weekly summaries, or monthly analytics. Whether you need something to run every morning at 9 AM, every Monday for weekly planning, or on the first of each month for reporting, schedule triggers have you covered. For more advanced timing needs, you can even set up custom cron schedules to match complex business requirements.

Beyond time-based automation, event triggers respond to real-world happenings in your connected systems. Your flow can spring into action when a new email lands in your inbox, when someone sends a message in Slack, or when data changes in your database. These event-based triggers turn your flows into responsive systems that adapt to your work environment in real-time.

<Quiz questions={[lesson7Quiz[1]]} onComplete={() => {}} />

## Taking Action in the Real World

While triggers determine when your flow runs, actions are how your flow makes its mark on the world. Wordware connects with over 2,000 different services, giving you incredible flexibility in what your flows can do. Adding an action is as simple as typing `/actions` in your flow. You'll find options for sending emails, posting to chat applications, managing projects, and handling documents – just about anything you can think of.

Setting up an action involves choosing your service, connecting your account, and configuring the specific details of what you want to happen. The real power comes from using `@mentions` to include AI-generated content in your actions. This creates a seamless bridge between AI thinking and real-world doing.

<Quiz questions={[lesson7Quiz[2]]} onComplete={() => {}} />

## Creating Your First Automated Workflow

Let's put this knowledge into practice by creating a daily report system. We'll start by setting up a schedule trigger for 9:00 AM each day. This will be our flow's alarm clock, ensuring it runs every morning when you need it.

Next, we'll add an AI generation step. Type `/generation` and name it "reportGen". This is where we'll ask the AI to create a concise daily status report, covering yesterday's achievements, today's priorities, and any pending items that need attention.

Finally, we'll set up an email action to deliver this report. Using `/actions`, select "Send Email" and configure it to send to your email address. The magic happens when we use @reportGen in the email body – this connects our AI-generated report directly to the email action.

<Quiz 
  questions={[{
    question: 'Have you created an automated workflow with triggers and actions?',
    type: 'multiple-choice',
    options: [
      { id: 'yes', text: '✓ Yes, I have set up an automated flow with scheduling and email', isCorrect: true }
    ],
    successMessage: "Fantastic! You've now mastered automation in Wordware!"
  }]} 
  onComplete={() => {}} 
/>

## The Art of Automation

As you begin your automation journey, start with simple workflows and gradually expand their complexity. Test each trigger and action thoroughly in a controlled environment before letting them run freely. Keep an eye on your automated flows, especially in the beginning, to ensure they're producing the results you expect.

Remember that even the best automation can encounter unexpected situations. Consider how your flow should handle errors and edge cases. Document your automation's purpose and schedule – your future self will thank you when managing multiple automated workflows.

## Congratulations!

You've completed your journey through Wordware's core features! You now understand how to harness AI for text and image generation, craft effective prompts, and build automated workflows that work while you sleep. The combination of triggers and actions opens up endless possibilities for creating powerful, automated solutions that transform how you work. Keep experimenting and building – the future of AI automation is in your hands! 🎉 