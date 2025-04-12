import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProxyForm from "@/components/ProxyForm";
import StatusMessage from "@/components/StatusMessage";
import ProxyContent from "@/components/ProxyContent";
import FeaturesSection from "@/components/FeaturesSection";
import { useState, useRef } from "react";
import { StatusMessage as StatusMessageType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [url, setUrl] = useState("");
  const [proxyUrl, setProxyUrl] = useState("");
  const [status, setStatus] = useState<StatusMessageType>({
    type: "none", 
    message: ""
  });
  const [showProxyContent, setShowProxyContent] = useState(false);
  const [iframeContent, setIframeContent] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const proxyMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/proxy", { url });
      return res.json();
    },
    onMutate: () => {
      setStatus({
        type: "loading",
        message: "Loading website through proxy..."
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        setStatus({
          type: "success",
          message: "Website loaded successfully through the proxy."
        });
        setProxyUrl(url);
        setShowProxyContent(true);
        setIframeContent(data.content);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to load the website. Please check the URL and try again."
        });
      }
    },
    onError: (error: any) => {
      setStatus({
        type: "error",
        message: error.message || "An unexpected error occurred. Please try again."
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to connect to the proxy server."
      });
    }
  });

  const handleSubmit = (submittedUrl: string) => {
    setUrl(submittedUrl);
    proxyMutation.mutate(submittedUrl);
  };

  const handleReload = () => {
    if (url) {
      proxyMutation.mutate(url);
    }
  };

  const handleClose = () => {
    setShowProxyContent(false);
    setStatus({ type: "none", message: "" });
  };

  const openInNewTab = () => {
    if (url) {
      window.open(`/api/proxy-redirect?url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Access websites through our secure proxy
          </h2>
          <p className="text-slate-600 mb-6">
            Enter any URL below to browse the web privately and bypass restrictions
          </p>
          
          <ProxyForm onSubmit={handleSubmit} />
          <StatusMessage status={status} />
          {showProxyContent && (
            <ProxyContent 
              url={proxyUrl}
              iframeContent={iframeContent} 
              iframeRef={iframeRef}
              onReload={handleReload}
              onClose={handleClose}
              onOpenNewTab={openInNewTab}
            />
          )}
        </div>
        
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
}
