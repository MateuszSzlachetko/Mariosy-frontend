export interface Marios {
  externalId: string;
  characterName: string;
  comment: string;
  author: string;
  authorUsername: string;
  title: string;
  receivers: string[];
  creationDate: Date;
}

export interface Mariosy {
  mariosy: Marios[];
  count: number;
}
