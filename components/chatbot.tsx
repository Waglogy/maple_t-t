"use client";

import * as React from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
        className="h-14 w-14 rounded-full bg-[#f45201] hover:from-[#f45201] hover:to-[#010001] transition-all duration-300 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chatbot Popup */}
      <Card
        className={cn(
          "absolute bottom-20 right-0 w-96 h-[550px] transition-all duration-300 border border-[#f45201]/20 shadow-xl",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <CardHeader className="flex justify-between items-center bg-[#f45201] p-4">
          <CardTitle className="text-white text-lg">Chat with us</CardTitle>
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </CardHeader>
        <CardContent className="h-full p-0">
          {/* Embed BotPress Webchat */}
          <iframe
            src={botpressUrl}
            title="BotPress Chatbot"
            className="w-full h-[500px] border-none"
            allow="microphone; autoplay"
          ></iframe>
        </CardContent>
      </Card>
    </div>
  );
}
