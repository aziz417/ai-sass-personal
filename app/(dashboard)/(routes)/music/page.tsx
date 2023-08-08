
"use client"

import * as z from "zod"
import axios from 'axios';
import { Heading } from "@/components/Heading";
import { MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { fromSchema } from "./constant";

const { Configuration, OpenAIApi } = require("openai");

import {
      Form,
      FormControl,
      FormField,
      FormItem
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import UserAvater from "@/components/UserAvater";
import BotAvater from "@/components/BotAvater";
import { cn } from "@/lib/utils";

import Replicate from "replicate";



const musicPage = () => {


      const replicate = new Replicate({
            auth: "r8_LAuvQ04RxpKHF0qSsfQeRXyRJ9vPWHz0Wvwei",
      });

      const [music, setMusic] = useState<string>()

      const router = useRouter();

      const form = useForm<z.infer<typeof fromSchema>>({
            resolver: zodResolver(fromSchema),
            defaultValues: {
                  prompt: ""
            }
      });

      const isLoading = form.formState.isSubmitting;

      const onSubmit = async (values: z.infer<typeof fromSchema>) => {
            try {
                  setMusic(undefined)


                  // const response = await openai.createChatCompletion({
                  //       model: "gpt-3.5-turbo",
                  //       messages: newMessages,
                  // });

                  // const response = await fetch("/api/music", values);

                  console.log(values);

                  const response = await replicate.run(
                        "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
                        {
                              input: {
                                    prompt_a: values
                              }
                        }
                  );

                  console.log(response);
                  

                  // setMusic(response)

                  form.reset()

            } catch (error: any) {
                  console.log(error);
            } finally {
                  router.refresh()
            }
      }

      return (
            <div>
                  <Heading
                        title={"Music Generation"}
                        description="Turn you prompt into an music."
                        icon={Music}
                        iconColor="text-emerald-500"
                        bgColor="bg-emerald-500/10"
                  />

                  <div className="px-4 lg:px-8">
                        <Form {...form}>
                              <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="
                                    rounded-lg
                                    border
                                    w-full
                                    p-4
                                    px-3
                                    md:px-6
                                    focus-within:shadow-sm
                                    grid
                                    grid-cols-12
                                    gap-2
                                    "
                              >
                                    <FormField
                                          name="prompt"
                                          render={({ field }) => (
                                                <FormItem className="col-span-12 lg:col-span-10">
                                                      <FormControl className="m-0 p-0">
                                                            <Input className="border-0 outline-none 
                                                            focus-visible:ring-0 focus-visible:translate
                                                            "
                                                                  disabled={isLoading}
                                                                  placeholder="Piano Slow"
                                                                  {...field}
                                                            />
                                                      </FormControl>
                                                </FormItem>
                                          )}
                                    />

                                    <Button className="col-span-12 lg:col-span-2"
                                          disabled={isLoading}>
                                          Generate
                                    </Button>
                              </form>

                        </Form>

                        <div className="space-y-4 mt-4">

                              <div className="flex flex-col-reverse gap-y-4">
                                    {isLoading && (
                                          <div className="p-8 flex justify-center items-center bg-muted w-full rounded-lg">
                                                <Loader />
                                          </div>
                                    )}

                                    {music?.length === 0 && !isLoading && (
                                          <div>
                                                <Empty label="No music conversation" />
                                          </div>
                                    )}

                                    <div className="flex flex-col-reverse gap-y-4">
                                          Music Generated here

                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default musicPage;