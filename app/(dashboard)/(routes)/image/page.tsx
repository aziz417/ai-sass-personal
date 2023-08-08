
"use client"

import * as z from "zod"
import axios from 'axios';
import { Heading } from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { amountOptions, fromSchema, resulationOptions } from "./constant";

const { Configuration, OpenAIApi, createImage } = require("openai");

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
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import UserAvater from "@/components/UserAvater";
import BotAvater from "@/components/BotAvater";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const imagePage = () => {

      const [images, setImages] = useState<string[]>([])
      const configuration = new Configuration({
            apiKey: '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',
      });

      const openai = new OpenAIApi(configuration);

      delete configuration.baseOptions.headers['User-Agent'];

      // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

      const router = useRouter();

      const form = useForm<z.infer<typeof fromSchema>>({
            resolver: zodResolver(fromSchema),
            defaultValues: {
                  prompt: "",
                  amount: "1",
                  resulation: "512x512",
            }
      });

      const isLoading = form.formState.isSubmitting;

      const onSubmit = async (values: z.infer<typeof fromSchema>) => {
            try {

                  const { prompt, amount = "1", resulation = "512x512" } = values;
                  setImages([])
                  // const response = await fetch("/api/images", values);

                  const response = await openai.createImage({
                        prompt,
                        n: parseInt(amount, 10),
                        size: resulation,
                  })


                  const urls = response.data.data?.map((image: { url: string }) => image?.url)


                  setImages(urls)

                  // console.log(values);




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
                        title={"Image Generation"}
                        description="Turn you prompt into an image."
                        icon={ImageIcon}
                        iconColor="text-pink-700"
                        bgColor="bg-pink-700/10"
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
                                                <FormItem className="col-span-12 lg:col-span-6">
                                                      <FormControl className="m-0 p-0">
                                                            <Input className="border-0 outline-none 
                                                            focus-visible:ring-0 focus-visible:translate
                                                            "
                                                                  disabled={isLoading}
                                                                  placeholder="A picture of a horse in Swissalps"
                                                                  {...field}
                                                            />
                                                      </FormControl>
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          control={form.control}
                                          name="amount"
                                          render={({ field }) => (
                                                <FormItem className="col-span-12 lg:col-span-2">
                                                      <Select
                                                            disabled={isLoading}
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            defaultValue={field.value}
                                                      >
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue defaultValue={field.value} />
                                                                  </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                  {amountOptions?.map((option) => (
                                                                        <SelectItem
                                                                              key={option.value}
                                                                              value={option.value}
                                                                        >
                                                                              {option.label}

                                                                        </SelectItem>
                                                                  ))}
                                                            </SelectContent>
                                                      </Select>
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          control={form.control}
                                          name="resulation"
                                          render={({ field }) => (
                                                <FormItem className="col-span-12 lg:col-span-2">
                                                      <Select
                                                            disabled={isLoading}
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            defaultValue={field.value}
                                                      >
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue defaultValue={field.value} />
                                                                  </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                  {resulationOptions?.map((option) => (
                                                                        <SelectItem
                                                                              key={option.value}
                                                                              value={option.value}
                                                                        >
                                                                              {option.label}

                                                                        </SelectItem>
                                                                  ))}
                                                            </SelectContent>
                                                      </Select>
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
                                          <div className="p-20">
                                                <Loader />
                                          </div>
                                    )}

                                    {images?.length === 0 && !isLoading && (
                                          <div>
                                                <Empty label="No image generated" />
                                          </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                                          {
                                                images?.map((src) => (
                                                      <Card
                                                            key={src}
                                                            className="rounded-lg overflow-hidden"
                                                      >
                                                            <div className="relative aspect-square">
                                                                  <Image
                                                                        fill
                                                                        alt="image"
                                                                        src={src}
                                                                  />
                                                            </div>
                                                            <CardFooter className="p-2">
                                                                  <Button 
                                                                  variant="secondary"
                                                                   className="w-full"
                                                                   onClick={() => window.open(src)}
                                                                   >
                                                                        <Download className="h-4 w-4 mr-2" />
                                                                        Download
                                                                  </Button>
                                                            </CardFooter>
                                                      </Card>
                                                ))
                                          }
                                    </div>

                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default imagePage;