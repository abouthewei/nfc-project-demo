import { calculateDimensions, matchPersona } from './engine.js';

const now = () => Date.now();
const makeId = () => globalThis.crypto?.randomUUID?.() || `nf-${now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export function emptyJourney() {
  const timestamp = now();
  return {
    sessionId: makeId(), answers: {}, dimensionScores: null, personaId: null, hiddenPersonaId: null, clanId: null,
    routeMode: 'light', fireSeedCount: 0, testSeedAwarded: false, completedMissionIds: [], visitedFirePointIds: [],
    unlockedStoryIds: [], photos: [], createdAt: timestamp, updatedAt: timestamp, resultDate: null
  };
}

// A journey belongs to this open H5 page only. Reloading or opening a new tab starts fresh.
let journey = emptyJourney();
const listeners = new Set();

function commit(next) {
  journey = { ...next, updatedAt: now() };
  for (const listener of listeners) listener(journey);
  return journey;
}

export const getJourney = () => journey;
export const subscribe = (listener) => { listeners.add(listener); return () => listeners.delete(listener); };
export const updateJourney = (patch) => commit({ ...journey, ...patch });

export function answerQuestion(questionId, answerId) {
  const answers = { ...journey.answers, [questionId]: answerId };
  track('question_answer', { questionId, answerId });
  return commit({ ...journey, answers });
}

export function finishTest() {
  const dimensionScores = calculateDimensions(journey.answers);
  const match = matchPersona(dimensionScores, journey.answers);
  const hidden = match.hiddenPersona;
  const personaId = hidden ? null : match.persona.id;
  const storySeed = hidden ? (hidden.id === 'dragonWomb' ? 'dragon-womb' : hidden.id === 'fireGod' ? 'fire-god' : 'kiln-change') : 'three-day-fire';
  const firstCompletion = !journey.testSeedAwarded;
  commit({
    ...journey, dimensionScores, personaId, hiddenPersonaId: hidden?.id || null,
    clanId: hidden?.clanId || match.persona?.clanId || null,
    fireSeedCount: journey.fireSeedCount + (firstCompletion ? 1 : 0), testSeedAwarded: true,
    unlockedStoryIds: [...new Set([...journey.unlockedStoryIds, storySeed])], resultDate: new Date().toISOString()
  });
  track('test_complete', { personaId, hiddenPersonaId: hidden?.id, clanId: hidden?.clanId || match.persona?.clanId });
  if (firstCompletion) track('fire_seed_earned', { source: 'test' });
  return match;
}

export function awardPointVisit(pointId, storyId) {
  if (journey.visitedFirePointIds.includes(pointId)) return journey;
  commit({ ...journey, visitedFirePointIds: [...journey.visitedFirePointIds, pointId], fireSeedCount: journey.fireSeedCount + 1, unlockedStoryIds: storyId ? [...new Set([...journey.unlockedStoryIds, storyId])] : journey.unlockedStoryIds });
  track('fire_seed_earned', { source: 'fire_point', pointId });
  return journey;
}

export function completeMission(missionId, storyId) {
  if (journey.completedMissionIds.includes(missionId)) return journey;
  commit({ ...journey, completedMissionIds: [...journey.completedMissionIds, missionId], fireSeedCount: journey.fireSeedCount + 1, unlockedStoryIds: storyId ? [...new Set([...journey.unlockedStoryIds, storyId])] : journey.unlockedStoryIds });
  track('mission_complete', { missionId });
  track('fire_seed_earned', { source: 'mission', missionId });
  return journey;
}

export function saveJourneyPhoto(photo) {
  const photos = [...journey.photos.filter((item) => item.firePointId !== photo.firePointId), photo].slice(-3);
  return commit({ ...journey, photos });
}

export function startNewJourney() {
  journey = emptyJourney();
  commit(journey);
  track('yaoge_restart');
  return journey;
}

export function track(eventName, payload = {}) {
  const record = { event: eventName, payload, at: now(), sessionId: journey.sessionId };
  window.dispatchEvent(new CustomEvent('yaoge:track', { detail: record }));
}
