import type { ProjectRes } from "./api/models";

export const getProjectById = (
  projects: ProjectRes[],
  projectId: string | null,
): ProjectRes | null => {
  if (!projects || !projectId) return null;

  const filtered = projects.filter((project) => project.id === projectId);

  if (filtered.length === 0) return null;
  return filtered[0];
};

export const generateSelectData = (projects: ProjectRes[]) => {
  return projects.map((project) => ({
    label: project.name,
    value: project.id,
  }));
};

export const markdownWordWrap = (text: string, maxWidth = 80) => {
  const lines = text.split("\n");
  const wrappedLines = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // ignore headings, code blocks, list items, or empty lines
    // ie. we only care about paragraphs
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("```") ||
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ") ||
      trimmed.startsWith(">") ||
      trimmed.match(/^(\d+\.)\s+/) || // numbered list
      trimmed === "" // two \n\n chars back-to-back
    ) {
      wrappedLines.push(line);
      continue;
    }

    // Wrap regular paragraph text
    const words = line.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + " " + word).trim().length <= maxWidth) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine.length > 0) {
          wrappedLines.push(currentLine);
        }
        currentLine = word;
      }
    }

    if (currentLine.length > 0) {
      wrappedLines.push(currentLine);
    }
  }

  return wrappedLines.join("\n");
};
