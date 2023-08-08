// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import Replicate from "replicate";

const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
});

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



            if (!prompt) {
                  return new NextResponse("Message are requried", { status: 400 })
            }

            const response = await replicate.run(
                  "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
                  {
                        input: {
                              prompt_a: prompt
                        }
                  }
            );

            return NextResponse.json(response)

      } catch (error) {
            console.log("[MUSIC_ERROR]", error);
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
