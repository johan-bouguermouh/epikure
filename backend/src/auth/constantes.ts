// on import la varible JWT_SECRET du .env pour la sécurité
import { config } from 'dotenv';

config();

console.log(process.env.JWT_SECRET);

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
