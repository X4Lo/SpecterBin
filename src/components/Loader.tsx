import { Loader2Icon } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Loader2Icon className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
};

export default Loader;
