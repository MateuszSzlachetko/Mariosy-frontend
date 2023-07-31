export interface Marios {
  externalId: string;
  characterName: string;
  comment: string;
  author: string;
  receivers: string[];
}

export interface Mariosy {
  mariosy: Marios[];
  count: number;
}
