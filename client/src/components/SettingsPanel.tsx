import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  onActivateDebug: () => void;
}

export default function SettingsPanel({ onActivateDebug }: SettingsPanelProps) {
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleSubmitCode = () => {
    if (code === "744") {
      onActivateDebug();
      toast({
        title: "Debug Mode Activated",
        description: "All interactions will now be visible",
        variant: "default",
      });
    } else if (code) {
      toast({
        title: "Invalid Code",
        description: "The entered code is not valid",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code">Debug Code</Label>
            <div className="flex space-x-2">
              <Input
                id="code"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitCode();
                  }
                }}
              />
              <Button onClick={handleSubmitCode}>Apply</Button>
            </div>
            <p className="text-xs text-slate-500">
              Enter a valid code to enable debug features
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}