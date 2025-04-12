import { StatusMessage as StatusMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusMessageProps {
  status: StatusMessageType;
}

export default function StatusMessage({ status }: StatusMessageProps) {
  if (status.type === "none") {
    return null;
  }

  return (
    <div className="mb-4">
      {status.type === "success" && (
        <div className="rounded-md bg-green-50 p-4 animate-in slide-in-from-top-5 duration-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg 
                className="h-5 w-5 text-green-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {status.type === "error" && (
        <div className="rounded-md bg-red-50 p-4 animate-in slide-in-from-top-5 duration-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg 
                className="h-5 w-5 text-red-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {status.type === "loading" && (
        <div className="rounded-md bg-blue-50 p-4 animate-in slide-in-from-top-5 duration-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-5 w-5 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
