import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotAvailablePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background p-6 overflow-auto flex flex-1 flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Not Just Yet</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The paste you're looking for is not available yet.
        </p>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    </div>
  );
};

export default NotAvailablePage;
