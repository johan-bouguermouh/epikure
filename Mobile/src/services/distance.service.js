export function distance(lat1, lon1, lat2, lon2) {
  // The math module contains a function
  // named radians which converts from
  // degrees to radians.
  lon1 = radians(lon1);
  lon2 = radians(lon2);
  lat1 = radians(lat1);
  lat2 = radians(lat2);

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

/**
 * Simple fonction pour convertir un degré en radian
 * @param {number} number
 * @returns {string}
 */
export function defineMetricPrefixes(number) {
  //On convertit le nombre en string
  let numberString = number.toString();
  //On récupère la taille du nombre
  let numberLength = numberString.length;

  //On définit le nombre de chiffre à afficher
  let numberToDisplay = 0;
  //On définit le suffixe à afficher
  let suffix = "";
  //On définit le nombre à afficher
  let numberToDisplayString = "";

  //Si le nombre est inférieur à 1000m on affiche le nombre en m
  if (number < 1000) {
    numberToDisplay = number;
    numberToDisplayString = numberToDisplay.toString();
    suffix = "m";
  }
  //Si le nombre est supérieur à 1000m on affiche le nombre en km
  else if (number >= 10000) {
    numberToDisplay = number / 1000;
    //on aroundi le résultat à 1 chiffre après la virgule
    numberToDisplay = Math.round(numberToDisplay * 10) / 10;
    numberToDisplayString = numberToDisplay.toString();
    suffix = "km";
  } else if (number >= 1000 && number < 10000) {
    numberToDisplay = number / 1000;
    //on aroundi le résultat à 1 chiffre après la virgule
    numberToDisplay = Math.round(numberToDisplay * 10) / 10;
    numberToDisplayString = numberToDisplay.toString();
    suffix = "km";
  } else {
    numberToDisplay = number / 1000;
    //on aroundi le résultat à 1 chiffre après la virgule
    numberToDisplay = Math.round(numberToDisplay * 10) / 10;
    numberToDisplayString = numberToDisplay.toString();
    suffix = "km";
  }

  return numberToDisplayString + suffix;
}
