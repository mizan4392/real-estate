import * as redis from 'redis';

export let client;

export async function connect(config) {
  client = redis.createClient(config);
  await client.connect();

  client.on('error', function (error) {
    // eslint-disable-next-line no-console
    console.error('REDIS:: ', error);
  });
}
