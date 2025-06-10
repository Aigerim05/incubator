import { v4 as uuidv4 } from 'uuid';

export function generatePlayerId(): string {
  return uuidv4();
}
