import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ShareButtons from "../components/ShareButtons";
import Breadcrumbs from "../components/Breadcrumbs";
import SiteMeta from "../components/SiteMeta";
import { Link as RouterLink } from "react-router-dom";
import { slugify } from "../utils/slugify";

type Post = {
  id: string;
  category: string;
  title: string;
  imageUrl?: string;
  excerpt: string;
  content: string;
  youtubeUrl?: string;
  createdAt?: any;
};

type PrayerTheme = {
  title: string;
  description: string;
  prayer: string;
  color: string;
};

const prayerThemes: PrayerTheme[] = [
  {
    title: "Dimineață",
    description: "Începe ziua cu recunoștință și încredere.",
    prayer: "Doamne, Îți mulțumesc pentru această nouă zi. Călăuzește-mi pașii, păzește-mi inima și ajută-mă să fiu o binecuvântare pentru cei pe care îi voi întâlni. Amin.",
    color: "#0b3a6f",
  },
  {
    title: "Seară",
    description: "Lasă grijile zilei în mâna lui Dumnezeu.",
    prayer: "Doamne, Îți mulțumesc pentru ziua care a trecut. Iartă-mi greșelile, dă-mi odihnă și ajută-mă să mă încred în Tine pentru ziua de mâine. Amin.",
    color: "#4338ca",
  },
  {
    title: "Familie",
    description: "Roagă-te pentru pace, unitate și protecție.",
    prayer: "Doamne, binecuvântează familia mea. Dă-ne dragoste, răbdare și înțelepciune. Păzește-ne și ajută-ne să ne purtăm unii altora poverile. Amin.",
    color: "#9f1239",
  },
  {
    title: "Anxietate",
    description: "Adu îngrijorările tale înaintea Lui.",
    prayer: "Doamne, Îți aduc toate îngrijorările mele. Ajută-mă să nu mă tem, ci să mă încred în prezența și purtarea Ta de grijă. Umple-mi inima cu pacea Ta. Amin.",
    color: "#166534",
  },
  {
    title: "Vindecare",
    description: "Cere putere, mângâiere și restaurare.",
    prayer: "Doamne, Te rog să aduci vindecare și mângâiere. Dă putere celui care suferă și călăuzește-i pe cei care oferă îngrijire. Facă-se voia Ta și păzește-ne în nădejde. Amin.",
    color: "#7c2d12",
  },
  {
    title: "Mulțumire",
    description: "Oprește-te și recunoaște bunătatea Lui.",
    prayer: "Doamne, Îți mulțumesc pentru bunătatea, harul și credincioșia Ta. Ajută-mă să văd binecuvântările Tale chiar și în lucrurile mici și să trăiesc cu o inimă recunoscătoare. Amin.",
    color: "#854d0e",
  },
  {
    title: "Înainte de somn",
    description: "Încheie ziua în liniște și încredere.",
    prayer: "Doamne, îmi pun odihna și noaptea în mâna Ta. Păzește-mă, liniștește-mi gândurile și ajută-mă să mă trezesc cu pace și putere. Amin.",
    color: "#581c87",
  },
];

const prayerVerses = [
  {
    text: "Nu vă îngrijorați de nimic, ci în orice lucru, aduceți cererile voastre la cunoștința lui Dumnezeu, prin rugăciuni și cereri, cu mulțumiri.",
    reference: "Filipeni 4:6",
  },
  {
    text: "Cereți, și vi se va da; căutați și veți găsi; bateți, și vi se va deschide.",
    reference: "Matei 7:7",
  },
  {
    text: "Domnul este aproape de toți cei ce-L cheamă, de toți cei ce-L cheamă cu sinceritate.",
    reference: "Psalmii 145:18",
  },
  {
    text: "Cheamă-Mă, și-ți voi răspunde și îți voi vesti lucruri mari, lucruri ascunse, pe care nu le cunoști.",
    reference: "Ieremia 33:3",
  },
  {
    text: "Încredințează-ți soarta în mâna Domnului, și El te va sprijini. El nu va lăsa niciodată să se clatine cel neprihănit.",
    reference: "Psalmii 55:22",
  },
  {
    text: "Apropiați-vă de Dumnezeu, și El Se va apropia de voi.",
    reference: "Iacov 4:8",
  },
  {
    text: "Vărsați-vă inimile înaintea Lui! Dumnezeu este adăpostul nostru.",
    reference: "Psalmii 62:8",
  },
  {
    text: "Rugați-vă neîncetat.",
    reference: "1 Tesaloniceni 5:17",
  },
  {
    text: "Să ne apropiem, dar, cu deplină încredere de scaunul harului, ca să căpătăm îndurare și să găsim har, pentru ca să fim ajutați la vreme de nevoie.",
    reference: "Evrei 4:16",
  },
  {
    text: "Iar Dumnezeul meu să îngrijească de toate trebuințele voastre, după bogăția Sa, în slavă, în Isus Hristos.",
    reference: "Filipeni 4:19",
  },
];

export default function Rugaciune() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<PrayerTheme | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };
  const prayerVerse = prayerVerses[(getDayOfYear() + 1) % prayerVerses.length];

  useEffect(() => {
    try {
      localStorage.removeItem("prayer-journal");
      localStorage.removeItem("personal-prayer-needs");
      setNotificationEnabled(localStorage.getItem("prayer-notifications") === "enabled");
    } catch (error) {
      console.error("Eroare la încărcarea preferințelor de rugăciune:", error);
    }
  }, []);

  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return;
    const interval = window.setInterval(() => {
      setTimerSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(interval);
          setTimerRunning(false);
          setActionMessage("Timpul de liniște s-a încheiat. Dumnezeu să-ți binecuvânteze timpul de rugăciune.");
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  useEffect(() => {
    if (!notificationEnabled || !("Notification" in window) || Notification.permission !== "granted") return;
    const interval = window.setInterval(() => {
      new Notification("Timp pentru rugăciune", {
        body: "Oprește-te câteva clipe și vorbește cu Dumnezeu.",
      });
    }, 24 * 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [notificationEnabled]);

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const toggleNotifications = async () => {
    if (!("Notification" in window)) {
      setActionMessage("Browserul tău nu acceptă notificări.");
      return;
    }
    if (notificationEnabled) {
      setNotificationEnabled(false);
      localStorage.removeItem("prayer-notifications");
      setActionMessage("Notificările pentru rugăciune au fost dezactivate.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setActionMessage("Notificările nu au fost permise în browser.");
      return;
    }
    setNotificationEnabled(true);
    localStorage.setItem("prayer-notifications", "enabled");
    new Notification("Timp pentru rugăciune", {
      body: "Oprește-te câteva clipe și vorbește cu Dumnezeu.",
    });
    setActionMessage("Notificările sunt activate pentru această sesiune de navigare.");
  };

  // Preluăm postările în timp real din Firebase pentru categoria "rugaciune"
  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("category", "==", "rugaciune") // 👈 Aici filtrăm doar categoria corectă
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: Post[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            category: data.category,
            title: data.title,
            imageUrl: data.imageUrl,
            excerpt: data.excerpt,
            content: data.content,
            youtubeUrl: data.youtubeUrl,
            createdAt: data.createdAt,
          };
        });
        setPosts(items.filter((item) => (item as Post & { status?: string }).status !== "draft"));
      },
      (err) => {
        console.error("Eroare la preluarea postărilor din Firebase:", err);
      }
    );

    return () => unsub();
  }, []);

  const handleOpenPost = (post: Post) => setSelectedPost(post);
  const handleClosePost = () => setSelectedPost(null);

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #dbeafe 0%, #ffffff 50%)",
        m: 0,
        p: 0,
        pb: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <SiteMeta title="Rugăciune" description="Rugăciuni tematice, timer de liniște și versete pentru rugăciune." />
        <Breadcrumbs current="Rugăciune" />
        
        {/* Bannerul Superior - Același design elegant ca la Învățare */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 6,
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ maxWidth: 600 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  color: "#0b3a6f",
                  mb: 2,
                  textTransform: "uppercase",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Rugăciune
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  color: "#2d3748",
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                „Tu însă, când te rogi, intră în cămăruța ta, încuie ușa după tine și roagă-te Tatălui tău, Care este în ascuns; și Tatăl tău, Care vede în ascuns, îți va răsplăti.”
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#4a5568",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Matei 6:6
              </Typography>
            </Box>

            <Box
              component="img"
              src="/rugaciune.png" // 👈 Asigură-te că ai poza asta în folderul public
              alt="Rugăciune"
              sx={{
                width: { xs: "100%", md: "320px" },                     
                height: "auto",                      
                maxHeight: "220px",                  
                objectFit: "contain", // Poți schimba în "cover" dacă vrei să umple tot spațiul perfect, dar "contain" păstrează proporțiile la fel ca la Învățare
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
              onError={(e: any) => (e.currentTarget.style.display = "none")}
            />
          </Stack>
        </Box>

        <Box component="section" aria-labelledby="roaga-te-acum" sx={{ mb: 6 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              id="roaga-te-acum"
              component="h2"
              sx={{ color: "#0f2e60", fontWeight: 800, fontSize: { xs: "1.7rem", md: "2.1rem" }, mb: 1 }}
            >
              Roagă-te acum
            </Typography>
            <Typography sx={{ color: "#526274", lineHeight: 1.6 }}>
              Alege o temă, găsește un moment de liniște și adu inima ta înaintea lui Dumnezeu.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2.5,
              mb: 2.5,
            }}
          >
            {prayerThemes.map((theme) => (
              <Card key={theme.title} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "0 5px 16px rgba(15,46,96,0.06)" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ color: theme.color, fontWeight: 800, fontSize: "1.15rem", mb: 0.75 }}>
                    {theme.title}
                  </Typography>
                  <Typography sx={{ color: "#526274", fontSize: "0.92rem", lineHeight: 1.5, mb: 2 }}>
                    {theme.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedTheme(theme)}
                    sx={{ borderColor: theme.color, color: theme.color, borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                  >
                    Deschide rugăciunea
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 2.5,
            }}
          >
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", border: "1px solid #c7d2fe" }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <SelfImprovementIcon sx={{ color: "#3730a3", fontSize: 30 }} />
                  <Typography sx={{ color: "#312e81", fontWeight: 800, fontSize: "1.2rem" }}>
                    3 minute de liniște
                  </Typography>
                </Stack>
                <Typography sx={{ color: "#4338ca", lineHeight: 1.55, mb: 2 }}>
                  Așază-te confortabil, respiră rar și folosește timpul pentru rugăciune și reflecție.
                </Typography>
                <Typography sx={{ color: "#312e81", fontSize: "2.3rem", fontWeight: 800, textAlign: "center", mb: 1 }}>
                  {formatTimer(timerSeconds)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(timerSeconds / 180) * 100}
                  sx={{ mb: 2, height: 7, borderRadius: 4, bgcolor: "rgba(67,56,202,0.15)", "& .MuiLinearProgress-bar": { bgcolor: "#4338ca" } }}
                />
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={() => setTimerRunning((running) => !running)}
                    disabled={timerSeconds === 0}
                    sx={{ bgcolor: "#4338ca", borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                  >
                    {timerRunning ? "Pauză" : "Începe"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => { setTimerRunning(false); setTimerSeconds(180); }}
                    sx={{ borderColor: "#4338ca", color: "#4338ca", borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                  >
                    Resetează
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #fffaf3 0%, #fef3c7 100%)", border: "1px solid #fde68a" }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ color: "#854d0e", fontWeight: 800, fontSize: "1.2rem", mb: 1.5 }}>
                  Verset pentru rugăciune
                </Typography>
                <Typography sx={{ color: "#713f12", fontFamily: "'Georgia', serif", fontStyle: "italic", lineHeight: 1.7, mb: 1 }}>
                  „{prayerVerse.text}”
                </Typography>
                <Typography sx={{ color: "#92400e", fontWeight: 700, mb: 2 }}>
                  — {prayerVerse.reference}
                </Typography>
                <Button
                  startIcon={<NotificationsActiveIcon />}
                  variant="outlined"
                  onClick={toggleNotifications}
                  sx={{ borderColor: "#b45309", color: "#92400e", borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                >
                  {notificationEnabled ? "Dezactivează notificările" : "Amintește-mi să mă rog"}
                </Button>
              </CardContent>
            </Card>
          </Box>

          {actionMessage && (
            <Typography role="status" aria-live="polite" sx={{ color: "#166534", fontWeight: 700, mt: 2, textAlign: "center" }}>
              {actionMessage}
            </Typography>
          )}

        </Box>

        <Dialog open={Boolean(selectedTheme)} onClose={() => setSelectedTheme(null)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: selectedTheme?.color, fontWeight: 800 }}>
            {selectedTheme?.title}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "#334155", fontFamily: "'Georgia', serif", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {selectedTheme?.prayer}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setSelectedTheme(null)} sx={{ textTransform: "none" }}>Închide</Button>
          </DialogActions>
        </Dialog>

        {/* Gridul cu Postări din Firebase */}
        {posts.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              bgcolor: "rgba(255,255,255,0.7)",
              borderRadius: 4,
              p: 4,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: 700, mb: 1 }}>
              Nu există nicio postare adăugată încă la Rugăciune.
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Adaugă o postare din panoul de administrare selectând categoria „Rugăciune”.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={post.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #fffaf3 0%, #fef7e5 100%)",
                    border: "1px solid #efe4cf",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 30px rgba(15, 46, 96, 0.12)",
                    },
                  }}
                >
                  {post.imageUrl && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={post.imageUrl}
                      alt={post.title}
                      sx={{ objectFit: "cover" }}
                    />
                  )}
                  <CardContent
                    sx={{
                      p: 3.5,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Chip
                        label="Rugăciune"
                        size="small"
                        sx={{
                          bgcolor: "rgba(15, 46, 96, 0.08)",
                          color: "#0f2e60",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          borderRadius: 1.5,
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#0f2e60",
                          mb: 1.5,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#3e2f1c",
                          mb: 3,
                          lineHeight: 1.7,
                          fontFamily: "'Georgia', serif",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AutoStoriesIcon />}
                        onClick={() => handleOpenPost(post)}
                        sx={{
                          backgroundColor: "#0f2e60",
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 700,
                          px: 3,
                          py: 1,
                          boxShadow: "0 4px 12px rgba(15, 46, 96, 0.2)",
                          "&:hover": { backgroundColor: "#082c54" },
                        }}
                      >
                        Citește
                      </Button>

                      {post.youtubeUrl && (
                        <IconButton
                          color="error"
                          href={post.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Deschide pe YouTube"
                          sx={{
                            bgcolor: "rgba(255,0,0,0.08)",
                            "&:hover": { bgcolor: "rgba(255,0,0,0.15)" },
                          }}
                        >
                          <YouTubeIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Fereastra Modală de Citire (FĂRĂ POZĂ ÎN INTERIOR) */}
        <Dialog
          open={Boolean(selectedPost)}
          onClose={handleClosePost}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4, p: { xs: 1, md: 2 }, background: "#fdfbf7" },
          }}
        >
          {selectedPost && (
            <>
              <DialogTitle
                sx={{
                  m: 0,
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#0f2e60",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {selectedPost.title}
                  </Typography>
                </Box>
                <IconButton onClick={handleClosePost} sx={{ color: "#4a5568" }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>

              <DialogContent dividers sx={{ borderColor: "#e0d6c2", py: 4, px: { xs: 2, md: 4 } }}>
                <Typography
                  component="div"
                  sx={{
                    color: "#3e2f1c",
                    lineHeight: 1.9,
                    fontSize: "1.1rem",
                    fontFamily: "'Georgia', serif",
                    whiteSpace: "pre-wrap",
                    mb: selectedPost.youtubeUrl ? 4 : 0,
                  }}
                >
                  {selectedPost.content}
                </Typography>

                {selectedPost.youtubeUrl && getYouTubeEmbedUrl(selectedPost.youtubeUrl) && (
                  <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#0f2e60",
                        mb: 2,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Material Video / Predică asociată:
                    </Typography>
                    <Box
                      sx={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: 3,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        bgcolor: "#000",
                      }}
                    >
                      <iframe
                        src={getYouTubeEmbedUrl(selectedPost.youtubeUrl)!}
                        title="YouTube video player"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                  </Box>
                )}
              </DialogContent>

              <DialogActions sx={{ p: 3 }}>
                <ShareButtons title={selectedPost?.title || "Dumnezeu este cu noi"} />
                <Button component={RouterLink} to={`/post/${selectedPost.id}/${slugify(selectedPost.title)}`} sx={{ textTransform: "none" }}>Pagină proprie</Button>
                <Button
                  onClick={handleClosePost}
                  variant="contained"
                  sx={{
                    backgroundColor: "#0f2e60",
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                    px: 4,
                    py: 1,
                    "&:hover": { backgroundColor: "#082c54" },
                  }}
                >
                  Închide
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

      </Container>
    </Box>
  );
}
