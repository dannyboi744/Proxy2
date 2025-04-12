import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon, ExternalLinkIcon, CloseIcon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

interface ProxyContentProps {
  url: string;
  iframeContent: string;
  iframeRef: RefObject<HTMLIFrameElement>;
  onReload: () => void;
  onClose: () => void;
  onOpenNewTab: () => void;
}

export default function ProxyContent({
  url,
  iframeContent,
  iframeRef,
  onReload,
  onClose,
  onOpenNewTab
}: ProxyContentProps) {
  return (
    <div className="mt-6">
      <Card className="overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Proxied Content
            </span>
            <span className="text-sm font-medium text-slate-700 truncate max-w-xs">
              {url}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onReload} 
              className="text-slate-500 hover:text-slate-700 p-1 rounded transition"
              title="Reload content"
            >
              <ReloadIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onOpenNewTab} 
              className="text-slate-500 hover:text-slate-700 p-1 rounded transition"
              title="Open in new tab"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-slate-500 hover:text-slate-700 p-1 rounded transition"
              title="Close content"
            >
              <CloseIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="content-frame w-full bg-white border-0 min-h-[500px]">
          {iframeContent ? (
            <iframe 
              ref={iframeRef}
              className="w-full h-full min-h-[500px]" 
              sandbox="allow-forms allow-scripts allow-same-origin" 
              title="Proxied Content"
              srcDoc={iframeContent}
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-10 text-center min-h-[500px]">
              <div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="mx-auto h-12 w-12 text-slate-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" 
                  />
                </svg>
                <p className="mt-4 text-slate-500">Enter a URL above to view content via the proxy</p>
                <p className="mt-2 text-xs text-slate-400">The content will be displayed here securely</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
