/**
 * Normalize resume content into ATS-friendly plain text.
 * Keeps the content single-column, removes decorative markup, and preserves meaning.
 */
export function optimizeForATS(content) {
  let optimized = content;

  if (!optimized || typeof optimized !== "string") {
    return "";
  }

  // Remove HTML blocks and inline tags.
  optimized = optimized.replace(/<[^>]+>/g, "");

  // Remove special characters
  optimized = optimized.replace(/[®™©]/g, "");

  // Normalize bullets
  optimized = optimized.replace(/^[\s]*[-*]/gm, "-");

  // Remove markdown emphasis and links.
  optimized = optimized.replace(/\*\*([^*]+)\*\*/g, "$1");
  optimized = optimized.replace(/\*([^*]+)\*/g, "$1");
  optimized = optimized.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2");

  // Remove table-style pipes and image syntax.
  optimized = optimized.replace(/\|+/g, " ");
  optimized = optimized.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  // Normalize headings to plain text labels.
  optimized = optimized.replace(/^#{1,6}\s*/gm, "");

  // Normalize whitespace
  optimized = optimized.replace(/\n{3,}/g, "\n\n");
  optimized = optimized.replace(/[ \t]+$/gm, "");

  return optimized.trim();
}
