import { track } from './journey.js?v=16';

export function openTimeWeave(context) {
  track('timeweave_click', { source: context.source, personaId: context.personaId, clanId: context.clanId, journeyId: context.journeyId });
  return { mode: 'mock', message: 'TimeWeave / TimeTag 接口尚未接入。当前页面的窑格旅程只在本次打开期间有效。' };
}
