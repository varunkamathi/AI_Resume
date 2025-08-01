import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "../lib/Puter";
import ScoreCircle from "~/components/ScoreCircle";

interface ResumeCardProps {
  resume: Resume;
}

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: ResumeCardProps) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    let url: string;

    const loadImage = async () => {
      try {
        const blob = await fs.read(imagePath);
        if (!blob) return;
        url = URL.createObjectURL(blob);
        setResumeUrl(url);
      } catch (error) {
        console.error("Failed to load resume preview:", error);
      }
    };

    loadImage();

    return () => {
      if (url) URL.revokeObjectURL(url); // Clean up object URL
    };
  }, [fs, imagePath]);

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2 overflow-hidden">
          {companyName ? (
            <h2 className="text-black font-bold break-words">{companyName}</h2>
          ) : (
            <h2 className="text-black font-bold">Resume</h2>
          )}
          {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
        </div>
        {feedback?.overallScore !== undefined && (
          <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore} />
          </div>
        )}
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000 mt-4">
          <img
            src={resumeUrl}
            alt={`Resume preview for ${companyName || "unknown company"}`}
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-md"
          />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
