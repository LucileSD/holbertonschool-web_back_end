import kue from 'kue';

const blacklisted = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
  // track the progress of the job of 0 out of 100
  job.progress(0, 100);

  if (blacklisted.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  // Track the progress to 50%
  job.progress(50, 100);

  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  done();
};

const queue = kue.createQueue();

// we may specify the maximum active jobs for this type by passing a number
queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
