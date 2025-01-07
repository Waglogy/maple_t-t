"use client"

import * as React from "react"
import { MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="icon"
        className="h-12 w-12 rounded-full gradient-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      <Card
        className={cn(
          "absolute bottom-16 right-0 w-80 transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <CardHeader>
          <CardTitle>Chat with us</CardTitle>
        </CardHeader>
        <CardContent className="h-80 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              Hello! How can I help you today?
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <form className="flex w-full gap-2">
            <Input placeholder="Type your message..." />
            <Button type="submit" size="sm" className="gradient-button">
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

