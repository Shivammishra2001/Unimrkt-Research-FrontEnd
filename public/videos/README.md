# Drop-in videos

Files here are picked up automatically — no code or CMS change. Each name takes
an `.mp4` (H.264 — required for Safari/iOS) and optionally a smaller `.webm`
(tried first):

| File name                                     | Where it plays                                              |
| --------------------------------------------- | ----------------------------------------------------------- |
| `0_Lighthouse_Light_1920x1080.mp4` / `.webm` (Figma's file name), or `hero-background.mp4` / `.webm` | Home hero backdrop (lighthouse) — the Figma name wins if both exist |
| `6012918_People_Person_1920x1080.mp4` / `.webm` (Figma's file name), or `about-banner.mp4` / `.webm` | "Global Research, Local Understanding" banner (1227x571, 4px radius, 80% over the maroon→coral gradient) |
| `2535858_Wave_Background_1920x1080.mp4` / `.webm` (Figma's file name) | Home "500+ Advanced CATI Workstations" wave texture (10% opacity, luminosity blend; `/figma-home/cati-wave.png` is the poster) |

## Hero background video

The home hero (`views/sections/HeroView.tsx` → `HeroSplash.tsx`) picks these up
automatically — no code or CMS change. It plays `autoPlay loop muted playsInline`
as a full-bleed `object-cover` layer at 70% opacity under a `#010913` 40% wash (Figma 1794:16926–16930); the CMS hero photo is used as the poster
frame and as the fallback when no video is present (or the visitor prefers
reduced motion). Keep it silent, ~1920x1080, under ~8 MB.

Alternative: upload a video to the block's `media` field in Strapi admin
(Home → the hero block → media). A file in this folder takes priority over the CMS one.

## About banner

Same rules: `loop muted playsInline`, no controls. Export it 16:9 (1920x1080) like the
Figma source: it is framed exactly as Figma layer 267:1482 (scaled to 1465x824 inside the
1227x571 frame, offset 196px left / 56px up). The block's CMS image (already cropped to that
framing) shows until the first frame plays, and stays for reduced motion.
