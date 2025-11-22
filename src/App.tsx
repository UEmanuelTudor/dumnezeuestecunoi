import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// paginile tale
import Home from "./pages/Home";
import Category from "./pages/Category";
import Needs from "./pages/Needs";

import Invatare from "./pages/Invatare";
import Rugaciune from "./pages/Rugaciune";
import Cantare from "./pages/Cantare";
import Predicare from "./pages/Predicare";
import Marturie from "./pages/Marturie";
// etc.

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fafafa", // opțional
        }}
      >
        <NavBar />

        {/* Main împinge footer-ul jos */}
        <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/c/invatare" element={<Invatare />} />
            <Route path="/c/rugaciune" element={<Rugaciune />} />
            <Route path="/c/cantare" element={<Cantare />} />
            <Route path="/c/predicare" element={<Predicare />} />
            <Route path="/c/marturie" element={<Marturie />} />

            <Route path="/nevoi" element={<Needs />} />
            {/* restul rutelor */}
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}
