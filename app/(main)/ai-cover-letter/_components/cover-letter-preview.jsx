"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const CoverLetterPreview = ({ content }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-4">
      {mounted ? (
        <MDEditor value={content} preview="preview" height={700} />
      ) : (
        <div className="h-[700px] w-full rounded-lg bg-white/5" />
      )}
    </div>
  );
};

export default CoverLetterPreview;