import { Button } from "@/components/ui/button"

export const DownloadButton = ({ title }: { title: string }) => {
  return (
    <Button variant="secondary" className="flex items-center gap-2">
      Download {title}
    </Button>
  )
}

