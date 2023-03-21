import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default async function handleProfileSignup(firstName, lastName, fileName) {
  const arrayOfPromise = [];
  try {
    const user = await signUpUser(firstName, lastName);
    arrayOfPromise.push({ status: 'fulfilled', value: user });
    await uploadPhoto(fileName);
  } catch (error) {
    arrayOfPromise.push({ status: 'rejected', value: error.name });
  }
  return arrayOfPromise;
}
