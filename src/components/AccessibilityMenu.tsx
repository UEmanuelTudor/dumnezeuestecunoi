import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CloseIcon from "@mui/icons-material/Close";

type Preferences = { textSize: number; highContrast: boolean; underlineLinks: boolean; reduceMotion: boolean };
const DEFAULTS: Preferences = { textSize: 100, highContrast: false, underlineLinks: false, reduceMotion: false };
const STORAGE_KEY = "accessibility-preferences";

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${preferences.textSize}%`;
    document.body.classList.toggle("accessibility-high-contrast", preferences.highContrast);
    document.body.classList.toggle("accessibility-underline-links", preferences.underlineLinks);
    document.body.classList.toggle("accessibility-reduce-motion", preferences.reduceMotion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const update = (key: keyof Preferences, value: number | boolean) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="Deschide meniul de accesibilitate"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        sx={{ position: "fixed", right: 20, bottom: { xs: 90, sm: 24 }, zIndex: 1300, bgcolor: "#0f2e60" }}
      >
        {open ? <CloseIcon /> : <AccessibilityNewIcon />}
      </Fab>
      {open && (
        <Paper
          role="region"
          aria-label="Setări de accesibilitate"
          elevation={12}
          sx={{ position: "fixed", right: 20, bottom: { xs: 154, sm: 90 }, zIndex: 1300, width: "min(340px, calc(100vw - 40px))", p: 2.5, borderRadius: 3 }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={800}>Accesibilitate</Typography>
              <IconButton aria-label="Închide meniul" onClick={() => setOpen(false)} size="small"><CloseIcon /></IconButton>
            </Stack>
            <Typography variant="body2" color="text.secondary">Ajustează afișarea pentru o lectură mai ușoară.</Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Typography>Dimensiunea textului</Typography>
              <Stack direction="row" spacing={0.5}>
                <Button size="small" variant="outlined" aria-label="Micșorează textul" disabled={preferences.textSize <= 100} onClick={() => update("textSize", Math.max(100, preferences.textSize - 12.5))}>A−</Button>
                <Button size="small" variant="outlined" aria-label="Mărește textul" disabled={preferences.textSize >= 125} onClick={() => update("textSize", Math.min(125, preferences.textSize + 12.5))}>A+</Button>
              </Stack>
            </Stack>
            <FormControlLabel control={<Switch checked={preferences.highContrast} onChange={(event) => update("highContrast", event.target.checked)} />} label="Contrast ridicat" />
            <FormControlLabel control={<Switch checked={preferences.underlineLinks} onChange={(event) => update("underlineLinks", event.target.checked)} />} label="Subliniază linkurile" />
            <FormControlLabel control={<Switch checked={preferences.reduceMotion} onChange={(event) => update("reduceMotion", event.target.checked)} />} label="Redu animațiile" />
            <Button onClick={() => setPreferences(DEFAULTS)} sx={{ alignSelf: "flex-start" }}>Resetează setările</Button>
          </Stack>
        </Paper>
      )}
    </>
  );
}
