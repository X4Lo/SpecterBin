import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/routeConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeProvider } from "./providers/theme-provider";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
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
        <ThemeSwitcher className="mt-4 ml-auto mr-4" />
      </div>
    </ThemeProvider>
  );
}

export default App;
