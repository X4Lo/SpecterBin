import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCopy } from "lucide-react";

interface PasteCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  pasteId: string;
}

const PasteCreatedModal: React.FC<PasteCreatedModalProps> = ({ isOpen, onClose, pasteId }) => {
  const pasteUrl = `${window.location.origin}/pastes/${pasteId}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pasteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Paste Created Successfully</DialogTitle>
          <DialogDescription>Your paste is now available at the link below.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input value={pasteUrl} readOnly className="flex-1" />
          <Button onClick={handleCopy} variant="outline">
            <ClipboardCopy className="w-5 h-5" />
          </Button>
        </div>
        {copied && <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>}
        <Button onClick={onClose} className="w-full mt-4">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasteCreatedModal;
