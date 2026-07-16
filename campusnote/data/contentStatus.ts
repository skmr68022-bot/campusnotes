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

const getPublicFilePath = (filePath: string) => {
  const cleanPath = filePath.startsWith("/")
    ? filePath.slice(1)
    : filePath;

  return path.join(process.cwd(), "public", cleanPath);
};

export const publicFileExists = (filePath: string): boolean => {
  try {
    return fs.existsSync(getPublicFilePath(filePath));
  } catch {
    return false;
  }
};

export const areAllHtmlFilesUploaded = (
  files: ResourceFileLike[] | undefined
): boolean => {
  if (!files || files.length === 0) return false;

  return files.every((item) => publicFileExists(item.file));
};

export const isBundleContentAvailable = (
  resources: ResourceLike[]
): boolean => {
  const notesResource = resources.find(
    (resource) => resource.title.toLowerCase() === "notes"
  );

  if (!notesResource) return false;

  if (notesResource.files && notesResource.files.length > 0) {
    return areAllHtmlFilesUploaded(notesResource.files);
  }

  return publicFileExists(notesResource.file);
};

export const getContentStatusFromResources = (
  resources: ResourceLike[]
): ContentStatus => {
  return isBundleContentAvailable(resources) ? "available" : "coming-soon";
};