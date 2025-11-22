import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import SvgIcon from "@mui/material/SvgIcon";

function TikTokIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 256 256">
      <path
        d="M112 0h34c2 25 14 46 36 59 9 5 20 8 31 8v34c-15 1-29-3-42-10v83a82 82 0 1 1-59-79v35a46 46 0 1 0 25 42V0Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}




export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 4,
        color: "white",
        background: "linear-gradient(180deg, #0b3a6f 0%, #082c54 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography
            variant="subtitle1"
            sx={{
              opacity: 0.95,
              fontFamily: '"Raleway", Helvetica, sans-serif',
              textTransform: "uppercase",
            }}
          >
            Dumnezeu este cu noi — Matei 1:23
          </Typography>

          {/* Social icons */}
          <Stack direction="row" spacing={1.5}>
            {[
              {
                icon: <FacebookIcon fontSize="inherit" />,
                url: "https://www.facebook.com/dumnezeuestecunoi.2025/",
                hover: "linear-gradient(45deg, #1877F2, #00aaff)",
              },
              {
                icon: <YouTubeIcon fontSize="inherit" />,
                url: "https://www.youtube.com/@DumnezeuEsteCuNoi-z8",
                hover: "linear-gradient(45deg, #FF0000, #cc0000)",
              },
              {
                icon: <InstagramIcon fontSize="inherit" />,
                url: "https://www.instagram.com/dumnezeuestecunoi/",
                hover:
                  "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              },
              {
                icon: <EmailIcon fontSize="inherit" />,
                url: "mailto:dumnezeuestecunoi@uetcompany.ro",
                hover: "linear-gradient(45deg, #00c6ff, #0072ff)",
              },
            ].map(({ icon, url, hover }, i) => (
              <IconButton
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 40,
                  height: 40,
                  color: "white",
                  fontSize: 24, // dimensiune uniformă
                  transition: "all .3s ease",
                  "&:hover": {
                    background: hover,
                    color: "white",
                  },
                }}
              >
                {icon}
              </IconButton>
            ))}

            {/* TikTok */}
            <IconButton
              aria-label="TikTok"
              href="https://www.tiktok.com/@dumnezeuestecunoi25"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 40,
                height: 40,
                color: "white",
                fontSize: 24, // aceeași mărime
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(45deg, #25F4EE, #FE2C55)",
                  color: "white",
                },
              }}
            >
              <TikTokIcon fontSize="inherit" />
            </IconButton>
          </Stack>

          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            © 2025 cu sprijinul{" "}
            <a
              href="https://uetcompany.ro"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              UET Company
            </a>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}