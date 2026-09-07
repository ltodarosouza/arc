import { describe, expect, it } from 'vitest';
import { normalizeProfileName, profileNameError } from './profile';

describe('private display name', () => {
  it('preserves multilingual names and normalizes spaces', () => {
    expect(normalizeProfileName('  Ana   D’Ávila  ')).toBe('Ana D’Ávila');
    expect(profileNameError('李 明')).toBeNull();
    expect(profileNameError('A😀')).toBeNull();
  });
  it('rejects empty, long and unsafe control characters', () => {
    for (const name of [
      '   ',
      'a'.repeat(61),
      'Ana\nMaria',
      '<script>',
      'A\u0085B',
    ])
      expect(profileNameError(name)).not.toBeNull();
    expect(profileNameError('😀'.repeat(60))).toBeNull();
  });
});
