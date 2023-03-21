import { uploadPhoto, createUser } from "./utils";

export default async function asyncUploadUser() {
  let obj = {};
  try {
    obj = {
      photo: await uploadPhoto(),
      user: await createUser(),
    };
  }
  catch (err) {
    obj = {
      photo: null,
      user: null,
    };
  }
  return obj;
}
