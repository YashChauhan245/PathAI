import { Card, CardContent } from "@/components/ui/card";

export default function LoadingCoverLetterPage() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 w-72 rounded bg-white/10" />
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="h-10 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
        </CardContent>
      </Card>
    </div>
  );
}
