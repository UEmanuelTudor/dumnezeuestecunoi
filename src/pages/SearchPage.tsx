import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import SiteMeta from "../components/SiteMeta";
import { slugify } from "../utils/slugify";

type Post = {
  id: string;
  category?: string;
  title?: string;
  excerpt?: string;
  content?: string;
};

const categoryLabels: Record<string, string> = {
  invatare: "Învățare",
  rugaciune: "Rugăciune",
  cantare: "Cântare",
  predicare: "Predicare",
  marturie: "Mărturie",
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Post, "id">) })).filter((post) => (post as Post & { status?: string }).status !== "draft"));
      },
      (snapshotError) => {
        console.error("Eroare la căutarea postărilor:", snapshotError);
        setError("Postările nu au putut fi încărcate. Încearcă din nou.");
      }
    );
    return unsubscribe;
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ro");
    if (!normalizedQuery) return [];
    return posts.filter((post) =>
      [post.title, post.excerpt, post.content, post.category]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase("ro").includes(normalizedQuery))
    );
  }, [posts, query]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
    setPage(1);
  };
  const visibleResults = results.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <SiteMeta title="Căutare" description="Caută articole, predici, cântări și mărturii pe Dumnezeu este cu noi." />
        <Typography variant="h3" sx={{ color: "#0f2e60", fontWeight: 800, mb: 1 }}>
          Căutare
        </Typography>
        <Typography sx={{ color: "#526274", mb: 3 }}>
          Caută în articole, predici, cântări și mărturii.
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 1.5, mb: 4 }}>
          <TextField
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex: credință, familie, rugăciune..."
            inputProps={{ "aria-label": "Termen de căutare" }}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: "#0f2e60", px: 3 }}>
            Caută
          </Button>
        </Box>
        {error && <Typography role="alert" sx={{ color: "#b91c1c", mb: 2 }}>{error}</Typography>}
        {query.trim() && !error && (
          <Typography sx={{ color: "#475569", mb: 2 }}>
            {results.length} {results.length === 1 ? "rezultat" : "rezultate"} pentru „{query}”
          </Typography>
        )}
        <Stack spacing={2}>
          {visibleResults.map((post) => (
            <Card key={post.id} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="overline" sx={{ color: "#64748b", fontWeight: 700 }}>
                  {categoryLabels[post.category || ""] || post.category || "Postare"}
                </Typography>
                <Typography variant="h5" sx={{ color: "#0f2e60", fontWeight: 800 }}>
                  {post.title || "Fără titlu"}
                </Typography>
                <Typography sx={{ color: "#475569", mt: 1 }}>
                  {post.excerpt || post.content?.slice(0, 180)}
                </Typography>
                <Button component={RouterLink} to={`/post/${post.id}/${slugify(post.title || "postare")}`} sx={{ mt: 1, textTransform: "none" }}>
                  Deschide articolul
                </Button>
                {post.category && categoryLabels[post.category] && (
                  <Button component={RouterLink} to={`/c/${post.category}`} sx={{ mt: 1, textTransform: "none" }}>
                    Vezi secțiunea {categoryLabels[post.category]}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          {query.trim() && !results.length && !error && (
            <Typography sx={{ color: "#64748b", py: 4, textAlign: "center" }}>
              Nu am găsit rezultate pentru acest termen.
            </Typography>
          )}
        </Stack>
        {results.length > pageSize && (
          <Pagination count={Math.ceil(results.length / pageSize)} page={page} onChange={(_, value) => setPage(value)} sx={{ mt: 3, display: "flex", justifyContent: "center" }} />
        )}
      </Container>
    </Box>
  );
}
