import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

type InfoType = "about" | "contact" | "privacy";

const content: Record<InfoType, { title: string; paragraphs: string[] }> = {
  about: {
    title: "Despre noi",
    paragraphs: [
      "Dumnezeu este cu noi este un spațiu online pentru încurajare, rugăciune, învățare și mărturisirea lucrării lui Dumnezeu.",
      "Ne dorim să oferim resurse care îi ajută pe oameni să se apropie de Dumnezeu și să găsească speranță în fiecare zi.",
    ],
  },
  contact: {
    title: "Contact",
    paragraphs: [
      "Ne bucurăm să auzim de la tine. Pentru întrebări, sugestii sau colaborări, ne poți scrie la:",
      "dumnezeuestecunoi@uetcompany.ro",
    ],
  },
  privacy: {
    title: "Politica de confidențialitate",
    paragraphs: [
      "Respectăm datele pe care ni le trimiți. Cererile de rugăciune sunt moderate înainte de publicare, iar informațiile personale nu trebuie incluse în descriere.",
      "Jurnalul și lista personală de nevoi care au existat în trecut au fost eliminate. Funcțiile locale rămase, precum preferința pentru notificări, sunt păstrate doar în browserul tău.",
      "Pentru întrebări despre datele tale, ne poți contacta la dumnezeuestecunoi@uetcompany.ro.",
    ],
  },
};

export default function InfoPage({ type }: { type: InfoType }) {
  const page = content[type];
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 7 } }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Typography variant="h3" sx={{ color: "#0f2e60", fontWeight: 800, mb: 3 }}>
            {page.title}
          </Typography>
          {page.paragraphs.map((paragraph) => (
            <Typography key={paragraph} sx={{ color: "#334155", lineHeight: 1.8, mb: 2 }}>
              {paragraph}
            </Typography>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}
