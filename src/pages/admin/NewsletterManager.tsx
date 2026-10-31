import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AdminBackButton from "./AdminBackButton";

// Importuri Firebase
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

// Definim cum arată un abonat
interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: any;
}


// ⚠️ Link-ul către worker-ul tău de pe Cloudflare
const WORKER_URL = "https://nameless-bonus-c608.d4riusfncollab.workers.dev";

// ⚠️ ÎNLOCUIEȘTE cu parola pe care ai pus-o la secretul ADMIN_TOKEN în Cloudflare
const ADMIN_TOKEN = "parola2026!";


function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ro-RO");
  } catch {
    return iso;
  }
}

export default function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Funcția care aduce datele din Firebase
  const fetchSubscribers = async () => {
    setLoading(true);
    setError("");
    try {
      // Căutăm în colecția "newsletter" și îi ordonăm după cei mai noi
      const q = query(collection(db, "newsletter"), orderBy("subscribedAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const subsData: Subscriber[] = [];
      querySnapshot.forEach((doc) => {
        subsData.push({ id: doc.id, ...doc.data() } as Subscriber);
      });
      
      setSubscribers(subsData);
    } catch (err: any) {
      console.error("Eroare la aducerea abonaților:", err);
      // Dacă apare eroarea de permisiuni, îi punem un mesaj clar adminului
      if (err.message.includes("Missing or insufficient permissions")) {
        setError("Nu ai permisiuni să citești baza de date. Te rog actualizează regulile din Firebase Firestore.");
      } else {
        setError("A apărut o eroare la încărcarea datelor.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Rulăm funcția imediat cum se deschide pagina
  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Funcția de ștergere a unui abonat
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Ești sigur că vrei să ștergi acest abonat?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "newsletter", id));
      // Actualizăm tabelul eliminând abonatul șters, fără să dăm iar refresh
      setSubscribers(subscribers.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error("Eroare la ștergere:", err);
      alert("Nu am putut șterge abonatul. Verifică permisiunile Firebase.");
    }
  };

  // Funcție utilitară pentru a formata data frumos
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Dată necunoscută";
    const date = timestamp.toDate();
    return date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <AdminBackButton />
      
      {/* HEADER PANOU ADMIN */}
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ p: 1.5, bgcolor: "#e0f2fe", borderRadius: 2, color: "#0284c7" }}>
            <MailOutlineIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
              Abonați Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Gestionează persoanele care s-au abonat la noutățile platformei.
            </Typography>
          </Box>
        </Stack>
        <Chip 
          label={`${subscribers.length} Abonați`} 
          color="primary" 
          sx={{ fontWeight: 700, fontSize: "1rem", px: 1, mt: { xs: 2, sm: 0 }, bgcolor: "#0f2e60" }} 
        />
      </Stack>

      {/* ZONA DE CONȚINUT */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9" }}>
        
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
            <CircularProgress sx={{ color: "#0f2e60" }} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 5, textAlign: "center" }}>
            <Typography color="error" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              ⚠️ {error}
            </Typography>
          </Box>
        ) : subscribers.length === 0 ? (
          <Box sx={{ p: 8, textAlign: "center", color: "#94a3b8" }}>
            <MailOutlineIcon sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#475569" }}>Nu există niciun abonat momentan.</Typography>
            <Typography variant="body2">Când cineva se va abona pe pagina principală, va apărea aici.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#334155", textTransform: "uppercase", fontSize: "0.85rem" }}>Nume</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#334155", textTransform: "uppercase", fontSize: "0.85rem" }}>E-mail</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#334155", textTransform: "uppercase", fontSize: "0.85rem" }}>Data Abonării</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#334155", textTransform: "uppercase", fontSize: "0.85rem" }}>Acțiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscribers.map((sub) => (
                  <TableRow key={sub.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "background-color 0.2s" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#0f172a" }}>
                      {sub.name}
                    </TableCell>
                    <TableCell sx={{ color: "#475569" }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2">{sub.email}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            navigator.clipboard.writeText(sub.email);
                            alert("Email copiat!");
                          }}
                          sx={{ color: "#cbd5e1", "&:hover": { color: "#0284c7" } }}
                          title="Copiază email"
                        >
                          <ContentCopyIcon fontSize="small" sx={{ width: 16, height: 16 }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ color: "#64748b", fontSize: "0.9rem" }}>
                      {formatDate(sub.subscribedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(sub.id)}
                        sx={{ bgcolor: "rgba(239, 68, 68, 0.1)", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.2)" } }}
                        title="Șterge abonat"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
}