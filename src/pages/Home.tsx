import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HERO: Logo + verset */}
      <Stack
        spacing={{ xs: 2.5, md: 3 }}
        alignItems="center"
        textAlign="center"
        sx={{ mb: { xs: 4, md: 6 } }}
      >
        {/* Logo */}
        <Box sx={{ width: { xs: 140, md: 200 }, height: { xs: 140, md: 200 } }}>
          <img
            src="/logo.jpeg"
            alt="Logo - Dumnezeu este cu noi"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>

        {/* Titlu & Verset */}
        <Stack spacing={{ xs: 1, md: 1.5 }} sx={{ maxWidth: 1000, width: "100%" }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Raleway", Helvetica, sans-serif',
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: { xs: 0.2, md: 0.5 },
              fontSize: { xs: 26, sm: 30, md: 40 },
              lineHeight: { xs: 1.2, md: 1.25 },
            }}
          >
            Dumnezeu este cu noi
          </Typography>

          {/* Verset cu fundal de „carte veche” */}
          <Box
            sx={{
              bgcolor: "#f5f0e6",
              borderRadius: 2,
              boxShadow: 1,
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 3 },
              maxWidth: 900,
              mx: "auto",
              border: "1px solid #e0d6c2",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontFamily: "'Georgia', serif",
                fontSize: { xs: 16, sm: 18, md: 20 },
                lineHeight: 1.8,
                textAlign: "center",
                color: "#3e2f1c",
              }}
            >
              „Iată, fecioara va fi însărcinată, va naște un Fiu, și-I vor pune numele Emanuel,
              care tălmăcit înseamnă: «Dumnezeu este cu noi».” — <i>Matei 1:23</i>
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: { xs: 1, md: 1.5 }, flexWrap: "wrap" }}
          >
            <Button
              variant="contained"
              href="https://ebiblia.ro/app/index.html?ebiblia#read/vdcc/Mat/1/23"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<AutoStoriesIcon />}
              sx={{
                background: "linear-gradient(90deg, #15b91e 0%, #008080 100%)",
                color: "white",
                borderRadius: 3,
                px: { xs: 2.5, md: 3 },
                py: { xs: 1, md: 1.2 },
                fontSize: { xs: 14, md: 15 },
                "&:hover": {
                  background: "linear-gradient(90deg, #43fc4c 0%, #20b2aa 100%)",
                },
              }}
            >
              Deschide Biblia
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Articol de bun venit (blog / mesaj) */}
      <Card
        sx={{
          mb: { xs: 3, md: 4 },
          background: "linear-gradient(135deg, #fffaf3 0%, #fef7e5 100%)",
          border: "1px solid #efe4cf",
          borderRadius: 3,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 20, md: 24 },
              mb: { xs: 1.25, md: 1.5 },
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            Mesajul proiectului — Dumnezeu este cu noi
          </Typography>

          {/* Poză după "Mesajul proiectului" */}
          <Box
            sx={{
              mb: { xs: 3, md: 4 },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: { xs: 1, md: 2 },
            }}
          >
            <img
              src="/dumnezeuestecunoi.png"
              alt="Slijire, rugăciune și dragoste în acțiune"
              style={{ width: "100%", height: "auto", display: "block" }}
              onError={(e: any) => (e.currentTarget.style.display = "none")}
            />
          </Box>

          {/* Paragrafe separate */}
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Căutați mai întâi Împărăția Lui Dumnezeu și neprihănirea Lui și aceste lucruri vi se vor da pe deasupra. În versetul acesta din Evanghelia scrisă de Matei ne spune cuvintele Mântuitorului Isus, fiul Lui Dumnezeu care sunt o parte a predicii de pe munte pe care Isus a avut-o către ucenici și multe neamuri.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Aici Isus Hristos ne îndeamnă și ne încurajează și ne spune că voia Lui pentru noi oamenii este să căutăm Împărăția Lui. Isus subliniază aici că mai întâi, înainte de toate lucrurile, de orice, trebuie, suntem datori și este nevoie să căutăm Împărăția Lui Dumnezeu.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Acest lucru înseamnă să dorim ca Dumnezeu să domnească în viața noastră, să trăim sub autoritatea Lui, nu în păcat cu lucruri păcătoase să ne cheltuim viața, nu să trăim viața după modelele lumii acesteia și nu după poftele noastre.
          </Typography>
          <Typography sx={{ fontStyle: "italic", color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            „Împărăția Lui Dumnezeu este dreptate, pace și bucurie în Duhul Sfânt” (Romani 14:17)
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            A căuta Împărăția Lui Dumnezeu înseamnă să trăiești condus de Duhul Sfânt, în curăție, adevăr, smerenie și supunere față de Dumnezeu.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Apoi neprihănirea Lui înseamnă și se referă la neprihănirea Lui Dumnezeu care este starea de sfințenie și curăție pe care Dumnezeu o cere, dar și prin neprihănirea pe care El o dă prin Isus Hristos (în 2 Corinteni 5:21 Dumnezeu ne spune că L-a făcut păcat pe Isus care era fără păcat pentru noi, ca noi să fim neprihănirea Lui Dumnezeu în El).
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Iar dacă noi înfăptuim aceste lucruri, Dumnezeu ne promite că ne va da pe deasupra nevoile lumești: mâncare, băutură, îmbrăcăminte, locuință, protecție, direcție, viziune, îndrumare, loc de muncă – toate lucrurile pe care tu ți le dorești.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Apoi, în altă parte Dumnezeu ne spune în acest verset: „Duceți-vă în toată lumea și propovăduiți Evanghelia la orice făptură.” (Marcu 16:15)
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Isus ne dă această poruncă după ce a înviat, să ne ducem în toată lumea și să spunem și să ducem vestea cea bună a mântuirii prin Isus Hristos, Mântuitorul și Salvatorul acestei lumi.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Acest site nu este altceva decât un răspuns al copilului Lui Dumnezeu, Emanuel – un tânăr creștin din România – la chemarea de mai sus. Doresc ca toată Slava și Lauda să fie a Lui Dumnezeu Tatăl, Isus și Duhul Sfânt.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 }, mb: 2 }}>
            Dumnezeu să vă ajute tuturor să răspundeți la această chemare și să punem înainte de orice voia Lui Dumnezeu. Dumnezeu să vă binecuvânteze pe toți în toate lucrurile, întotdeauna. Doamne ajută.
          </Typography>
          <Typography sx={{ color: "#3e2f1c", opacity: 0.95, fontSize: { xs: 15.5, md: 17 }, lineHeight: { xs: 1.75, md: 1.85 } }}>
            <b>Cu smerenie,</b>
            <br />
            Emanuel
          </Typography>
        </CardContent>
      </Card>

      {/* Cum te poți implica — fundal albastru deschis + carduri „tricolor” discret, cu icon + hover */}
      <Box
        sx={{
          mb: { xs: 4, md: 6 },
          background: "linear-gradient(180deg, #f3f8ff 0%, #eef6ff 100%)",
          border: "1px solid #e1ecff",
          borderRadius: 3,
          boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 20, md: 24 },
            mb: { xs: 1.5, md: 2 },
            textAlign: "center",
            color: "#0b3a6f",
          }}
        >
          Cum te poți implica?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {/* Roagă-te — albastru */}
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)",
              color: "white",
              border: "1px solid #64b5f6",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 22px rgba(0,0,0,0.12)" },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 0.75 }}>
                <Box
                  role="img"
                  aria-label="Mâini în rugăciune"
                  sx={{
                    width: 40, height: 40, borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: 22, lineHeight: 1,
                  }}
                >
                  🙏
                </Box>
                <Typography variant="h6" fontWeight={800}>Roagă-te</Typography>
              </Stack>
              <Typography sx={{ opacity: 0.95 }}>Roagă-te pentru cei în suferință.</Typography>
            </CardContent>
          </Card>

          {/* Oferă ajutor — galben */}
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
              color: "#4a3b00",
              border: "1px solid #ffe082",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 22px rgba(0,0,0,0.12)" },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 0.75 }}>
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  <VolunteerActivismIcon />
                </Box>
                <Typography variant="h6" fontWeight={800}>Oferă ajutor</Typography>
              </Stack>
              <Typography sx={{ opacity: 0.9 }}>
                Implică-te practic: cumpărături, vizite, transport, consiliere, donații.
              </Typography>
            </CardContent>
          </Card>

          {/* Împarte mai departe — roșu */}
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
              color: "#5a1a1a",
              border: "1px solid #ef9a9a",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 22px rgba(0,0,0,0.12)" },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 0.75 }}>
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  <ShareRoundedIcon />
                </Box>
                <Typography variant="h6" fontWeight={800}>Împarte mai departe</Typography>
              </Stack>
              <Typography sx={{ opacity: 0.9 }}>
                Distribuie proiectul prietenilor tăi, poate chiar cineva apropiat are nevoie.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* NEWSLETTER — design tip „ziar” (UI only) */}
      <Box
        sx={{
          mb: { xs: 4, md: 6 },
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          border: "1px solid #d9d4cb",
          boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
          // „textură ziar”: hârtie ușor gălbuie + linii foarte fine
          background: `
            linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)),
            repeating-linear-gradient(
              0deg,
              #f7f4ee,
              #f7f4ee 24px,
              #f0ece4 25px,
              #f0ece4 26px
            )
          `,
        }}
      >
        {/* Antet ca într-un ziar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: { xs: 1.5, md: 2 },
            borderBottom: "1px solid #d9d4cb",
            pb: 1,
          }}
        >
          <MailOutlineIcon />
          <Typography
            component="h3"
            sx={{
              fontFamily: '"Raleway", Helvetica, sans-serif',
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontWeight: 800,
              fontSize: { xs: 18, md: 20 },
            }}
          >
            Abonează-te la newsletter
          </Typography>
        </Box>

        <Typography
          sx={{
            opacity: 0.9,
            fontSize: { xs: 14.5, md: 15.5 },
            lineHeight: 1.75,
            mb: { xs: 2, md: 2.5 },
            maxWidth: 900,
          }}
        >
          Primește noutăți, îndemnuri, rugăciuni și proiecte de slujire direct pe e-mail.
          Fără spam. Te poți dezabona oricând.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ maxWidth: 720 }}
        >
          <TextField
            fullWidth
            placeholder="Numele tău"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />
          <TextField
            fullWidth
            type="email"
            placeholder="Adresa de e-mail"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />
          <Button
            variant="contained"
            sx={{
              minWidth: { xs: "100%", sm: 160 },
              borderRadius: 2,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              background:
                "linear-gradient(90deg, #0b3a6f 0%, #082c54 100%)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #0d488b 0%, #0a376a 100%)",
              },
            }}
            // onClick={() => {/* viitor: conectăm la backend/Firebase */}}
          >
            Abonează-mă
          </Button>
        </Stack>

        <Typography
          variant="caption"
          sx={{ display: "block", mt: 1.5, opacity: 0.7 }}
        >
          Prin abonare ești de acord cu prelucrarea datelor conform politicii de confidențialitate.
        </Typography>
      </Box>
    </Container>
  );
}
