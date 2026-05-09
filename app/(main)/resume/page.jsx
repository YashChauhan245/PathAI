import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import { optimizeForATS } from "@/lib/ats-scoring";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={optimizeForATS(resume?.content || "")} />
    </div>
  );
}