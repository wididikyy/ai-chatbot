import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json()
        const lastMessage = messages[messages.length - 1].content

        const result = await model.generateContent(lastMessage)
        const response = result.response.text()

        return NextResponse.json({ response })
    } catch (error) {
        console.error("Error in chat API:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

