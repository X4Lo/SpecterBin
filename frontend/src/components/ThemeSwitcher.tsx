import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="outline" onClick={toggleTheme} size="icon">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};

export default ThemeSwitcher;
