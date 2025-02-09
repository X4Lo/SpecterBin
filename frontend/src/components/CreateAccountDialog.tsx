import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  accountNumber: string;
}

const CreateAccountDialog: React.FC<CreateAccountDialogProps> = ({
  isOpen,
  onClose,
  accountNumber,
}) => {
  const [loginLink, setLoginLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const formatedAccountNumber = accountNumber.split(" ").join();
    setLoginLink(`${window.location.origin}/login/${formatedAccountNumber}`);
  }, [accountNumber]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Account Created Successfully</DialogTitle>
          <DialogDescription>
            Your account has been created. Use the details below to log in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Account Number
            </label>
            <div className="flex items-center gap-2">
              <Input value={accountNumber} readOnly className="flex-1" />
              <Button
                onClick={() => handleCopy(accountNumber)}
                variant="outline"
              >
                <ClipboardCopy className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Login Link</label>
            <div className="flex items-center gap-2">
              <Input value={loginLink} readOnly className="flex-1" />
              <Button onClick={() => handleCopy(loginLink)} variant="outline">
                <ClipboardCopy className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {copied && (
          <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>
        )}

        <Button onClick={onClose} className="w-full mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
