import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function ShareButtons({ title }: { title: string }) {
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title, text: title, url });
    } else {
      await navigator.clipboard?.writeText(url);
    }
  };

  return (
    <Stack direction="row" spacing={0.5} flexWrap="wrap">
      <Button size="small" onClick={shareNative} startIcon={<ShareIcon />} sx={{ textTransform: "none" }}>
        Distribuie
      </Button>
      <Button size="small" href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" sx={{ minWidth: 0, color: "#16a34a" }} aria-label="Distribuie pe WhatsApp">
        <WhatsAppIcon fontSize="small" />
      </Button>
      <Button size="small" href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" sx={{ minWidth: 0, color: "#0284c7" }} aria-label="Distribuie pe Telegram">
        <TelegramIcon fontSize="small" />
      </Button>
      <Button size="small" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" sx={{ minWidth: 0, color: "#2563eb" }} aria-label="Distribuie pe Facebook">
        <FacebookIcon fontSize="small" />
      </Button>
    </Stack>
  );
}
