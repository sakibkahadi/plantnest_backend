import mongoose from 'mongoose';
import app from './app';

import { Server } from 'http';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection is detecting, shutting down...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected, shutting down`);
  process.exit(1);
});
