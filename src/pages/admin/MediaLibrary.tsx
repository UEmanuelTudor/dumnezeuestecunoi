import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AdminBackButton from "./AdminBackButton";

type Media = { id: string; title?: string; imageUrl?: string; youtubeUrl?: string; category?: string };

export default function MediaLibrary() {
  const [media, setMedia] = useState<Media[]>([]);
  useEffect(() => onSnapshot(collection(db, "posts"), (snapshot) => setMedia(snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Media, "id">) })))), []);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminBackButton />
      <Typography variant="h5" sx={{ color: "white", fontWeight: 800, mb: 1 }}>Bibliotecă media</Typography>
      <Typography sx={{ color: "rgba(255,255,255,.75)", mb: 3 }}>Imaginile și linkurile media folosite în postări, reutilizabile în editor.</Typography>
      <Grid container spacing={2}>
        {media.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card sx={{ height: "100%" }}>
              {item.imageUrl && <Box component="img" src={item.imageUrl} alt={item.title || ""} sx={{ width: "100%", height: 150, objectFit: "cover" }} />}
              <CardContent>
                <Typography sx={{ fontWeight: 800 }}>{item.title || "Fără titlu"}</Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>{item.category || "Fără categorie"}</Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 1, wordBreak: "break-all" }}>{item.imageUrl || "Fără imagine"}</Typography>
                {item.youtubeUrl && <Typography variant="caption" sx={{ display: "block", wordBreak: "break-all" }}>{item.youtubeUrl}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
