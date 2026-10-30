import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "../components/Breadcrumbs";
import SiteMeta from "../components/SiteMeta";
import ShareButtons from "../components/ShareButtons";
import { db } from "../firebase";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<{ title?: string; content?: string; excerpt?: string; category?: string; imageUrl?: string } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, "posts", id)).then((snapshot) => {
      if (snapshot.exists()) setPost(snapshot.data());
      else setError("Postarea nu a fost găsită.");
    }).catch((reason) => {
      console.error("Eroare la încărcarea postării:", reason);
      setError("Postarea nu a putut fi încărcată.");
    });
  }, [id]);
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      {post && <SiteMeta title={post.title || "Postare"} description={post.excerpt || post.content?.slice(0, 155) || ""} />}
      <Container maxWidth="md">
        <Breadcrumbs current={post?.title || "Postare"} />
        {error ? <Typography role="alert" sx={{ color: "#b91c1c" }}>{error}</Typography> : post ? (
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
            {post.imageUrl && <Box component="img" src={post.imageUrl} alt={post.title || ""} sx={{ width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 2, mb: 3 }} />}
            <Typography variant="h3" sx={{ color: "#0f2e60", fontWeight: 800, mb: 2 }}>{post.title}</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: "#334155", mb: 3 }}>{post.content || post.excerpt}</Typography>
            <ShareButtons title={post.title || "Dumnezeu este cu noi"} />
            <Button component={RouterLink} to={`/c/${post.category || "invatare"}`} sx={{ mt: 2, textTransform: "none" }}>Înapoi la secțiune</Button>
          </Paper>
        ) : <Typography>Se încarcă postarea...</Typography>}
      </Container>
    </Box>
  );
}
