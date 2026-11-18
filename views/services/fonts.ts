import { Lato } from 'next/font/google';

/** Figma sets the /services panel and /services/[slug] capability-card titles in Lato SemiBold, a weight Google Fonts
 * doesn't ship; Bold is the nearest available cut. One loader, shared by both pages. */
export const lato = Lato({ subsets: ['latin'], weight: ['700'], display: 'swap' });
