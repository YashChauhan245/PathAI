// Converts resume entries to ATS-friendly markdown sections used by the resume builder.
export function entriesToMarkdown(entries, type) {
  if (!entries?.length) return "";

  return (
    `## ${type}\n\n` +
    entries
      .map((entry) => {
        const dateRange = entry.current
          ? `${entry.startDate} - Present`
          : `${entry.startDate} - ${entry.endDate}`;

        const description = String(entry.description || "")
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => (line.startsWith("-") || line.startsWith("•") ? line : `- ${line}`))
          .join("\n");

        return [
          `### ${entry.title}`,
          entry.organization,
          dateRange,
          description,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n\n")
  );
}
