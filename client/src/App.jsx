import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import { NeatGradient } from "@firecms/neat";
import { useContext, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";


const App = () => {
  const canvasRef = useRef(null);
  let gradient = useRef(null);

  const {authUser} = useContext(AuthContext)

  const config = {
    colors: [
      { color: "#2C2354", enabled: true },
      { color: "#001129", enabled: true },
      { color: "#14062b", enabled: true },
      { color: "#110614", enabled: true },
      { color: "#432877", enabled: true },
    ],
    speed: 1.5,
    horizontalPressure: 4,
    verticalPressure: 4,
    waveFrequencyX: 3,
    waveFrequencyY: 2,
    backgroundColor: "#010101",
    grainScale: 1,
    grainSparsity: 0,
    grainIntensity: 0,
    grainSpeed: 0,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    gradient.current = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    const handleScroll = () => {
      if (gradient.current) {
        gradient.current.yOffset = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Toaster />
        <Routes>
          <Route path="/" element={ authUser ? <Homepage />: <Navigate to="/login" /> } />
          <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" /> } />
          <Route path="/profile" element={ authUser ? <Profilepage />: <Navigate to="/login" /> } />
        </Routes>
    </div>
  );
};

export default App;
