// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { Configuration, OpenAIApi, createImage } = require("openai");

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
            const { prompt, amount = 1, resulation = "512x512" } = body;

            // if(!userId){
            //       // return new NextResponse("Unauthorized", {status: 401})
            // }

            if (!configuration.apiKey) {
                  return new NextResponse("Api Key is requried", { status: 500 })
            }

            if (!prompt) {
                  return new NextResponse("Prompt is requried", { status: 400 })
            }

            if (!amount) {
                  return new NextResponse("Amount is requried", { status: 400 })
            }

            if (!resulation) {
                  return new NextResponse("Resulation is requried", { status: 400 })
            }

            const response = await openai.createImage({
                  prompt,
                  n: parseInt(amount, 10),
                  size: resulation,
            })

            return NextResponse.json(response.data.data)


            // const completion = await openai.createChatCompletion({
            //       model: "gpt-3.5-turbo",
            //       messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: "Hello world" }],
            // });
            // console.log(completion.data.choices[0].message);

      } catch (error) {
            console.log("[Image_ERROR]", error);
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
