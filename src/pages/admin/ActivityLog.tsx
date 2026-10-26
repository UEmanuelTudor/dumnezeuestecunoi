import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AdminBackButton from "./AdminBackButton";

type Log = { id: string; action?: string; entity?: string; title?: string; createdAt?: any };

export default function ActivityLog() {
  const [logs, setLogs] = useState<Log[]>([]);
  useEffect(() => onSnapshot(query(collection(db, "auditLogs"), orderBy("createdAt", "desc")), (snapshot) => setLogs(snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Log, "id">) })))), []);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminBackButton />
      <Typography variant="h5" sx={{ color: "white", fontWeight: 800, mb: 1 }}>Istoric modificări</Typography>
      <Typography sx={{ color: "rgba(255,255,255,.75)", mb: 3 }}>Vezi când au fost create, modificate sau șterse postări.</Typography>
      <Stack spacing={1.5}>
        {logs.map((log) => (
          <Box key={log.id} sx={{ bgcolor: "white", borderRadius: 2, p: 2, display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
            <Chip label={log.action || "acțiune"} color={log.action === "deleted" ? "error" : "primary"} size="small" />
            <Typography sx={{ fontWeight: 700 }}>{log.title || "Element fără titlu"}</Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>{log.entity || "element"}</Typography>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>{log.createdAt?.toDate ? log.createdAt.toDate().toLocaleString("ro-RO") : "În așteptare"}</Typography>
          </Box>
        ))}
        {!logs.length && <Typography sx={{ color: "white" }}>Nu există activitate înregistrată încă.</Typography>}
      </Stack>
    </Container>
  );
}
