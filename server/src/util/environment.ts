export const JWT_SECRET = 'supperSecrete';

import { config } from 'dotenv';
config();
export const environment = {
  mongoUrl: process.env.DB_URL,
  jwtSecrete: 'my-secrete',
  redis: {
    url: `redis://localhost:${process.env.REDIS_PORT}`,
    // port: parseInt(process.env.REDIS_PORT),
  },
  email: {
    defaultSender: `<no-reply>HomeLand <info@homeLand.com>`,
  },
};
