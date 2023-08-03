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

export interface MariosPayload {
  characterName: string;
  comment: string;
  title: string;
  authorId: string;
  receiversIds: string[];
}

export interface Mariosy {
  mariosy: Marios[];
  count: number;
}
