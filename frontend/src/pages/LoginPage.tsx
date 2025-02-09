import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import CreateAccountDialog from "@/components/CreateAccountDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accountService } from "@/services/accountService";
import authService from "@/services/authService";

const LoginPage: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleLogin() {
    const formatedAccountNumber = accountNumber.trim().split(" ").join("");

    if (formatedAccountNumber.length == 36) {
      const account = await accountService.getAccountByAccountNumber(
        formatedAccountNumber
      );

      authService.login(account.accountNumber);
      navigate("/my-pastes");
      return;
    } else {
      toast({
        title: "Invalid Account Number",
        description: "Account number must be 36 digits long.",
        variant: "destructive",
      });
    }
  }

  async function handleCreateAccount() {
    try {
      const account = await accountService.createAccount();
      setAccountNumber(
        account.accountNumber.match(/\d{1,6}/g)?.join(" ") || ""
      );
      // setAccountNumber(account.accountNumber);
      setIsModalOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto z-30">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <Input
            type="text"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleLogin} className="w-full mb-4">
            Login
          </Button>
          <Button
            variant="outline"
            onClick={handleCreateAccount}
            className="w-full"
          >
            Create Account
          </Button>
        </div>
      </div>

      <CreateAccountDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accountNumber={accountNumber}
      />
    </div>
  );
};

export default LoginPage;
