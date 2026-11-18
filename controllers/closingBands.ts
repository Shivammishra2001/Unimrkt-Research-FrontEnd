import { cache } from 'react';
import { getGlobal } from './strapi';
import { normalizeGlobal } from './normalize';
import type { ClosingBandsSettings } from '@/models/domain';

/**
 * Global → Blog Band / FAQ Band / Final CTA (the site-wide defaults of the three closing bands). Same Global request
 * the layout already makes (cached per render + tagged 'global'), so this adds no extra fetch. Never throws: if Global
 * can't be loaded, pages fall back to their own override or the built-in copy.
 */
export const getGlobalClosingBands = cache(async (): Promise<ClosingBandsSettings | undefined> => {
  try {
    return normalizeGlobal(await getGlobal()).closingBands;
  } catch {
    return undefined;
  }
});
