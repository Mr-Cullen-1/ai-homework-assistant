import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFile, validateAnswer, DEMO_MAX_FILE_BYTES } from '../src/logic.js';
import { newSession, getProgress, getDemoReward } from '../src/mock-data.js';

test('supported local files pass; empty, oversized, and unsupported files are rejected', () => {
  assert.equal(validateFile({ name: 'homework.PNG', type: 'image/png', size: 2000 }).ok, true);
  assert.equal(validateFile({ name: 'work.pdf', type: 'application/pdf', size: 2000 }).ok, true);
  assert.equal(validateFile({ name: 'work.txt', type: 'text/plain', size: 2000 }).ok, false);
  assert.equal(validateFile({ name: 'work.jpg', type: 'image/jpeg', size: 0 }).ok, false);
  assert.equal(validateFile({ name: 'work.jpg', type: 'image/jpeg', size: DEMO_MAX_FILE_BYTES + 1 }).ok, false);
});

test('answer checking distinguishes missing, invalid, wrong and correct numeric entries', () => {
  assert.equal(validateAnswer('  ', 5), 'empty');
  assert.equal(validateAnswer('five', 5), 'invalid');
  assert.equal(validateAnswer('4', 5), 'incorrect');
  assert.equal(validateAnswer(' 05 ', 5), 'correct');
});

test('progress and demo rewards are derived from unique completed exercises', () => {
  const session = newSession();
  assert.deepEqual(getProgress(session), { completed: 0, total: 4, percent: 0 });
  session.tasks.a1.status = 'correct';
  assert.deepEqual(getProgress(session), { completed: 1, total: 4, percent: 25 });
  assert.deepEqual(getDemoReward(session), { coins: 10, xp: 5 });
  session.tasks.a1.status = 'correct';
  assert.deepEqual(getDemoReward(session), { coins: 10, xp: 5 });
});
