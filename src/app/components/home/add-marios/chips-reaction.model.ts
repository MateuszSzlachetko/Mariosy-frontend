export class ChipsReactions {
  public chips: Reaction[] = [
    { name: 'Thank you', iconSrc: 'assets/icons/reaction/star-green.svg' },
    { name: 'Impressive', iconSrc: 'assets/icons/reaction/star-blue.svg' },
    { name: 'Exceptional', iconSrc: 'assets/icons/reaction/star-orange.svg' },
    { name: 'Good job', iconSrc: 'assets/icons/reaction/star-purple.svg' },
    { name: 'WOW!', iconSrc: 'assets/icons/reaction/star-yellow.svg' },
    { name: "I'm proud", iconSrc: 'assets/icons/reaction/star-pink.svg' },
  ];
}

export interface Reaction {
  name: string;
  iconSrc: string;
}
