const MIN_LENGTH = 8;
const REQUIRES_UPPERCASE = true;
const REQUIRES_LOWERCASE = true;
const REQUIRES_NUMBER = true;
const REQUIRES_SPECIAL = true;

export function validatePassword(password: string): string | null {
  if (password.length < MIN_LENGTH) {
    return `La password deve contenere almeno ${MIN_LENGTH} caratteri`;
  }

  if (REQUIRES_UPPERCASE && !/[A-Z]/.test(password)) {
    return 'La password deve contenere almeno una lettera maiuscola';
  }

  if (REQUIRES_LOWERCASE && !/[a-z]/.test(password)) {
    return 'La password deve contenere almeno una lettera minuscola';
  }

  if (REQUIRES_NUMBER && !/\d/.test(password)) {
    return 'La password deve contenere almeno un numero';
  }

  if (REQUIRES_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'La password deve contenere almeno un carattere speciale';
  }

  return null;
}