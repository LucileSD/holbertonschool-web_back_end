import express from 'express';
import { createClient } from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = createClient();
const queue = kue.createQueue();
const getAsync = promisify(client.get).bind(client);

const reserveSeat = (number) => {
  client.set('numberOfAvailableSeats', number);
};

const getCurrentAvailableSeats = async () => await getAsync('numberOfAvailableSeats');

reserveSeat(50);
let reservationEnabled = true;

app.get('/available_seats', async (request, response) => {
  response.json({ numberOfAvailableSeats: await getCurrentAvailableSeats() });
});

app.get('/reserve_seat', (request, response) => {
  if (reservationEnabled === false) {
    response.json({ status: 'Reservation are blocked' });
  }

  const job = queue.createJob('reserve_seat');
  job.save((err) => {
    if (!err) response.json({ status: 'Reservation in process' });
    else response.json({ status: 'Reservation failed' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  }).on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

app.get('/process', (request, response) => {
  response.json({ status: 'Queue processing' });
  queue.process('reserve_seat', async (job, done) => {
    const number = Number(await getCurrentAvailableSeats()) - 1;
    if (number <= 0) {
      reservationEnabled = false;
      const err = new Error('Not enough seats available');
      done(err);
    } else {
      reserveSeat(number);
    }
    done();
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
