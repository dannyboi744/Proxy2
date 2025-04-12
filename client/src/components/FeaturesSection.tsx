import { LockIcon, ArrowIcon, CodeIcon } from "@/components/ui/icon";

export default function FeaturesSection() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
          <LockIcon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Secure Browsing</h3>
        <p className="text-slate-600">
          Browse websites anonymously through our encrypted proxy service to protect your privacy.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
          <ArrowIcon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Bypass Restrictions</h3>
        <p className="text-slate-600">
          Access content that may be restricted in your location with our intermediary proxy service.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
          <CodeIcon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No Setup Required</h3>
        <p className="text-slate-600">
          Simply enter any URL and start browsing immediately without installing additional software.
        </p>
      </div>
    </div>
  );
}
