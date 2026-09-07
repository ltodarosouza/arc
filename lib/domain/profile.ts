export const PROFILE_NAME_MAX_LENGTH = 60;

export function normalizeProfileName(value: string): string {
  return value.trim().replace(/ +/g, ' ');
}

export function profileNameError(value: string): string | null {
  const name = normalizeProfileName(value);
  if (!name) return 'Digite como você quer ser chamado.';
  if ([...name].length > PROFILE_NAME_MAX_LENGTH)
    return 'Use no máximo 60 caracteres.';
  if (/[\u0000-\u001f\u007f-\u009f<>]/u.test(name))
    return 'Não use quebras de linha, caracteres de controle ou os sinais < e >.';
  return null;
}
