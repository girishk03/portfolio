import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PowerTheftDetection = () => {
  const navigate = useNavigate();

  const goBackToProjects = () => {
    navigate("/");
    window.setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button variant="heroOutline" size="sm" onClick={goBackToProjects}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="h-[100dvh] w-full">
        <iframe title="Power Theft Detection System" src="/smad/index.html" className="h-full w-full border-0" />
      </div>
    </div>
  );
};

export default PowerTheftDetection;
