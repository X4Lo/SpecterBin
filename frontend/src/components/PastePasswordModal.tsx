import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PastePasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
        </DialogHeader>
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-full mt-4">
          Unlock
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PastePasswordModal;
