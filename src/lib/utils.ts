import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPreviewUrl(url: string | undefined): string {
  if (!url) return '';
  // 本地开发时，如果图片 URL 是线上域名，替换为本地后端 URL 使得能顺利预览
  if (import.meta.env.VITE_IS_LOCAL_DEV === "true" && url.includes(import.meta.env.VITE_API_BASE_URL)) {
    return url.replace(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_API_BASE_URL_LOCAL);
  }
  return url;
}
