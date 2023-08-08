// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage } from "openai";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
      apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const instructionMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: "You are a code generator. You must anwer only in markdown code snippets. Use code comments for explanations."
}

export default async function POST(
      req: Request
) {
      try {

      
            // const { userId } = auth()
            const body = await req.json();
            const { messages } = body;

            // if(!userId){
            //       // return new NextResponse("Unauthorized", {status: 401})
            // }

            if (!configuration.apiKey) {
                  return new NextResponse("Api Key is requried", { status: 500 })
            }

            if (!messages) {
                  return new NextResponse("Message are requried", { status: 400 })
            }

            const response = await openai.createChatCompletion({
                  model: "gpt-3.5-turbo",
                  messages: [instructionMessage, ...messages],
            })

            return NextResponse.json(response.data.choices[0].message)

      } catch (error) {
            console.log("[CODE_ERROR]", error);
            return new NextResponse("Internal Error", { status: 500 });

      }
}


k
