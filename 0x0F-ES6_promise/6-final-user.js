import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const arrayOfPromise = [
    signUpUser(firstName, lastName),
    uploadPhoto(fileName)
  ]
  return Promise.allSettled(arrayOfPromise).then((values) => console.log(values));
}
