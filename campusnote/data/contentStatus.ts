import fs from "fs";
import path from "path";

export type ContentStatus = "available" | "coming-soon";

export type ResourceFileLike = {
  title: string;
  file: string;
};

export type ResourceLike = {
  title: string;
  size: string;
  file: string;
  files?: ResourceFileLike[];
};

const getPublicPath = (publicPath: string) => {
  const cleanPath = publicPath.startsWith("/")
    ? publicPath.slice(1)
    : publicPath;

  return path.join(process.cwd(), "public", cleanPath);
};

export const publicFileExists = (publicPath: string): boolean => {
  try {
    return fs.existsSync(getPublicPath(publicPath));
  } catch {
    return false;
  }
};

export const publicFolderHasHtmlFiles = (folderPath: string): boolean => {
  try {
    const fullFolderPath = getPublicPath(folderPath);

    if (!fs.existsSync(fullFolderPath)) {
      return false;
    }

    const files = fs.readdirSync(fullFolderPath);

    return files.some((file) => file.toLowerCase().endsWith(".html"));
  } catch {
    return false;
  }
};

export const getHtmlFilesFromPublicFolder = (
  folderPath: string
): ResourceFileLike[] => {
  try {
    const fullFolderPath = getPublicPath(folderPath);

    if (!fs.existsSync(fullFolderPath)) {
      return [];
    }

    return fs
      .readdirSync(fullFolderPath)
      .filter((file) => file.toLowerCase().endsWith(".html"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => {
        const title = file
          .replace(".html", "")
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          title,
          file: `${folderPath}/${file}`,
        };
      });
  } catch {
    return [];
  }
};

export const isBundleContentAvailable = (
  resources: ResourceLike[]
): boolean => {
  const notesResource = resources.find(
    (resource) => resource.title.toLowerCase() === "notes"
  );

  if (!notesResource) {
    return false;
  }

  return publicFolderHasHtmlFiles(notesResource.file);
};

export const getContentStatusFromResources = (
  resources: ResourceLike[]
): ContentStatus => {
  return isBundleContentAvailable(resources) ? "available" : "coming-soon";
};