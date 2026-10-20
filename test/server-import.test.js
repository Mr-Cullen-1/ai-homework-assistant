import test from 'node:test';
import assert from 'node:assert/strict';

test('browser entry can be imported without browser globals', async () => {
  assert.equal(typeof document, 'undefined');
  await assert.doesNotReject(import('../src/app.js'));
});
