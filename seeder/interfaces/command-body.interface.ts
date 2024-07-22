/**
 * {
  "farmerId" : 1,
  "startedDate" : "2024-07-18T20:48:00.000Z",
  "productIds" : [ 1, 2],
  "placeIds" : [ 2 ]
}
 */

interface CommandBody {
  farmerId: number;
  startedDate: string;
  productIds: number[];
  placeIds: number[];
}

export default CommandBody;
