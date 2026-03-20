/**
 * Image Management System - Validation Utilities
 * 
 * This file provides helper functions to ensure proper image usage
 * and enforce the centralized image management system.
 */

import { IMAGES } from "../constants/images";

/**
 * Validates that an image path is registered in the IMAGES constant
 * Use this in development to catch hardcoded paths
 * 
 * @param path - The image path to validate
 * @returns boolean - Whether the path is valid
 */
export function isValidImagePath(path: string): boolean {
  // Convert IMAGES object to flat array of all paths
  const validPaths = getAllImagePaths();
  return validPaths.includes(path);
}

/**
 * Gets all registered image paths from the IMAGES constant
 * Useful for debugging and validation
 * 
 * @returns string[] - Array of all valid image paths
 */
export function getAllImagePaths(): string[] {
  const paths: string[] = [];
  
  function extractPaths(obj: any, prefix = ""): void {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "string") {
        paths.push(value);
      } else if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === "string") {
              paths.push(item);
            }
          });
        } else {
          extractPaths(value, `${prefix}${key}.`);
        }
      }
    }
  }
  
  extractPaths(IMAGES);
  return paths;
}

/**
 * Checks if a path is a hardcoded external URL
 * Use this to detect violations of the image management system
 * 
 * @param path - The path to check
 * @returns boolean - Whether the path is an external URL
 */
export function isExternalUrl(path: string): boolean {
  return path.startsWith("http://") || path.startsWith("https://");
}

/**
 * Validates image path and provides helpful error messages
 * Use this during development to catch common mistakes
 * 
 * @param path - The image path to validate
 * @param context - Optional context for better error messages
 * @throws Error if validation fails
 */
export function validateImagePath(path: string, context?: string): void {
  if (isExternalUrl(path)) {
    throw new Error(
      `❌ INVALID IMAGE PATH: External URLs are not allowed.\n` +
      `   Path: "${path}"\n` +
      `   ${context ? `Context: ${context}\n` : ""}` +
      `   ✅ Solution: Add image to /public/images/ and register in images.ts`
    );
  }
  
  if (!path.startsWith("/images/")) {
    throw new Error(
      `❌ INVALID IMAGE PATH: Must start with "/images/"\n` +
      `   Path: "${path}"\n` +
      `   ${context ? `Context: ${context}\n` : ""}` +
      `   ✅ Solution: Ensure path starts with "/images/"`
    );
  }
  
  if (!isValidImagePath(path)) {
    console.warn(
      `⚠️  WARNING: Image path not found in IMAGES constant.\n` +
      `   Path: "${path}"\n` +
      `   ${context ? `Context: ${context}\n` : ""}` +
      `   This might be a new image that hasn't been registered yet.\n` +
      `   ✅ Solution: Add to /src/app/constants/images.ts`
    );
  }
}

/**
 * Development helper to find which constant corresponds to a path
 * Useful when refactoring or debugging
 * 
 * @param path - The image path to search for
 * @returns string | null - The constant path (e.g., "IMAGES.hero.main") or null
 */
export function findImageConstant(path: string): string | null {
  function search(obj: any, currentPath = "IMAGES"): string | null {
    for (const key in obj) {
      const value = obj[key];
      const newPath = `${currentPath}.${key}`;
      
      if (typeof value === "string" && value === path) {
        return newPath;
      } else if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          const index = value.indexOf(path);
          if (index !== -1) {
            return `${newPath}[${index}]`;
          }
        } else {
          const result = search(value, newPath);
          if (result) return result;
        }
      }
    }
    return null;
  }
  
  return search(IMAGES);
}

/**
 * Statistics about registered images
 * Useful for project overview and documentation
 */
export function getImageStats() {
  const allPaths = getAllImagePaths();
  const categories: Record<string, number> = {};
  
  allPaths.forEach((path) => {
    const match = path.match(/^\/images\/([^\/]+)\//);
    if (match) {
      const category = match[1];
      categories[category] = (categories[category] || 0) + 1;
    }
  });
  
  return {
    total: allPaths.length,
    categories,
    placeholders: allPaths.filter((p) => p.includes("placehold")).length,
    external: allPaths.filter((p) => isExternalUrl(p)).length,
  };
}

/**
 * Type guard to check if a value is a valid image constant reference
 * Use with TypeScript for compile-time safety
 */
export function isImageConstant(value: unknown): value is string {
  return typeof value === "string" && isValidImagePath(value);
}

// Development-only logging
if (process.env.NODE_ENV === "development") {
  // Log image statistics on module load
  const stats = getImageStats();
  console.log("📊 Image Management System Stats:", stats);
  
  // Warn about external URLs in production
  if (stats.external > 0) {
    console.warn(
      `⚠️  Found ${stats.external} external image URLs.\n` +
      `   These should be replaced with local images for production.`
    );
  }
  
  // Info about placeholders
  if (stats.placeholders > 0) {
    console.info(
      `ℹ️  Found ${stats.placeholders} placeholder images.\n` +
      `   Replace these with actual wedding photography.`
    );
  }
}

/**
 * Example usage in components:
 * 
 * ```tsx
 * import { IMAGES } from "../constants/images";
 * import { validateImagePath } from "../utils/imageValidator";
 * 
 * function MyComponent() {
 *   // In development, validate the path
 *   if (process.env.NODE_ENV === "development") {
 *     validateImagePath(IMAGES.hero.main, "HeroSection");
 *   }
 *   
 *   return <img src={IMAGES.hero.main} alt="Hero" />;
 * }
 * ```
 */
