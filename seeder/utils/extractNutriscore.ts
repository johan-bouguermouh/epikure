interface NutriScoreDto {
  name: string;
  value: string;
}

export function etractNutriscore(text: string): NutriScoreDto[] {
  const regex = /\d+(,\d+)?\s?[a-zA-Zµ]+/g;
  const matches: RegExpMatchArray | null = text.match(regex);

  /** Tableau des retour */
  let split = [];
  /** Valeur incrementable du cruseur de séparation */
  let lastCharIndexSplited: number = 0;

  if (!matches) {
    return [];
  }

  for (let i = 0; i < matches.length; i++) {
    //on récupère la position du dernier caractère de matches[i], on rajoute plus 1 si nous somme sur que le text comprends des espace à chaque fin de ligne
    let lastChar = matches[i].length + 1;
    //on récupère la position de l'index de matches[i]
    let index = text.indexOf(matches[i]);

    //on split le text selon lastCharIndexSplited et lastCharIndexSplited + lastChar
    let element = text.slice(lastCharIndexSplited, index + lastChar);
    //on addition les deux pour avoir la position du dernier caractère de matches[i] dans le texte et on ajoute à notre lastCharIndexSplited
    lastCharIndexSplited = lastChar + index;

    // On split par le matche pour conserver que le name
    const arrayElement = element.split(matches[i]);
    // et on push dans notre tableau un object avec le nom et la valeur

    split.push({
      name: arrayElement[0].trim(),
      value: matches[i].trim(),
    });
  }

  return split;
}
