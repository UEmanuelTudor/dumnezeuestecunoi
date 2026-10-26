import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Category() {
  const { category } = useParams();

  return (
    <Box 
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #dbeafe 0%, #ffffff 50%)", 
        m: 0,
        p: 0,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <h1 className="text-2xl font-bold">Categoria: {category}</h1>
        {/* Aici vine restul conținutului paginii tale de categorie */}
      </Container>
    </Box>
  );
}