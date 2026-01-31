import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, Download, FileText, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import cloudHero from "@/assets/cloud-hero.jpg";
import devopsHero from "@/assets/devops-hero.jpg";
import linuxHero from "@/assets/linux-hero.jpg";

const categoryImages: Record<string, string> = {
  cloud: cloudHero,
  devops: devopsHero,
  linux: linuxHero,
};

const categoryLabels: Record<string, string> = {
  cloud: "Cloud Computing",
  devops: "DevOps",
  linux: "Linux",
};

interface Material {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  uploader_name: string | null;
  created_at: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });

  useEffect(() => {
    if (category) {
      fetchMaterials();
    }
  }, [category]);

  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching materials:", error);
    } else {
      setMaterials(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!uploadForm.file || !uploadForm.title) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please provide a title and file.",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = uploadForm.file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("materials")
        .upload(filePath, uploadForm.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("materials")
        .getPublicUrl(filePath);

      // Create material record
      const { error: insertError } = await supabase.from("materials").insert({
        title: uploadForm.title,
        description: uploadForm.description,
        category: category,
        file_url: urlData.publicUrl,
        file_name: uploadForm.file.name,
        file_size: uploadForm.file.size,
        uploaded_by: user.id,
        uploader_name: user.email?.split("@")[0] || "Anonymous",
      });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your material has been uploaded.",
      });
      setShowUpload(false);
      setUploadForm({ title: "", description: "", file: null });
      fetchMaterials();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (material: Material) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (material.file_url) {
      window.open(material.file_url, "_blank");
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!category || !categoryLabels[category]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Category not found
          </h1>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1
            className={`text-4xl font-bold category-${category}`}
            style={{ color: `hsl(var(--${category}))` }}
          >
            {categoryLabels[category]}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {materials.length} materials available
          </p>
          <Button
            onClick={() => (user ? setShowUpload(!showUpload) : navigate("/auth"))}
            className="gap-2"
            style={{
              backgroundColor: `hsl(var(--${category}))`,
              color: `hsl(var(--background))`,
            }}
          >
            <Upload className="w-4 h-4" />
            Upload Material
          </Button>
        </div>

        {/* Upload Form */}
        {showUpload && (
          <form
            onSubmit={handleUpload}
            className="glass-card p-6 mb-8 animate-fade-in"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Upload New Material
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, title: e.target.value })
                  }
                  placeholder="Enter material title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File *</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={uploadForm.description}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, description: e.target.value })
                }
                placeholder="Brief description of the material"
                rows={3}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <Button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Materials Grid */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-secondary rounded w-3/4 mb-4" />
                <div className="h-4 bg-secondary rounded w-full mb-2" />
                <div className="h-4 bg-secondary rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No materials yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to upload a {categoryLabels[category]} resource!
            </p>
            <Button
              onClick={() => (user ? setShowUpload(true) : navigate("/auth"))}
            >
              Upload Material
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <div
                key={material.id}
                className={`category-${category} glass-card glow-border p-6 transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `hsl(var(--${category}) / 0.2)` }}
                  >
                    <FileText
                      className="w-6 h-6"
                      style={{ color: `hsl(var(--${category}))` }}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(material)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {material.title}
                </h3>
                {material.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {material.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {material.uploader_name || "Anonymous"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(material.created_at)}
                  </span>
                </div>
                {material.file_size && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatFileSize(material.file_size)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ChatBot />
    </div>
  );
};

export default CategoryPage;
