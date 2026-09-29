import { track } from './journey.js';

export function openTimeWeave(context) {
  track('timeweave_click', { source: context.source, personaId: context.personaId, clanId: context.clanId, journeyId: context.journeyId });
  return { mode: 'mock', message: 'TimeWeave / TimeTag 接口尚未接入。你的窑格旅程已保存在本机，可以继续查看或分享。' };
}
