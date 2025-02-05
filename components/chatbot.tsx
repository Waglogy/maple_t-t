"use client";

import * as React from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const botpressUrl =
    "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/05/13/20250205132703-7NR3YDC3.json";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <Button
        size="icon"
        className="h-12 w-12 rounded-full gradient-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      {/* Chatbot Popup */}
      <Card
        className={cn(
          "absolute bottom-16 right-0 w-80 h-[500px] transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <CardHeader>
          <CardTitle>Chat with us</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          {/* Embed BotPress Webchat */}
          <iframe
            src={botpressUrl}
            title="BotPress Chatbot"
            className="w-full h-[420px] border-none"
            allow="microphone; autoplay"
          ></iframe>
        </CardContent>
      </Card>
    </div>
  );
}
