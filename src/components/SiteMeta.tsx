import { useEffect } from "react";

export default function SiteMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Dumnezeu este cu noi`;
    const existing = document.querySelector('meta[name="description"]');
    const meta = existing || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", description);
    if (!existing) document.head.appendChild(meta);
  }, [title, description]);
  return null;
}
