// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
      apiKey: "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",
});

const openai = new OpenAIApi(configuration);

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
                  messages: messages,
            })

            return NextResponse.json(response.data.choices[0].message)


            // const completion = await openai.createChatCompletion({
            //       model: "gpt-3.5-turbo",
            //       messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: "Hello world" }],
            // });
            // console.log(completion.data.choices[0].message);

      } catch (error) {
            console.log("[CONVERSATION_ERROR]", error);
            return new NextResponse("Internal Error", { status: 500 });

      }
}



// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: "Hello world" }],
// });
// console.log(completion.data.choices[0].message);
