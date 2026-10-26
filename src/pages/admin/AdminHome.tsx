import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

type Stats = { posts: number; pendingNeeds: number; testimonies: number; subscribers: number; prayers: number };

export default function AdminHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ posts: 0, pendingNeeds: 0, testimonies: 0, subscribers: 0, prayers: 0 });
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    Promise.all([
      getDocs(collection(db, "posts")),
      getDocs(query(collection(db, "needs"), where("status", "==", "pending"))),
      getDocs(query(collection(db, "posts"), where("category", "==", "marturie"))),
      getDocs(collection(db, "newsletter")),
      getDocs(query(collection(db, "needs"), where("status", "==", "approved"))),
    ]).then(([posts, pendingNeeds, testimonies, subscribers, prayers]) => {
      setStats({ posts: posts.size, pendingNeeds: pendingNeeds.size, testimonies: testimonies.size, subscribers: subscribers.size, prayers: prayers.size });
    }).catch((error) => {
      console.error("Eroare la încărcarea statisticilor:", error);
      setStatsError("Statisticile nu au putut fi încărcate. Verifică permisiunile Firebase.");
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ pb: 6 }}>
      <Box
        sx={{
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          background: "linear-gradient(90deg, #0b3a6f 0%, #2a7de1 100%)",
          color: "white",
          boxShadow: "0 10px 26px rgba(0,0,0,0.25)",
          mb: 3,
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: { xs: 18, md: 22 }, mb: 1 }}>
          Romani 11:36
        </Typography>

        <Typography sx={{ opacity: 0.95, lineHeight: 1.7, fontSize: { xs: 14.5, md: 16 } }}>
          „Din El, prin El și pentru El sunt toate lucrurile. A Lui să fie slava în veci! Amin!”
        </Typography>
      </Box>

      {/* PANOU 1 */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }, gap: 1.5, mb: 3 }}>
        {[
          ["Postări", stats.posts, <ArticleIcon />],
          ["Nevoi în așteptare", stats.pendingNeeds, <FavoriteIcon />],
          ["Mărturii", stats.testimonies, <VolunteerActivismIcon />],
          ["Abonați", stats.subscribers, <MarkEmailReadIcon />],
          ["Nevoi aprobate", stats.prayers, <BarChartIcon />],
        ].map(([label, value, icon]) => (
          <Card key={label as string} sx={{ borderRadius: 3, bgcolor: "white" }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#0f2e60" }}>{icon}</Stack>
              <Typography sx={{ color: "#64748b", fontSize: 12, mt: 1 }}>{label}</Typography>
              <Typography sx={{ color: "#0f2e60", fontWeight: 900, fontSize: 25 }}>{value as number}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {statsError && <Typography role="alert" sx={{ color: "#fecaca", mb: 2 }}>{statsError}</Typography>}
      <Box
        sx={{
          borderRadius: 4,
          p: { xs: 2, md: 3 },
          bgcolor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: 900, mb: 2, fontSize: { xs: 18, md: 22 } }}>
          Panou Admin
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.92)",
              transition: "transform .25s ease, box-shadow .25s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 14px 28px rgba(0,0,0,0.25)" },
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <AdminPanelSettingsIcon />
                <Typography sx={{ fontWeight: 900, textTransform: "uppercase" }}>
                  Administrare
                </Typography>
              </Stack>

              <Typography sx={{ opacity: 0.8, mb: 2 }}>
                Gestionează postări, nevoi și newsletter.
              </Typography>

              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/admin/administrare")}
                sx={{
                  borderRadius: 999,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  background: "linear-gradient(90deg, #15b91e 0%, #008080 100%)",
                  "&:hover": { background: "linear-gradient(90deg, #43fc4c 0%, #20b2aa 100%)" },
                }}
              >
                Intră în Administrare
              </Button>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.92)",
              transition: "transform .25s ease, box-shadow .25s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 14px 28px rgba(0,0,0,0.25)" },
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <BarChartIcon />
                <Typography sx={{ fontWeight: 900, textTransform: "uppercase" }}>
                  Statistici
                </Typography>
              </Stack>

              <Typography sx={{ opacity: 0.8, mb: 2 }}>
                Vezi numărul de postări, nevoi, postări pe categorii și vizionări.
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                sx={{ borderRadius: 999, fontWeight: 900, textTransform: "uppercase" }}
                onClick={() => navigate("/admin/statistici")}
              >
                Vezi statistici
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
} 