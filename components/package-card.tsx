import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileDown, Check, Star } from "lucide-react";
import { toast } from 'react-toastify';

interface PackageCardProps {
  title: string;
  image: string;
  price: number;
  duration: string;
  features: string[];
  rating: number;
  pdfBrochure?: {
    url: string;
    filename: string;
  };
}

export function PackageCard({
  title,
  image,
  price,
  duration,
  features,
  rating,
  pdfBrochure
}: PackageCardProps) {
  const handleDownloadPDF = async () => {
    if (!pdfBrochure?.url) {
      toast.error('Brochure not available');
      return;
    }

    try {
      const fullUrl = pdfBrochure.url.startsWith('http') 
        ? pdfBrochure.url 
        : `https://maple-server-e7ye.onrender.com${pdfBrochure.url}`;
      
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error('Failed to download brochure');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = pdfBrochure.filename || `${title}-brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success('Brochure downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download brochure. Please try again.');
    }
  };

  return (
    <div className="  bg-white backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-[200px] md:h-[250px]">
        <Image
          src={image.startsWith('http') ? image : `https://maple-server-e7ye.onrender.com${image}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover w-full h-full rounded-t-lg"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.jpg';
          }}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl text-black font-bold mb-2">{title}</h3>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'stroke-current'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-black">{rating}</span>
        </div>

        <p className="text-black mb-4">{duration}</p>
        
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-black">
              <Check className="w-4 h-4 text-[#f45201] mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Contact For Pricing</p>
            <p className="text-2xl font-bold text-white">
              ₹{price.toLocaleString()}
            </p>
          </div>
          
          <Button
            onClick={handleDownloadPDF}
            className="gradient-btn flex items-center gap-2"
            disabled={!pdfBrochure}
          >
            <FileDown className="h-4 w-4" />
            Download Brochure
          </Button>
        </div>
      </div>
    </div>
  );
}