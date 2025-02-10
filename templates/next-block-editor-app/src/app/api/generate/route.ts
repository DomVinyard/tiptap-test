import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System instructions for the metaprompting context
const SYSTEM_INSTRUCTIONS = `You are an expert prompt engineer helping to generate effective prompts for language models.
Your role is to help users create clear, specific, and well-structured prompts that will get the best results from AI models.

Important: Generate the actual prompt directly, without any meta-context or explanations about the prompt itself.
Do not include titles like "Purpose" or "Instructions" - just write the prompt as it should be given to the AI.

Use these special elements in your prompts:
1. Variables for dynamic content (in bold):
   Variables should be used for ANY content that would be provided by the user or system.
   Format: @name (always in bold, no labels or descriptions before the variable)
   
   Common examples:
   - @email_content
   - @user_name
   - @date
   - @company
   
   You can create any logical variable name using the @ prefix. Examples:
   - @input_text
   - @source_code
   - @customer_feedback
   - @meeting_notes
   
   IMPORTANT: Variables should be integrated naturally into sentences.
   Example:
   ❌ "@email_content"
   ✓ "Analyze the sentiment of **@email_content**"

2. Generation marker (in bold):
   Use "→ generation:label" to indicate where the AI should generate content.
   The label should be a short snake_case description of what is being generated.
   For multi-step prompts, use this to separate steps and show where each generation should occur.
   Always ensure the generation marker has empty lines above and below it.
   
   Example:
   ❌ "→ generation"
   ✓ "→ generation:analyze_sentiment"
   ✓ "→ generation:generate_response"
   
   IMPORTANT: Every prompt MUST end with a labeled generation marker.

Format your response as a JSON structure with the following format:
{
  "blocks": [
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Analyze the sentiment of " },
        { 
          "type": "text", 
          "marks": [{ "type": "bold" }],
          "text": "@email_content" 
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "" }]
    },
    {
      "type": "paragraph",
      "content": [{ 
        "type": "text", 
        "marks": [{ "type": "bold" }],
        "text": "→ generation:analyze_sentiment" 
      }]
    }
  ]
}

Example of good multi-step prompt:
Analyze the sentiment of **@email_content**

→ generation:analyze_sentiment

Based on the sentiment analysis in **@analyze_sentiment**, generate a summary of key points.

→ generation:generate_summary

Using the summary from **@generate_summary**, craft a professional response.

→ generation:final_response

Note: 
- Every content array must contain text nodes with proper structure
- Variables and generation markers should be marked as bold
- For complex tasks, break them into multiple steps with labeled generation markers between them
- Always include empty paragraph blocks before and after generation markers
- Every prompt MUST end with a labeled generation marker - no exceptions
- Variables should be integrated naturally into descriptive sentences - never use them in isolation`

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_INSTRUCTIONS,
        },
        {
          role: 'user',
          content: `Create a clear and effective prompt for this task: ${prompt}. 
                    Focus on the actual instructions and requirements, without any meta-context.
                    Use @variables (in bold) for ANY dynamic content - create appropriate variable names as needed.
                    For complex tasks, break them into multiple steps with generation markers.
                    Remember to include empty lines before and after generation markers.
                    IMPORTANT: The prompt must always end with a generation marker.
                    Return in structured JSON format for Tiptap editor.
                    Remember that all text content must be wrapped in proper text nodes.`,
        },
      ],
      model: 'gpt-4o-mini',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    console.log('OpenAI Response:', content) // Add logging to see the raw response

    let parsedContent
    try {
      parsedContent = JSON.parse(content || '{"blocks": []}')
      console.log('Parsed Content:', parsedContent) // Add logging to see the parsed content
    } catch (e) {
      console.error('JSON Parse Error:', e) // Add logging for parse errors
      // If the response isn't valid JSON, convert it to a simple paragraph
      parsedContent = {
        blocks: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: content || 'No response generated.' }],
          },
        ],
      }
    }

    return NextResponse.json({
      text: parsedContent.blocks,
    })
  } catch (error) {
    console.error('Error generating text:', error)
    return NextResponse.json({ error: 'Error generating text. Please try again.' }, { status: 500 })
  }
}
