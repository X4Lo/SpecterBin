import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>{title ? title : "Confirm Action"}</DialogTitle>
        </DialogHeader>
        <p className="align-center text-lg text-center">{message}</p>
        <Button onClick={onSubmit} className="w-full mt-4">
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
