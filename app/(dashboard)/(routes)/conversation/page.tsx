
"use client"

import * as z from "zod"
import axios from 'axios';
import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { fromSchema } from "./constant";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from "react-syntax-highlighter";
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


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

const conversationPage = () => {
     

      const configuration = new Configuration({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      delete configuration.baseOptions.headers['User-Agent'];

      const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

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
                  const userMessage: ChatCompletionRequestMessage = {
                        role: "user",
                        content: values.prompt
                  };

                  const newMessages = [...messages, userMessage]



                  // const response = await openai.createChatCompletion({
                  //       model: "gpt-3.5-turbo",
                  //       messages: newMessages,
                  // });

                  const response = await openai.createChatCompletion({
                        model: 'gpt-3.5-turbo',
                        messages: [
                              {
                                    role: 'system',
                                    content:
                                          "you're an a AI assistant that replies to all my questions in markdown format.",
                              },
                              { role: 'user', content: 'hi' },
                              { role: 'assistant', content: 'Hi! How can I help you?' },
                              { role: 'user', content: `${newMessages}?` },
                        ],
                        temperature: 0.3,
                        max_tokens: 1000,
                        top_p: 0.3,
                        frequency_penalty: 0.5,
                        presence_penalty: 0.2,
                  });

                  // const response = await fetch("/api/conversation", {
                  //       method: 'POST',
                  //       body: JSON.stringify(newMessages),
                  // });

                  console.log(response);


                  setMessages((current) => [...current, userMessage, response.data.choices[0].message])

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
                        title={"Conversation"}
                        description="Our Most Advance Conversition Model."
                        icon={MessageSquare}
                        iconColor="text-violet-500"
                        bgColor="bg-violet-500/10"
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
                                                                  placeholder="How do i calculate the redius of a circle?"
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
                              <div>
                                    {isLoading && (
                                          <div className="p-8 flex justify-center items-center bg-muted w-full rounded-lg">
                                                <Loader />
                                          </div>
                                    )}

                                    {messages?.length === 0 && !isLoading && (
                                          <div>
                                                <Empty label="No start conversation" />
                                          </div>
                                    )}
                              </div>

                              <div className="flex flex-col-reverse gap-y-4">


                                    <div className="flex flex-col-reverse gap-y-4">
                                          {messages?.map((message) => (
                                                <div key={message.content}
                                                      className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                                                            message?.role === 'user' ? "bg-white border border-black/10" : "bg-muted")}
                                                >
                                                      {message?.role === 'user' ? <UserAvater /> : <BotAvater />}
                                                      {/* <p className="text-sm">
                                                            {message.content}
                                                      </p> */}

                                                      <ReactMarkdown
                                                            className={`message__markdown`}
                                                            children={message.content || ''}
                                                            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                                                            components={{
                                                                  code({ node, inline, className, style, children, ...props }) {
                                                                        const match = /language-(\w+)/.exec(className || 'language-js');
                                                                        return !inline && match ? (
                                                                              <SyntaxHighlighter
                                                                                    children={String(children).replace(/\n$/, '')}
                                                                                    style={oneDark}
                                                                                    language={match[1]}
                                                                                    PreTag='div'
                                                                                    {...props}
                                                                              />
                                                                        ) : (
                                                                              <code className={className} {...props}>
                                                                                    {children}{' '}
                                                                              </code>
                                                                        );
                                                                  },
                                                            }}
                                                      />
                                                </div>
                                          ))}

                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default conversationPage;