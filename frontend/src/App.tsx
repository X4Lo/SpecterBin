import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/routeConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeProvider } from "./providers/theme-provider";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useEffect } from "react";

function App() {


  useEffect(() => {
    document.documentElement.classList.add("dark");

  }, []);

  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <div>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isProtected ? (
                    <ProtectedRoute>
                      <route.component />
                    </ProtectedRoute>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </div>
        <ThemeSwitcher />
      </ThemeProvider>
    </div>
  );
}

export default App;
