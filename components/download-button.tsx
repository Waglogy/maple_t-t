'use client'

import { Button } from "@/components/ui/button"
import { DownloadIcon } from "@/components/icons/download-icon"

interface DownloadButtonProps {
  title: string
}

export function DownloadButton({ title }: DownloadButtonProps) {
  return (
    <Button 
      className="gradient-btn flex items-center gap-2"
      onClick={() => window.open(`/itineraries/${title}.pdf`, '_blank')}
    >
      <DownloadIcon className="w-4 h-4" /> 
      Download Itinerary
    </Button>
  )
} 