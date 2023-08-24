"use client"

import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  ArrowRight

} from "lucide-react"

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const tools = [
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },

]

export default function Dashboard() {
  const router = useRouter();
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='md:text-4xl text-2xl font-bold text-center'>Explore the power of AI</h2>
        <p className='text-muted-foreground font-light text-xl md-text-lg text-center'>Chat with the smartest AI-Experiance the power of AI.</p>
      </div>

      <div className='px md:px-20 lg:px-32 space-y-4'>
        {
          tools?.map((tool) => (
            <Card key={tool?.href}
              onClick={() => router.push(tool.href)}
              className='p-4 border-black/5 flex items-center justify-between
                        hover:shadow-md transition cursor-pointer'>

              <div className='flex items-center gap-x-4'>
                <div className={cn('p-2 w-fit rounded-md', tool?.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />

                </div>
                <div className='font-semibold'>
                  {tool.label}
                </div>
              </div>
              <ArrowRight className='w-5 h-5' />
            </Card>

          ))
        }

      </div>
    </div>
  )
}
