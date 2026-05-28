// ============================================================
//  BookBridge Image Registry
//  All images live in artifacts/bookbridge/public/
//
//  HOW TO REPLACE AN IMAGE
//  1. Drop your new .jpeg file into the public/ folder
//  2. Find the section below you want to update
//  3. Change the filename string to your new file's name
//  4. Save — the site updates automatically
//
//  SECTIONS:
//   LOGO           → logo.jpeg
//   HERO CAROUSEL  → hero-1.jpeg … hero-6.jpeg   (6 rotating slides)
//   ABOUT COLLAGE  → about-1.jpeg … about-3.jpeg  (3-photo grid)
//   IMPACT STORIES → impact-1.jpeg … impact-3.jpeg (testimony photos)
//   GALLERY        → gallery-01.jpeg … gallery-23.jpeg (slideshow)
// ============================================================

function img(name: string) {
  return `/${name}`;
}

// ── Logo (top-left of every page) ──────────────────────────
export const LOGO = img('logo.jpeg');

// ── Hero Carousel (6 photos cycling on the home screen) ────
export const heroCarousel = [
  { src: img('hero-1.jpeg') },
  { src: img('hero-2.jpeg') },
  { src: img('hero-3.jpeg') },
  { src: img('hero-4.jpeg') },
  { src: img('hero-5.jpeg') },
  { src: img('hero-6.jpeg') },
];

// ── About / Our Mission (3-photo collage on the right side) ─
export const aboutImages = [
  img('about-1.jpeg'),   // tall left image
  img('about-2.jpeg'),   // top right image
  img('about-3.jpeg'),   // bottom right image
];

// ── Impact Stories / Testimonials (one photo per card) ──────
//    impact-1 = student card
//    impact-2 = volunteer card
//    impact-3 = donor card
export const impactImages = [
  img('impact-1.jpeg'),
  img('impact-2.jpeg'),
  img('impact-3.jpeg'),
];

// ── Gallery Slideshow (all 23 photos) ───────────────────────
export const galleryImages = [
  img('gallery-01.jpeg'),
  img('gallery-02.jpeg'),
  img('gallery-03.jpeg'),
  img('gallery-04.jpeg'),
  img('gallery-05.jpeg'),
  img('gallery-06.jpeg'),
  img('gallery-07.jpeg'),
  img('gallery-08.jpeg'),
  img('gallery-09.jpeg'),
  img('gallery-10.jpeg'),
  img('gallery-11.jpeg'),
  img('gallery-12.jpeg'),
  img('gallery-13.jpeg'),
  img('gallery-14.jpeg'),
  img('gallery-15.jpeg'),
  img('gallery-16.jpeg'),
  img('gallery-17.jpeg'),
  img('gallery-18.jpeg'),
  img('gallery-19.jpeg'),
  img('gallery-20.jpeg'),
  img('gallery-21.jpeg'),
  img('gallery-22.jpeg'),
  img('gallery-23.jpeg'),
];
