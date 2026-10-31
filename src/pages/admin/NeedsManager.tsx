import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AdminBackButton from "./AdminBackButton";

type NeedItem = {
  id: string;
  title: string;
  description: string;
  author?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: any;
};


// ⚠️ Link-ul către worker-ul tău de pe Cloudflare
const WORKER_URL = "https://nameless-bonus-c608.d4riusfncollab.workers.dev";

// ⚠️ ÎNLOCUIEȘTE cu parola pe care ai pus-o la secretul ADMIN_TOKEN în Cloudflare
const ADMIN_TOKEN = "parola2026!";

type Status = "in_asteptare" | "acceptata" | "refuzata" | "rezolvata";

type Nevoie = {
  id: string;
  nume: string;
  descriere: string;
  contact?: string;
  status: Status;
  createdAt: string;
  updatedAt?: string;
};

const STATUS_LABEL: Record<Status, { label: string; color: "default" | "success" | "error" | "info" }> = {
  in_asteptare: { label: "În așteptare", color: "default" },
  acceptata: { label: "Acceptată", color: "info" },
  refuzata: { label: "Refuzată", color: "error" },
  rezolvata: { label: "Rezolvată", color: "success" },
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ro-RO");
  } catch {
    return iso;
  }
}

export default function NeedsManager() {
  const [needs, setNeeds] = useState<NeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Preluăm toate nevoile în timp real din Firebase
  useEffect(() => {
    const q = query(collection(db, "needs"), orderBy("createdAt", "desc"));
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
        setError(err.message);
      }
    );

    return () => unsub();
  }, []);

  // Funcție pentru schimbarea statusului (Aprobat / Respins)
  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "needs", id), {
        status: newStatus,
      });
    } catch (e: any) {
      setError(e?.message || "Eroare la actualizarea statusului.");
    }
  };

  // Funcție pentru ștergerea unei nevoi
  const handleDelete = async (id: string, title: string) => {
    const ok = window.confirm(`Sigur dorești să ștergi cererea „${title}”?`);
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "needs", id));
    } catch (e: any) {
      setError(e?.message || "Eroare la ștergere.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminBackButton />
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight={800} sx={{ color: "white", mb: 1 }}>
            Gestionare Nevoi & Cereri de Rugăciune
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
            Aprobă sau respinge cererile trimise de vizitatori înainte de a fi afișate public pe site.
          </Typography>
        </Box>

        {error && (
          <Box sx={{ p: 2, bgcolor: "#fee2e2", color: "#991b1b", borderRadius: 2 }}>
            {error}
          </Box>
        )}

        <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Typography sx={{ fontWeight: 900, textTransform: "uppercase", mb: 2, color: "#0f2e60" }}>
              Toate cererile primite ({needs.length})
            </Typography>

            <Divider sx={{ mb: 2.5 }} />

            <Stack spacing={2}>
              {needs.map((item) => {
                const status = item.status || "pending";
                return (
                  <Box
                    key={item.id}
                    sx={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 3,
                      p: 2.5,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 2,
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      bgcolor: status === "pending" ? "#fffdf4" : "white",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                        <Chip
                          label={
                            status === "approved"
                              ? "Aprobat"
                              : status === "rejected"
                              ? "Respins"
                              : "În așteptare"
                          }
                          color={
                            status === "approved"
                              ? "success"
                              : status === "rejected"
                              ? "error"
                              : "warning"
                          }
                          size="small"
                          icon={
                            status === "approved" ? (
                              <CheckCircleIcon />
                            ) : status === "rejected" ? (
                              <CancelIcon />
                            ) : (
                              <HourglassEmptyIcon />
                            )
                          }
                          sx={{ fontWeight: 700 }}
                        />
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                          Autor: {item.author || "Anonim"}
                        </Typography>
                      </Stack>

                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2e60", mb: 1 }}>
                        {item.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "#334155", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </Box>

                    {/* Butoane de Acțiune Admin */}
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      {status !== "approved" && (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleUpdateStatus(item.id, "approved")}
                          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                        >
                          Aprobă
                        </Button>
                      )}

                      {status !== "rejected" && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<CancelIcon />}
                          onClick={() => handleUpdateStatus(item.id, "rejected")}
                          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                        >
                          Respins
                        </Button>
                      )}

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id, item.title)}
                        title="Șterge definitiv"
                        sx={{ bgcolor: "rgba(239, 68, 68, 0.08)" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                );
              })}

              {needs.length === 0 && (
                <Typography sx={{ textAlign: "center", py: 4, color: "#64748b" }}>
                  Nu există nicio cerere trimisă momentan.
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
