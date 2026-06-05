import { describe, expect, it } from 'vitest';

import { getCliBanner } from '../index.js';

describe('cli bootstrap', () => {
  it('exports a CLI banner', () => {
    expect(getCliBanner()).toContain('RainbowCode CLI');
  });
});
