import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// public pages
import Home from "./pages/Home";
import Needs from "./pages/Needs";
import Invatare from "./pages/Invatare";
import Rugaciune from "./pages/Rugaciune";
import Cantare from "./pages/Cantare";
import Predicare from "./pages/Predicare";
import Marturie from "./pages/Marturie";

// admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminPanel from "./pages/admin/AdminPanel";
import PostsManager from "./pages/admin/PostsManager";
import NeedsManager from "./pages/admin/NeedsManager";
import NewsletterManager from "./pages/admin/NewsletterManager";
import MediaLibrary from "./pages/admin/MediaLibrary";
import ActivityLog from "./pages/admin/ActivityLog";
import AdminStats from "./pages/admin/AdminStats";
import SearchPage from "./pages/SearchPage";
import InfoPage from "./pages/InfoPage";
import PostPage from "./pages/PostPage";
import CookieBanner from "./components/CookieBanner";
import AccessibilityMenu from "./components/AccessibilityMenu";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC SITE */}
        <Route
          path="/*"
          element={
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #dbeafe 0%, #ffffff 40%, #fef8e6 100%)" }}>
              <NavBar />
              <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/c/invatare" element={<Invatare />} />
                  <Route path="/c/rugaciune" element={<Rugaciune />} />
                  <Route path="/c/cantare" element={<Cantare />} />
                  <Route path="/c/predicare" element={<Predicare />} />
                  <Route path="/c/marturie" element={<Marturie />} />
                  <Route path="/nevoi" element={<Needs />} />
                  <Route path="/cautare" element={<SearchPage />} />
                  <Route path="/despre-noi" element={<InfoPage type="about" />} />
                  <Route path="/contact" element={<InfoPage type="contact" />} />
                  <Route path="/politica-de-confidentialitate" element={<InfoPage type="privacy" />} />
                  <Route path="/post/:id/:slug" element={<PostPage />} />
                </Routes>
              </Box>
              <Footer />
              <CookieBanner />
              <AccessibilityMenu />
            </Box>
          }
        />

        {/* ADMIN LOGIN (fără guard) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ADMIN PROTEJAT (după login) */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="statistici" element={<AdminStats />} />
          <Route path="administrare" element={<AdminPanel />} />
          <Route path="administrare/postari" element={<PostsManager />} />
          <Route path="administrare/nevoi" element={<NeedsManager />} />
          <Route path="administrare/newsletter" element={<NewsletterManager />} />
          <Route path="administrare/media" element={<MediaLibrary />} />
          <Route path="administrare/istoric" element={<ActivityLog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
