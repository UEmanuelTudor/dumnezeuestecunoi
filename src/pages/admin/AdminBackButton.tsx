import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function AdminBackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/admin/administrare")}
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      sx={{ color: "white", borderColor: "rgba(255,255,255,0.55)", mb: 2, "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.08)" } }}
    >
      Înapoi la administrare
    </Button>
  );
}
