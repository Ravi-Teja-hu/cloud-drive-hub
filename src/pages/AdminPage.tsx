import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import adminPhoto from "@/assets/admin-photo.png";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Meet the <span className="text-primary">Administrator</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Admin Photo - 4:6 ratio */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[320px] aspect-[4/6] overflow-hidden rounded-2xl shadow-2xl border-4 border-primary/20">
                <img 
                  src={adminPhoto} 
                  alt="CloudDrive Administrator" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            {/* Admin Information */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  About Me
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  I am the administrator of CloudDrive, responsible for managing the platform's infrastructure, security, and content quality. With a strong background in Cloud Computing, DevOps, and Linux, I ensure that the platform remains reliable, scalable, and secure for all users.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  My Role
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  My role includes overseeing file uploads and downloads, maintaining system performance, implementing access controls, and continuously improving the platform to deliver a seamless user experience. I am committed to maintaining a well-organized and trustworthy repository of technical resources for the community.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  CloudDrive is built to encourage knowledge sharing, and I actively work to ensure that all content hosted on the platform meets usability and security standards while remaining easily accessible to registered users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default AdminPage;
