import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default /*async */function handleProfileSignup(firstName, lastName, fileName) {
  const user = signUpUser();
  const photo = uploadPhoto();

  return Promise.allSettled([user, photo]).then((values) => {
    values.map((v) => ({ status: v.status, value: v.status === 'fulfilled' ? v.value : `${v.reason.name}: ${v.reason.message}` }))});
  
  
  /*const arrayOfPromise = [];
  try {
    const user = await signUpUser(firstName, lastName);
    arrayOfPromise.push({ status: 'fulfilled', value: user });
    await uploadPhoto(fileName);
  } catch (error) {
    arrayOfPromise.push({ status: 'rejected', value: error.toString() });
  }
  return arrayOfPromise;*/
}

