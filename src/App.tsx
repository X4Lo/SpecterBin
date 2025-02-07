import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/routeConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";
import authService from "./services/authService";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, [authService.isAuthenticated()]);

  return (
    <div>
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
    </div>
  );
}

export default App;
