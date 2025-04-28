import { QuizQuestion } from '@/components/Quiz'

export const lesson1Quiz: QuizQuestion[] = [
  {
    question: 'What is Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'A code library for machine learning', isCorrect: false },
      { id: 'b', text: 'A toolkit for building AI apps using natural language', isCorrect: true },
      { id: 'c', text: 'A database management system', isCorrect: false },
      { id: 'd', text: 'A cloud storage platform', isCorrect: false }
    ],
    successMessage: "That's right! Wordware is all about making AI development accessible through natural language - no traditional coding required."
  },
  {
    question: 'How do you write AI workflows in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'By writing code in a programming language', isCorrect: false },
      { id: 'b', text: 'Using plain English and natural language', isCorrect: true },
      { id: 'c', text: 'By drawing flowcharts', isCorrect: false },
      { id: 'd', text: 'Using specialized AI markup language', isCorrect: false }
    ],
    successMessage: "Exactly! Wordware's power comes from its ability to understand your instructions in plain English, making AI development as simple as having a conversation."
  },
  {
    question: 'What is a "flow" in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'A type of AI model', isCorrect: false },
      { id: 'b', text: 'A sequence of prompts and logic steps that form an app', isCorrect: true },
      { id: 'c', text: 'A file where you store data', isCorrect: false },
      { id: 'd', text: 'A background image', isCorrect: false }
    ],
    successMessage: "Perfect! Flows are the building blocks of Wordware applications - they organize your prompts and logic into a coherent sequence that can be run with a single click."
  }
]

export const lesson2Quiz: QuizQuestion[] = [
  {
    question: 'What happens when you hit the "Run" button in the Wordware editor?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'It saves your flow', isCorrect: false },
      { id: 'b', text: 'It executes the flow step-by-step, showing AI outputs live', isCorrect: true },
      { id: 'c', text: 'It exports the flow as code', isCorrect: false },
      { id: 'd', text: 'It sends an email to the developers', isCorrect: false }
    ],
    successMessage: "Correct! The Run button executes your flow in real-time, letting you see exactly how the AI processes each step."
  },
  {
    question: 'How do you add a new AI-generation node?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Type @AI', isCorrect: false },
      { id: 'b', text: 'Click an "Add Node" button', isCorrect: false },
      { id: 'c', text: 'Type /generation and press Enter', isCorrect: true },
      { id: 'd', text: 'Wordware automatically adds them', isCorrect: false }
    ],
    successMessage: "That's right! The /generation command is your go-to way to add AI processing to your flow."
  },
  {
    question: 'Where do you manage and create flows in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'In the "Files" pane on the left – where you can create, rename, and organize flows and folders', isCorrect: true },
      { id: 'b', text: "You can only manage flows on the website's dashboard", isCorrect: false },
      { id: 'c', text: 'In a separate app', isCorrect: false },
      { id: 'd', text: "Wordware doesn't use flows", isCorrect: false }
    ],
    successMessage: "Exactly! The Files pane is your command center for organizing all your Wordware projects."
  }
]

export const lesson3Quiz: QuizQuestion[] = [
  {
    question: 'Which of these is NOT a Wordware input type?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Text', isCorrect: false },
      { id: 'b', text: 'Number', isCorrect: false },
      { id: 'c', text: 'Weather Forecast', isCorrect: true },
      { id: 'd', text: 'List', isCorrect: false }
    ],
    successMessage: "Correct! While Wordware supports many data types like Text, Number, and List, it uses these basic types to build more complex functionality rather than having specialized types like Weather Forecast."
  },
  {
    question: 'How do you reference a previously generated result or input in your prompt?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Use the $ symbol', isCorrect: false },
      { id: 'b', text: 'Use the @ symbol', isCorrect: true },
      { id: 'c', text: 'Use curly braces {}', isCorrect: false },
      { id: 'd', text: 'Use square brackets []', isCorrect: false }
    ],
    successMessage: "That's right! The @ symbol is your key to accessing previous results and inputs in Wordware. For example, @generationName or @inputName."
  },
  {
    question: 'How do you access variables from a sub-flow named "GetWeather" that outputs a temperature?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '@GetWeather.temp', isCorrect: true },
      { id: 'b', text: 'GetWeather.temp', isCorrect: false },
      { id: 'c', text: '@temp', isCorrect: false },
      { id: 'd', text: '$GetWeather.temp', isCorrect: false }
    ],
    successMessage: "Exactly! When working with sub-flows, you access their outputs using the format @flowName.variableName."
  }
]

export const lesson4Quiz: QuizQuestion[] = [
  {
    question: 'What is the primary purpose of AI generation in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'To create databases', isCorrect: false },
      { id: 'b', text: 'To generate content based on natural language prompts', isCorrect: true },
      { id: 'c', text: 'To store files', isCorrect: false },
      { id: 'd', text: 'To format text', isCorrect: false }
    ],
    successMessage: "Correct! AI generation in Wordware allows you to create content simply by describing what you want in natural language."
  },
  {
    question: 'What happens when you add a generation node to your flow?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'It automatically generates random content', isCorrect: false },
      { id: 'b', text: 'It creates a new space where you can write prompts for AI generation', isCorrect: true },
      { id: 'c', text: 'It deletes your previous work', isCorrect: false },
      { id: 'd', text: 'It exports your flow', isCorrect: false }
    ],
    successMessage: "That's right! Generation nodes are where you write prompts to tell the AI what content to create."
  },
  {
    question: 'How can you improve AI generation results?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'By using more technical programming terms', isCorrect: false },
      { id: 'b', text: 'By providing clear, detailed instructions in your prompts', isCorrect: true },
      { id: 'c', text: 'By using shorter prompts', isCorrect: false },
      { id: 'd', text: 'By removing all punctuation', isCorrect: false }
    ],
    successMessage: "Exactly! Clear, detailed instructions help the AI understand exactly what you want it to generate."
  }
]

export const lesson5Quiz: QuizQuestion[] = [
  {
    question: 'What is the primary purpose of image generation in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'To edit existing photos', isCorrect: false },
      { id: 'b', text: 'To create custom visuals from text descriptions', isCorrect: true },
      { id: 'c', text: 'To store image files', isCorrect: false },
      { id: 'd', text: 'To compress images', isCorrect: false }
    ],
    successMessage: "Correct! Image generation in Wordware allows you to create custom visuals simply by describing what you want in natural language."
  },
  {
    question: 'What is a best practice for writing image generation prompts?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Use very short, one-word descriptions', isCorrect: false },
      { id: 'b', text: 'Include detailed descriptions of style, composition, and subject', isCorrect: true },
      { id: 'c', text: 'Only specify the image size', isCorrect: false },
      { id: 'd', text: 'Use technical AI terms', isCorrect: false }
    ],
    successMessage: "Exactly! Detailed descriptions that include style, composition, and subject matter help the AI generate more accurate and appealing images."
  },
  {
    question: 'How can you refine generated images in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'By manually editing pixels', isCorrect: false },
      { id: 'b', text: 'By adjusting the prompt and regenerating', isCorrect: true },
      { id: 'c', text: 'By applying filters', isCorrect: false },
      { id: 'd', text: 'Images cannot be refined', isCorrect: false }
    ],
    successMessage: "Perfect! Iterative refinement through prompt adjustment is the key to getting exactly the image you want."
  }
]

export const lesson6Quiz: QuizQuestion[] = [
  {
    question: 'What makes a good basic prompt in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Using complex technical jargon', isCorrect: false },
      { id: 'b', text: 'Clear, specific instructions with context', isCorrect: true },
      { id: 'c', text: 'Single word commands', isCorrect: false },
      { id: 'd', text: 'Random keywords', isCorrect: false }
    ],
    successMessage: "Correct! Good prompts are clear and specific, providing necessary context for the AI to understand what you want."
  },
  {
    question: 'Which element is most important in a basic prompt?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Fancy formatting', isCorrect: false },
      { id: 'b', text: 'Clear instruction of what you want to achieve', isCorrect: true },
      { id: 'c', text: 'Length of the prompt', isCorrect: false },
      { id: 'd', text: 'Technical terminology', isCorrect: false }
    ],
    successMessage: "Exactly! A clear instruction is the foundation of an effective prompt."
  },
  {
    question: 'How should you structure a basic prompt?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Start with complex requirements', isCorrect: false },
      { id: 'b', text: 'Begin with context, then add specific instructions', isCorrect: true },
      { id: 'c', text: 'Use only technical terms', isCorrect: false },
      { id: 'd', text: 'Make it as short as possible', isCorrect: false }
    ],
    successMessage: "Perfect! Starting with context and following with specific instructions helps the AI understand and execute your request better."
  }
]

export const lesson7Quiz: QuizQuestion[] = [
  {
    question: 'What is the purpose of triggers in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'To format text', isCorrect: false },
      { id: 'b', text: 'To start flows automatically based on events', isCorrect: true },
      { id: 'c', text: 'To delete flows', isCorrect: false },
      { id: 'd', text: 'To change colors', isCorrect: false }
    ],
    successMessage: "Correct! Triggers allow your flows to start automatically in response to specific events."
  },
  {
    question: 'What is an action in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'A way to delete flows', isCorrect: false },
      { id: 'b', text: 'A task that Wordware performs based on your instructions', isCorrect: true },
      { id: 'c', text: 'A type of file', isCorrect: false },
      { id: 'd', text: 'A color scheme', isCorrect: false }
    ],
    successMessage: "That's right! Actions are the tasks that Wordware performs based on your instructions."
  },
  {
    question: 'How do triggers and actions work together?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'They don\'t work together', isCorrect: false },
      { id: 'b', text: 'Triggers start flows, which can then perform actions', isCorrect: true },
      { id: 'c', text: 'Actions trigger flows', isCorrect: false },
      { id: 'd', text: 'They only work separately', isCorrect: false }
    ],
    successMessage: "Perfect! Triggers and actions create automated workflows - triggers start the flow, and actions execute the tasks."
  }
]

export const lesson8Quiz: QuizQuestion[] = [
  {
    question: 'What is prompt chaining in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Connecting multiple prompts to create complex workflows', isCorrect: true },
      { id: 'b', text: 'Writing longer prompts', isCorrect: false },
      { id: 'c', text: 'Deleting prompts', isCorrect: false },
      { id: 'd', text: 'Copying prompts', isCorrect: false }
    ],
    successMessage: "Correct! Prompt chaining allows you to build complex workflows by connecting multiple prompts together."
  },
  {
    question: 'Why would you use prompt chaining?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'To make prompts shorter', isCorrect: false },
      { id: 'b', text: 'To break complex tasks into manageable steps', isCorrect: true },
      { id: 'c', text: 'To delete prompts', isCorrect: false },
      { id: 'd', text: 'To use less memory', isCorrect: false }
    ],
    successMessage: "Exactly! Chaining helps you break down complex tasks into smaller, more manageable steps."
  },
  {
    question: 'How do you reference output from a previous prompt in a chain?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'You cannot reference previous outputs', isCorrect: false },
      { id: 'b', text: 'Using the @ symbol with the prompt name', isCorrect: true },
      { id: 'c', text: 'By copying and pasting', isCorrect: false },
      { id: 'd', text: 'Using the # symbol', isCorrect: false }
    ],
    successMessage: "Perfect! Using the @ symbol allows you to reference outputs from previous prompts in your chain."
  }
]

export const lesson9Quiz: QuizQuestion[] = [
  {
    question: 'When is it most appropriate to use the Ask a Human feature?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'For every single step in a flow', isCorrect: false },
      { id: 'b', text: 'When human judgment, creativity, or expertise would significantly improve the outcome', isCorrect: true },
      { id: 'c', text: 'Only for final approval of content', isCorrect: false },
      { id: 'd', text: 'Never, AI should handle everything', isCorrect: false }
    ],
    successMessage: "Exactly! The Ask a Human feature is most valuable when human expertise can meaningfully contribute to the process, such as creative direction, quality assurance, or complex decision-making."
  },
  {
    question: 'What is the correct command to add a human input step to your flow?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '/ask', isCorrect: false },
      { id: 'b', text: '/human', isCorrect: true },
      { id: 'c', text: '/input', isCorrect: false },
      { id: 'd', text: '/review', isCorrect: false }
    ],
    successMessage: "Correct! The /human command creates a pause point in your flow where human input is required before proceeding."
  },
  {
    question: 'Which of the following is a best practice for structuring human input requests?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Leave the format open-ended to allow for maximum creativity', isCorrect: false },
      { id: 'b', text: 'Ask as many questions as possible in one step', isCorrect: false },
      { id: 'c', text: 'Provide clear context and specify the expected response format', isCorrect: true },
      { id: 'd', text: 'Only ask yes/no questions', isCorrect: false }
    ],
    successMessage: "That's right! Providing clear context and specifying the expected response format helps ensure you get the most useful human input for your flow."
  }
]

export const lesson10Quiz: QuizQuestion[] = [
  {
    question: 'What is context in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'The color scheme of your flow', isCorrect: false },
      { id: 'b', text: 'The information available to the AI when processing a prompt', isCorrect: true },
      { id: 'c', text: 'The file size', isCorrect: false },
      { id: 'd', text: 'The number of prompts', isCorrect: false }
    ],
    successMessage: "Correct! Context is all the information available to the AI when it processes your prompt."
  },
  {
    question: 'How do comments affect context in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'They make the context larger', isCorrect: false },
      { id: 'b', text: 'They are hidden from the AI\'s context', isCorrect: true },
      { id: 'c', text: 'They delete the context', isCorrect: false },
      { id: 'd', text: 'They change the context color', isCorrect: false }
    ],
    successMessage: "Exactly! Comments are a way to write notes that won't be included in the AI's context."
  },
  {
    question: 'What is a best practice for managing context?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Include as much information as possible', isCorrect: false },
      { id: 'b', text: 'Keep it focused and relevant to the current task', isCorrect: true },
      { id: 'c', text: 'Always use technical terms', isCorrect: false },
      { id: 'd', text: 'Never use comments', isCorrect: false }
    ],
    successMessage: "Perfect! Keeping context focused and relevant helps the AI provide better results."
  }
]

export const lesson11Quiz: QuizQuestion[] = [
  {
    question: 'What is the primary purpose of using if/else conditions in flows?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'To make flows run faster', isCorrect: false },
      { id: 'b', text: 'To make flows adapt to different situations based on conditions', isCorrect: true },
      { id: 'c', text: 'To store data in flows', isCorrect: false },
      { id: 'd', text: 'To connect flows to databases', isCorrect: false }
    ],
    successMessage: "Correct! If/else conditions allow your flows to make decisions and handle different scenarios intelligently."
  },
  {
    question: 'Which of the following is the correct syntax for a basic if/else condition in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '/if condition\n  action\n/endif', isCorrect: true },
      { id: 'b', text: 'if(condition){action}', isCorrect: false },
      { id: 'c', text: 'IF condition THEN action END', isCorrect: false },
      { id: 'd', text: '?condition:action', isCorrect: false }
    ],
    successMessage: "Excellent! You've mastered the basic syntax for if/else conditions in Wordware."
  },
  {
    question: 'What is the main benefit of using loops in flows?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'They make flows more colorful', isCorrect: false },
      { id: 'b', text: 'They automatically fix errors', isCorrect: false },
      { id: 'c', text: 'They efficiently process multiple items or repeat tasks', isCorrect: true },
      { id: 'd', text: 'They make flows run slower', isCorrect: false }
    ],
    successMessage: "Perfect! Loops are indeed powerful for handling repetitive tasks and processing multiple items efficiently."
  }
]

export const lesson12Quiz: QuizQuestion[] = [
  {
    question: 'What characterizes advanced prompting in Wordware?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Using only basic commands', isCorrect: false },
      { id: 'b', text: 'Combining multiple techniques for complex tasks', isCorrect: true },
      { id: 'c', text: 'Writing shorter prompts', isCorrect: false },
      { id: 'd', text: 'Using random keywords', isCorrect: false }
    ],
    successMessage: "Correct! Advanced prompting involves combining multiple techniques to handle complex tasks effectively."
  },
  {
    question: 'What is a key aspect of advanced prompt patterns?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Using only simple words', isCorrect: false },
      { id: 'b', text: 'Creating reusable, modular prompt templates', isCorrect: true },
      { id: 'c', text: 'Avoiding all technical terms', isCorrect: false },
      { id: 'd', text: 'Writing everything in caps', isCorrect: false }
    ],
    successMessage: "That's right! Advanced prompting often involves creating reusable templates that can be adapted for different situations."
  },
  {
    question: 'How do you optimize advanced prompts?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'By making them as short as possible', isCorrect: false },
      { id: 'b', text: 'By iteratively testing and refining based on results', isCorrect: true },
      { id: 'c', text: 'By using random formatting', isCorrect: false },
      { id: 'd', text: 'By removing all punctuation', isCorrect: false }
    ],
    successMessage: "Perfect! Optimizing advanced prompts involves iterative testing and refinement to achieve the best results."
  }
] 