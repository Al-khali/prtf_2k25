import OpenAI from 'openai'
import { getMockResponse } from '@/utils/eastereggs'

const openai = process.env.NEXT_PUBLIC_OPENAI_KEY 
  ? new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
      dangerouslyAllowBrowser: true
    })
  : null

export async function getChatResponse(message: string): Promise<string> {
  if (!openai) {
    console.log('OpenAI not configured, using mock response')
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    return getMockResponse(message)
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Khalid's AI assistant. Khalid is a Data Engineer and Creative Technologist who:
          
          - Works with Python, Scala, SQL for data engineering
          - Uses Apache Spark, Kafka, dbt, Airflow for data pipelines
          - Builds frontends with React, Next.js, TypeScript, Three.js
          - Creates games and interactive experiences
          - Loves Japanese jazz fusion, 90s hip-hop, and city pop
          - Uses Arch Linux and enjoys ricing his setup
          - Participates in CTF competitions
          - Is passionate about the intersection of data and creativity
          
          Be helpful, enthusiastic, and showcase his diverse skills. Keep responses conversational and engaging.
          If asked about technical details, be specific but accessible.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })

    return completion.choices[0]?.message?.content || getMockResponse(message)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return getMockResponse(message)
  }
}