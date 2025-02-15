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

interface PasteCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  pasteId: string;
  pastePassword: string;
}

const PasteCreatedModal: React.FC<PasteCreatedModalProps> = ({
  isOpen,
  onClose,
  pasteId,
  pastePassword,
}) => {
  const pasteUrl = `${window.location.origin}/${pasteId}`;
  const pasteUrlWithPassword = `${window.location.origin}/${pasteId}#${pastePassword}`;
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(pasteUrl);
    toast({
      title: "Copied",
      description: "Link copied to clipboard.",
    });
  };

  const handleCopyWithPassword = () => {
    navigator.clipboard.writeText(pasteUrlWithPassword);
    toast({
      title: "Copied",
      description: "Link copied to clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Paste Created Successfully</DialogTitle>
          <DialogDescription>
            Your paste is now available at the links below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input value={pasteUrl} readOnly className="flex-1" />
          <Button onClick={handleCopy} variant="outline">
            <ClipboardCopy className="w-5 h-5" />
          </Button>
        </div>
        <DialogDescription>With password</DialogDescription>
        <div className="flex items-center gap-2">
          <Input value={pasteUrlWithPassword} readOnly className="flex-1" />
          <Button onClick={handleCopyWithPassword} variant="outline">
            <ClipboardCopy className="w-5 h-5" />
          </Button>
        </div>
        <Button onClick={onClose} className="w-full mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasteCreatedModal;
