const API_KEY = process.env.GOOGLE_API_KEY;

export async function findPlaceById(placeId: string): Promise<any> {
  //on prépare la requête pour google place API
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  //on fait la requête
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': '*',
    },
  }).catch((error) => {
    throw console.error('Goog-Api-Key Api error :', error);
  });

  //on récupère les données
  return await response.json();
}
