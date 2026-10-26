import BreadcrumbsMui from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function Breadcrumbs({ current }: { current: string }) {
  return (
    <BreadcrumbsMui aria-label="Navigare contextuală" sx={{ mb: 3, color: "#64748b" }}>
      <Link component={RouterLink} to="/" underline="hover" color="inherit">Acasă</Link>
      <Typography color="inherit">{current}</Typography>
    </BreadcrumbsMui>
  );
}
