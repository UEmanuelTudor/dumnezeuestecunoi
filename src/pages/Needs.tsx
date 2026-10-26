import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Alert from "@mui/material/Alert";

type NeedItem = {
  id: string;
  title: string;
  description: string;
  author?: string;
  status?: string;
  createdAt?: any;
};

export default function Needs() {
  const [needs, setNeeds] = useState<NeedItem[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Preluăm DOAR cererile aprobate din Firebase
  useEffect(() => {
    const q = query(
      collection(db, "needs"),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: NeedItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<NeedItem, "id">),
        }));
        setNeeds(items);
      },
      (err) => {
        console.error("Eroare la preluarea nevoilor:", err);
      }
    );

    return () => unsub();
  }, []);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setTitle("");
    setDescription("");
    setAuthor("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "needs"), {
        title: title.trim(),
        description: description.trim(),
        author: author.trim() || "Anonim",
        status: "pending", // Se setează automat în așteptare pentru moderare în admin
        createdAt: serverTimestamp(),
      });
      handleCloseForm();
      setSuccessMsg("Cererea ta a fost trimită cu succes și va apărea pe site după verificare. Dumnezeu să te binecuvânteze!");
      setTimeout(() => setSuccessMsg(""), 6000);
    } catch (err) {
      console.error("Eroare la trimiterea nevoii:", err);
    } finally {
      setSubmitting(false);
    }
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
        
        {/* Bannerul Superior */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 6,
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            border: "1px solid rgba(244,63,94,0.1)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ maxWidth: 650 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  color: "#9f1239",
                  mb: 2,
                  textTransform: "uppercase",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Nevoi & Rugăciune
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  color: "#4c0519",
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                „Nu vă îngrijorați de nimic; ci în orice lucru aduceți cererile voastre la cunoștința lui Dumnezeu, prin rugăciune și cereri, cu mulțumiri.”
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#881337",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  mb: 3,
                }}
              >
                Filipeni 4:6
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<FavoriteIcon />}
                onClick={handleOpenForm}
                sx={{
                  backgroundColor: "#e11d48",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 6px 20px rgba(225, 29, 72, 0.3)",
                  "&:hover": { backgroundColor: "#be123c" },
                }}
              >
                Adaugă o nevoie / cerere
              </Button>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "280px" },
                height: "200px",
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                border: "1px solid rgba(244,63,94,0.15)"
              }}
            >
              <VolunteerActivismIcon sx={{ fontSize: 50, color: "#e11d48", mb: 1.5 }} />
              <Typography sx={{ fontWeight: 700, color: "#9f1239", fontFamily: "'Poppins', sans-serif", fontSize: "1.05rem" }}>
                Suntem alături în rugăciune
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f1d1d", mt: 0.5, fontFamily: "'Georgia', serif" }}>
                Împărtășește povara ta și ne vom ruga împreună.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {successMsg && (
          <Alert severity="success" sx={{ mb: 4, borderRadius: 3 }}>
            {successMsg}
          </Alert>
        )}

        {/* Gridul cu Nevoi Aprobate */}
        {needs.length === 0 ? (
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
              Nu există nicio cerere publicată momentan.
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
              Fii primul care adaugă o cerere folosind butonul de mai sus.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {needs.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #fffaf5 0%, #fff1f2 100%)",
                    border: "1px solid #fecdd3",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 30px rgba(225, 29, 72, 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "#e11d48", fontWeight: 700, display: "block", mb: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}
                      >
                        Cerere de rugăciune • {item.author || "Anonim"}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#881337",
                          mb: 1.5,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4c0519",
                          mb: 3,
                          lineHeight: 1.7,
                          fontFamily: "'Georgia', serif",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 2, borderTop: "1px solid rgba(244,63,94,0.15)" }}>
                      <FavoriteIcon sx={{ fontSize: 18, color: "#e11d48" }} />
                      <Typography variant="caption" sx={{ color: "#9f1239", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                        Susținut în rugăciune
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Fereastra Modală pentru Adăugare */}
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4, p: 2, background: "#fffdfa" },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#9f1239", fontFamily: "'Poppins', sans-serif" }}>
              Adaugă o nevoie sau cerere
            </Typography>
            <IconButton onClick={handleCloseForm} sx={{ color: "#64748b" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <Box component="form" onSubmit={handleSubmit}>
            <DialogContent dividers sx={{ borderColor: "#fecdd3", py: 3 }}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  required
                  label="Nume / Inițiale (opțional)"
                  placeholder="Ex: Fratele Andrei sau Anonim"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                />

                <TextField
                  fullWidth
                  required
                  label="Titlul cererii / Nevoi"
                  placeholder="Ex: Rugăciune pentru sănătate / Sprijin"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                />

                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Detalii despre nevoie / rugăciune"
                  placeholder="Scrie detaliile aici..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, gap: 1 }}>
              <Button
                onClick={handleCloseForm}
                variant="outlined"
                sx={{ borderRadius: 2.5, px: 3, textTransform: "none", color: "#64748b", borderColor: "#cbd5e1" }}
              >
                Anulează
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  backgroundColor: "#e11d48",
                  borderRadius: 2.5,
                  px: 4,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(225, 29, 72, 0.3)",
                  "&:hover": { backgroundColor: "#be123c" },
                }}
              >
                {submitting ? "Se trimite..." : "Trimite cererea"}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

      </Container>
    </Box>
  );
}