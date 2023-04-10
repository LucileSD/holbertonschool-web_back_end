import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', err => console.log(`Redis client not connected to the server: ${err}`));

const values = {'Portland': 50,
                'Seattle': 80,
                'New York': 20,
                'Bogota': 20,
                'Cali': 40,
                'Paris': 2};

for (const [city, count] of Object.entries(values)) {
  client.hset('HolbertonSchools', city, count, print);
}

client.hgetall('HolbertonSchools', (err, object) => {
  console.log(object);
});
