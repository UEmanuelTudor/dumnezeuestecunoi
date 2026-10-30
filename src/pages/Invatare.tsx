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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
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

export default function Invatare() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Preluăm postările în timp real din Firebase pentru categoria "invatare"
  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("category", "==", "invatare")
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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
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
        <SiteMeta title="Învățare" description="Lecții și resurse pentru creșterea în credință." />
        <Breadcrumbs current="Învățare" />
        
        {/* Bannerul Superior */}
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
                Învățare
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
                „Doamne, învață-mă calea Ta, și voi umbla în adevărul Tău! Dă-mi o inimă neîmpărțită ca să mă tem de Numele Tău.”
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
                Psalmul 86:11
              </Typography>
            </Box>

            <Box
              component="img"
              src="/caleata.png" 
              alt="Învățare"
              sx={{
                width: { xs: "100%", md: "320px" },                     
                height: "auto",                      
                maxHeight: "220px",                  
                objectFit: "center", 
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
              onError={(e: any) => (e.currentTarget.style.display = "none")}
            />
          </Stack>
        </Box>

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
              Nu există nicio postare adăugată încă la Învățare.
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Adaugă o postare din panoul de administrare selectând categoria „Învățare”.
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
                {/* AICI AM ELIMINAT COMPLET IMAGINEA, RĂMĂM DOAR CU TEXTUL ȘI VIDEO-UL */}

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
