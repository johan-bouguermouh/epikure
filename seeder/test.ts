import { etractNutriscore } from "./utils/extractNutriscore";

const text =
  "Eau\n91,70 g\nGlucides\n3,40 g\nFibres\n1,70 g\nVitamine B9\n61,30 µg\nCuivre\n0,10 mg\nPolyphénols totaux\n15,45 mg";

const response = etractNutriscore(text);

console.log("response:", response);
