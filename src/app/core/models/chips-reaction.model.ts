export class ChipsReactions {
  public chips: Reaction[] = [
    {
      name: 'Thank you',
      iconSrc: 'assets/icons/reaction/star-green.svg',
      selected: false,
    },
    {
      name: 'Impressive',
      iconSrc: 'assets/icons/reaction/star-blue.svg',
      selected: false,
    },
    {
      name: 'Exceptional',
      iconSrc: 'assets/icons/reaction/star-orange.svg',
      selected: false,
    },
    {
      name: 'Good job',
      iconSrc: 'assets/icons/reaction/star-purple.svg',
      selected: false,
    },
    {
      name: 'WOW!',
      iconSrc: 'assets/icons/reaction/star-yellow.svg',
      selected: false,
    },
    {
      name: "I'm proud",
      iconSrc: 'assets/icons/reaction/star-pink.svg',
      selected: false,
    },
  ];

  getSrc(name: string) {
    const reactionSrc = this.chips.find((reaction) => reaction.name === name);

    if (reactionSrc == null) return '';

    return reactionSrc.iconSrc;
  }
}

export interface Reaction {
  name: string;
  iconSrc: string;
  selected: false;
}
