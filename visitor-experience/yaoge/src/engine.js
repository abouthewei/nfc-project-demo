import { clans, dimensions, firePoints, hiddenPersonas, missions, personas, questions, routeModes, routePreferences, tieBreakers } from './data.js';

export function calculateDimensions(answers) {
  const raw = Object.fromEntries(dimensions.map((dimension) => [dimension.id, 0]));
  for (const question of questions) {
    const answerId = answers?.[question.id];
    const answer = question.options.find((option) => option.id === answerId);
    if (!answer) continue;
    question.pair.forEach((dimensionId, index) => { raw[dimensionId] += answer.scores[index]; });
  }
  return Object.fromEntries(dimensions.map((dimension) => {
    const value = Math.max(-10, Math.min(10, raw[dimension.id]));
    return [dimension.id, { raw: value, score: (value + 10) * 5 }];
  }));
}

export function personaDistances(scores) {
  return personas.map((persona) => {
    const distance = Math.sqrt(dimensions.reduce((total, dimension) => {
      const score = scores?.[dimension.id]?.score ?? 50;
      return total + (score - persona.center[dimension.id]) ** 2;
    }, 0));
    return { personaId: persona.id, distance };
  }).sort((a, b) => a.distance - b.distance || a.personaId.localeCompare(b.personaId));
}

function conditionsPass(conditions, scores) {
  return conditions.every(({ dimension, operator, value }) => {
    const score = scores?.[dimension]?.score ?? 50;
    return ({'>': score > value, '>=': score >= value, '<': score < value, '<=': score <= value, '==': score === value})[operator] ?? false;
  });
}

export function detectHiddenPersona(scores, answers) {
  const value = Object.fromEntries(dimensions.map(({ id }) => [id, scores?.[id]?.score ?? 50]));
  const dragon = hiddenPersonas.find((persona) => persona.id === 'dragonWomb');
  if (value.F === 100 && value.N >= 80 && value.C <= 40 && answers?.[dragon.specialAnswer.questionId] === dragon.specialAnswer.answerId) return dragon;
  const fireGod = hiddenPersonas.find((persona) => persona.id === 'fireGod');
  if (value.F === 100 && value.C === 100) return fireGod;
  const kiln = hiddenPersonas.find((persona) => persona.id === 'southwindKiln');
  if (dimensions.every(({ id }) => value[id] >= 40 && value[id] <= 60)) return kiln;
  return null;
}

export function arbitratePersonas(topIds, scores) {
  for (const rule of tieBreakers) {
    if (!rule.ids.every((id) => topIds.includes(id))) continue;
    if (rule.alternate && conditionsPass(rule.alternate.conditions, scores)) {
      return { personaId: rule.alternate.winner, reason: `${rule.note} ${rule.alternate.winner} 条件命中。`, rule };
    }
    if (conditionsPass(rule.conditions, scores)) return { personaId: rule.winner, reason: rule.note, rule };
    if (rule.ids.length === 2) return { personaId: rule.ids.find((id) => id !== rule.winner), reason: rule.note, rule };
  }
  return { personaId: topIds[0], reason: '综合六维距离后选择最近的人格中心。', rule: null };
}

export function matchPersona(scores, answers = {}) {
  const hiddenPersona = detectHiddenPersona(scores, answers);
  if (hiddenPersona) return { persona: hiddenPersona, hiddenPersona, ranking: [], topPersonaId: hiddenPersona.id, secondPersonaId: null, tieReason: '先检查隐藏人格条件。' };
  const ranking = personaDistances(scores);
  const top = ranking[0];
  const second = ranking[1];
  const gap = second ? second.distance - top.distance : Infinity;
  const result = gap >= 12
    ? { personaId: top.personaId, reason: `最近中心领先 ${gap.toFixed(1)}，直接采用。`, rule: null }
    : arbitratePersonas([top.personaId, second?.personaId].filter(Boolean), scores);
  const persona = personas.find(({ id }) => id === result.personaId) || personas.find(({ id }) => id === top.personaId);
  return { persona, hiddenPersona: null, ranking, topPersonaId: top.personaId, secondPersonaId: second?.personaId ?? null, gap, tieReason: result.reason };
}

export function resolveClan(personaId) {
  const persona = personas.find((item) => item.id === personaId);
  return persona ? clans[persona.clanId] : clans.kiln;
}

export function getRouteTasks(personaId, modeId = 'light') {
  const persona = personas.find((item) => item.id === personaId) || personas[0];
  const mode = routeModes.find((item) => item.id === modeId) || routeModes[0];
  const pointOrder = routePreferences[persona.id] || routePreferences.fireWatcher;
  return pointOrder.slice(0, mode.count).map((pointId) => {
    const options = missions.filter((mission) => mission.firePointId === pointId);
    const score = (mission) => (mission.personaAffinity.includes(persona.id) ? 4 : 0) + (mission.clanAffinity.includes(persona.clanId) ? 2 : 0);
    return options.slice().sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id))[0];
  }).filter(Boolean);
}

export function getFirePoint(id) {
  return firePoints.find((point) => point.id === id) || firePoints[0];
}

export function getMission(id) {
  return missions.find((mission) => mission.id === id) || null;
}
