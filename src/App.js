import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import MDrawer from "./pages/MDrawer.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { isExpired, decodeToken } from "react-jwt";
import SplashPage from "./pages/Splash/SplashPage.jsx";
import Test from "./Test";
import { Box } from "@mui/material";
import AgregarUsuario from "./pages/Register/AgregarUsuario.jsx";
import AgregarPlantilla from "./pages/Recipes/AgregarPlantilla.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#143C64",
        light: "#fafafa",
      },
      secondary: {
        main: "#28a745",
      },
    },
  });

  const AuthRoute = () => {
    const token = sessionStorage.getItem("ACCSSTKN");

    if (token && !isTokenExpired(token)) {
      return <Navigate to="/Menu" replace />;
    } else {
      return <Login onDarkModeChange={handleDarkModeChange} />;
    }
  };

  const ProtectedRoute = ({ type }) => {
    const token = sessionStorage.getItem("ACCSSTKN");

    if (token && !isTokenExpired(token)) {
      const decodedToken = decodeToken(token);
      return <FilterRoutes type={type} auth={JSON.parse(decodedToken.sub)} />;
    } else {
      return <Navigate to="/" replace />;
    }
  };

  const FilterRoutes = ({ type, auth }) => {
    switch (type) {
      case 0:
        return <MDrawer onDarkModeChange={handleDarkModeChange} auth={auth} />;
      case 1:
        return <Test onDarkModeChange={handleDarkModeChange} auth={auth} />;
      case 2:
        return <AgregarPlantilla onDarkModeChange={handleDarkModeChange} auth={auth} />;
      case 3:
        return <AgregarUsuario onDarkModeChange={handleDarkModeChange} auth={auth} />;
      default:
        return null;
    }
  };

  const isTokenExpired = (token) => {
    return isExpired(token);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SplashPage />
        </Box>
      ) : (
        <BrowserRouter>
          <div className="App">
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/" element={<AuthRoute />} />
                <Route path="/Menu" element={<ProtectedRoute type={0} />} />
                <Route path="/Test" element={<ProtectedRoute type={1} />} />
                <Route path="/AgregarPlantilla" element={<ProtectedRoute type={2} />} />
                <Route path="/AgregarUsuario" element={<ProtectedRoute type={3} />} />
              </Routes>
            </ThemeProvider>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;