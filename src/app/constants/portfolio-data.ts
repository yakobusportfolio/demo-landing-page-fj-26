/**
 * ========================================
 * PORTFOLIO CLIENT DATA
 * ========================================
 * 
 * Centralized portfolio data for the Portfolio Page.
 * Each client has a cover image and 10-20 gallery images.
 * 
 * Categories:
 * - mini-studio: 8 clients
 * - scan-barcode: 8 clients
 * 
 * Images are referenced from IMAGES.portfolioGallery
 */

import { IMAGES } from "./images";

export type ClientPortfolio = {
  id: string;
  name: string;
  venue: string;
  category: "mini-studio" | "scan-barcode";
  coverImage: string;
  images: readonly string[];
};

export const clientsData: ClientPortfolio[] = [
  // ========================================
  // MINI STUDIO CLIENTS (8)
  // ========================================
  {
    id: "ms-01",
    name: "JASMINE & ABIMANYU",
    venue: "House of Danar Hadi - Solo",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client01.cover,
    images: IMAGES.portfolioGallery.miniStudio.client01.images,
  },
  {
    id: "ms-02",
    name: "VIA & DAVA",
    venue: "Alila Solo",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client02.cover,
    images: IMAGES.portfolioGallery.miniStudio.client02.images,
  },
  {
    id: "ms-03",
    name: "AMARA & DANIEL",
    venue: "The Sunan Hotel",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client03.cover,
    images: IMAGES.portfolioGallery.miniStudio.client03.images,
  },
  {
    id: "ms-04",
    name: "AAN & BELLA",
    venue: "Demak - Jawa Tengah",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client04.cover,
    images: IMAGES.portfolioGallery.miniStudio.client04.images,
  },
  {
    id: "ms-05",
    name: "AURORA & BRYAN",
    venue: "Graha Saba Buana - Solo",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client05.cover,
    images: IMAGES.portfolioGallery.miniStudio.client05.images,
  },
  {
    id: "ms-06",
    name: "DELLA & FARRAS",
    venue: "The Sunan Hotel - Solo",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client06.cover,
    images: IMAGES.portfolioGallery.miniStudio.client06.images,
  },
  {
    id: "ms-07",
    name: "FARRAS & DELLA",
    venue: "The Sunan Hotel - Solo",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client07.cover,
    images: IMAGES.portfolioGallery.miniStudio.client07.images,
  },
  {
    id: "ms-08",
    name: "DELLA & ARCHIKO",
    venue: "Edutorium UMS - Solo",
    category: "mini-studio",
    coverImage: IMAGES.portfolioGallery.miniStudio.client08.cover,
    images: IMAGES.portfolioGallery.miniStudio.client08.images,
  },

  // ========================================
  // SCAN BARCODE CLIENTS (8)
  // ========================================
  {
    id: "sb-01",
    name: "ACHA & DIMAS",
    venue: "Graha Setyowati - Sukoharjo",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client01.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client01.images,
  },
  {
    id: "sb-02",
    name: "AFI & DIMAS",
    venue: "Graha Setyowati - Sukoharjo",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client02.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client02.images,
  },
  {
    id: "sb-03",
    name: "DELLA & FARRAS",
    venue: "The Sunan Hotel - Solo",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client03.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client03.images,
  },
  {
    id: "sb-04",
    name: "DELLANEIRA & ARCHIKO",
    venue: "Edutorium UMS - Solo",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client04.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client04.images,
  },
  {
    id: "sb-05",
    name: "DISA & NARO",
    venue: "Wisma Boga - Solo Baru",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client05.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client05.images,
  },
  {
    id: "sb-06",
    name: "IZUL & DIBA",
    venue: "Grand Mercure Hotel - Solo Baru",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client06.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client06.images,
  },
  {
    id: "sb-07",
    name: "LANTI & TIAN",
    venue: "The Sunan Hotel - Solo",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client07.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client07.images,
  },
  {
    id: "sb-08",
    name: "SYAHRANI & ODITIO",
    venue: "The Sunan Hotel - Solo",
    category: "scan-barcode",
    coverImage: IMAGES.portfolioGallery.scanBarcode.client08.cover,
    images: IMAGES.portfolioGallery.scanBarcode.client08.images,
  },
];
