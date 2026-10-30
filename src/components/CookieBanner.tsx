import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => localStorage.getItem("cookie-consent") !== "accepted");
  if (!visible) return null;
  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1400, p: 2, bgcolor: "#0f2e60", color: "white", boxShadow: "0 -6px 24px rgba(0,0,0,.18)" }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="body2" sx={{ flex: 1, minWidth: 240 }}>
          Folosim doar cookie-uri tehnice și stocare locală pentru preferințe. Citește <RouterLink to="/politica-de-confidentialitate" style={{ color: "white" }}>politica de confidențialitate</RouterLink>.
        </Typography>
        <Button onClick={accept} variant="contained" sx={{ bgcolor: "white", color: "#0f2e60", fontWeight: 700, "&:hover": { bgcolor: "#e2e8f0" } }}>Am înțeles</Button>
      </Box>
    </Box>
  );
}
