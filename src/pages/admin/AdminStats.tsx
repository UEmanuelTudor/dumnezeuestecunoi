import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

type Row = { id: string; [key: string]: any };

export default function AdminStats() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Row[]>([]);
  const [needs, setNeeds] = useState<Row[]>([]);
  const [subscribers, setSubscribers] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ready = 0;
    const markReady = () => {
      ready += 1;
      if (ready === 3) setLoading(false);
    };
    const fail = (err: Error) => {
      console.error("Eroare la încărcarea statisticilor:", err);
      setError("Statisticile nu au putut fi încărcate. Verifică permisiunile Firestore.");
      setLoading(false);
    };
    const unsubscribers = [
      onSnapshot(collection(db, "posts"), (snap) => { setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); markReady(); }, fail),
      onSnapshot(collection(db, "needs"), (snap) => { setNeeds(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); markReady(); }, fail),
      onSnapshot(collection(db, "newsletter"), (snap) => { setSubscribers(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); markReady(); }, fail),
    ];
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, []);

  const categoryCounts = useMemo(() => posts.reduce<Record<string, number>>((counts, post) => {
    if (post.status !== "draft") counts[post.category || "necategorizate"] = (counts[post.category || "necategorizate"] || 0) + 1;
    return counts;
  }, {}), [posts]);
  const publishedPosts = posts.filter((post) => post.status !== "draft").length;
  const pendingNeeds = needs.filter((need) => !need.status || need.status === "pending").length;
  const approvedNeeds = needs.filter((need) => need.status === "approved").length;
  const rejectedNeeds = needs.filter((need) => need.status === "rejected").length;

  const metrics = [
    { label: "Postări publicate", value: publishedPosts, icon: <ArticleIcon /> },
    { label: "Nevoi în așteptare", value: pendingNeeds, icon: <FavoriteIcon /> },
    { label: "Nevoi aprobate", value: approvedNeeds, icon: <FavoriteIcon /> },
    { label: "Nevoi respinse", value: rejectedNeeds, icon: <FavoriteIcon /> },
    { label: "Abonați newsletter", value: subscribers.length, icon: <MarkEmailReadIcon /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={2}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <QueryStatsIcon sx={{ color: "#93c5fd" }} />
              <Typography variant="h5" fontWeight={900} sx={{ color: "white" }}>Statistici</Typography>
            </Stack>
            <Typography sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}>Date actualizate în timp real din Firebase.</Typography>
          </Box>
          <Button variant="outlined" onClick={() => navigate("/admin/home")} sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>Înapoi la panou</Button>
        </Stack>

        {error && <Box role="alert" sx={{ p: 2, borderRadius: 2, bgcolor: "#fee2e2", color: "#991b1b" }}>{error}</Box>}
        {loading ? <Typography sx={{ color: "white" }}>Se încarcă statisticile…</Typography> : !error && (
          <>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }, gap: 1.5 }}>
              {metrics.map((metric) => <Card key={metric.label} sx={{ borderRadius: 3 }}><CardContent>
                <Box sx={{ color: "#0f2e60" }}>{metric.icon}</Box>
                <Typography sx={{ color: "#64748b", fontSize: 12, mt: 1 }}>{metric.label}</Typography>
                <Typography sx={{ color: "#0f2e60", fontWeight: 900, fontSize: 28 }}>{metric.value}</Typography>
              </CardContent></Card>)}
            </Box>
            <Card sx={{ borderRadius: 3 }}><CardContent>
              <Typography sx={{ color: "#0f2e60", fontWeight: 900, mb: 2 }}>Postări pe categorie</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }, gap: 1.5 }}>
                {[["Învățare", "invatare"], ["Rugăciune", "rugaciune"], ["Predicare", "predicare"], ["Cântare", "cantare"], ["Mărturie", "marturie"]].map(([label, key]) => (
                  <Box key={key} sx={{ p: 1.5, borderRadius: 2, bgcolor: "#eff6ff" }}>
                    <Typography sx={{ color: "#475569", fontSize: 13 }}>{label}</Typography>
                    <Typography sx={{ color: "#0f2e60", fontWeight: 900, fontSize: 22 }}>{categoryCounts[key] || 0}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ color: "#64748b", fontSize: 12, mt: 2 }}>Ciornele sunt excluse din totalurile publicate. Vizualizările nu sunt numărate încă de site.</Typography>
            </CardContent></Card>
          </>
        )}
      </Stack>
    </Container>
  );
}
