import { Link } from "wouter";
import Footer from "@/components/Footer";
import ProxyForm from "@/components/ProxyForm";
import StatusMessage from "@/components/StatusMessage";
import ProxyContent from "@/components/ProxyContent";
import FeaturesSection from "@/components/FeaturesSection";
import SettingsPanel from "@/components/SettingsPanel";
import InteractionLogs, { LogEntry } from "@/components/InteractionLogs";
import { GlobeIcon } from "@/components/ui/icon";
import { useState, useRef, useEffect } from "react";
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
  const [debugMode, setDebugMode] = useState(false);
  const [interactionLogs, setInteractionLogs] = useState<LogEntry[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();
  
  // Function to add a new log entry
  const addLogEntry = (type: "request" | "response" | "info", message: string, details?: Record<string, any>) => {
    if (!debugMode) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const newLog: LogEntry = {
      id: Date.now(),
      timestamp,
      type,
      message,
      details
    };
    
    setInteractionLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const proxyMutation = useMutation({
    mutationFn: async (url: string) => {
      addLogEntry("request", `Fetching proxy content for: ${url}`, { url });
      const res = await apiRequest("POST", "/api/proxy", { url });
      const data = await res.json();
      addLogEntry("response", `Received proxy response`, { 
        status: res.status, 
        success: data.success, 
        url,
        contentLength: data.content ? data.content.length : 0
      });
      return data;
    },
    onMutate: () => {
      setStatus({
        type: "loading",
        message: "Loading website through proxy..."
      });
      addLogEntry("info", "Started loading website through proxy");
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
        addLogEntry("info", "Website loaded successfully", { url });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to load the website. Please check the URL and try again."
        });
        addLogEntry("info", "Failed to load website", { 
          url, 
          error: data.message
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
      addLogEntry("info", "Error occurred while loading website", { 
        url, 
        error: error.message || "Unknown error"
      });
    }
  });

  const handleSubmit = (submittedUrl: string) => {
    setUrl(submittedUrl);
    addLogEntry("info", "User submitted URL", { url: submittedUrl });
    proxyMutation.mutate(submittedUrl);
  };

  const handleReload = () => {
    if (url) {
      addLogEntry("info", "User requested content reload", { url });
      proxyMutation.mutate(url);
    }
  };

  const handleClose = () => {
    addLogEntry("info", "User closed proxy content", { url });
    setShowProxyContent(false);
    setStatus({ type: "none", message: "" });
  };

  const openInNewTab = () => {
    if (url) {
      addLogEntry("info", "User opened content in new tab", { url });
      window.open(`/api/proxy-redirect?url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  const handleActivateDebug = () => {
    setDebugMode(true);
    addLogEntry("info", "Debug mode activated", { timestamp: new Date().toISOString() });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <GlobeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Ultraviolet Node</h1>
                <p className="text-xs text-slate-500">Web Proxy Service</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <Link href="/" className="text-primary font-medium hover:text-primary-700 transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-slate-600 font-medium hover:text-slate-900 transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-slate-600 font-medium hover:text-slate-900 transition">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center">
                <div className="mr-4">
                  <SettingsPanel onActivateDebug={handleActivateDebug} />
                </div>
                {debugMode && (
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Debug Mode Active
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
          
          <InteractionLogs logs={interactionLogs} isVisible={debugMode} />
        </div>
        
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
}
