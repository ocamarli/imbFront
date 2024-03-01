import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// Importa la imagen que desees mostrar

const SplashPage = () => {
  const [ setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </div>

      <img
        src={"/IMBERA_VERTICAL.png"}
        alt="Logo IMBERA"
      />
    </div>
  );
};

export default SplashPage;
