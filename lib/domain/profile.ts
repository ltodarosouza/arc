export const PROFILE_NAME_MAX_LENGTH = 60;

export function normalizeProfileName(value: string): string {
  return value.trim().replace(/ +/g, ' ');
}

export function profileNameError(value: string): string | null {
  const name = normalizeProfileName(value);
  if (!name) return 'Digite como você quer ser chamado.';
  let length = 0;
  for (const character of name) {
    length += 1;
    const code = character.codePointAt(0) ?? 0;
    if (
      code < 32 ||
      (code >= 127 && code <= 159) ||
      character === '<' ||
      character === '>'
    )
      return 'Não use quebras de linha, caracteres de controle ou os sinais < e >.';
  }
  if (length > PROFILE_NAME_MAX_LENGTH) return 'Use no máximo 60 caracteres.';
  return null;
}
