import altogic from "./altogic";
export const PROFILE_PICTURES = "profilePictures";

export const createBucketForProfilePictures = async () => {
  try {
    if (!(await altogic.storage.bucket(PROFILE_PICTURES).exists().data)) {
      return altogic.storage.createBucket(PROFILE_PICTURES, true);
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadProfilePicture = async (picture) => {
  try {
    if (altogic.auth.getUser().profilePicture) {
      if (altogic.auth.getUser().profilePicture.includes("c1-na.altogic.com")) {
        await altogic.storage
          .bucket(PROFILE_PICTURES)
          .deleteFiles([`profile_picture-${altogic.auth.getUser()._id}`]);
      }
    }
    return await altogic.storage
      .bucket(PROFILE_PICTURES)
      .upload(`profile_picture-${altogic.auth.getUser()._id}`, picture, {
        createBucket: true,
        isPublic: true,
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateProfilePictureFieldOnDatabase = async (pictureLink) => {
  try {
    return await altogic.db
      .model("users")
      .object(altogic.auth.getUser()._id)
      .update({ profilePicture: pictureLink });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProfilePictureFieldOnDatabase = async () => {
  try {
    await altogic.db
      .model("users")
      .object(altogic.auth.getUser()._id)
      .updateFields([{ field: "profilePicture", updateType: "unset" }]);
  } catch (error) {
    console.error(error);
  }
};

export const updateName = async (name) => {
  try {
    return await altogic.db
      .model("users")
      .object(altogic.auth.getUser()._id)
      .update({ name });
  } catch (error) {
    console.error(error);
  }
};

export const updateAddress = async (address) => {
  try {
    return await altogic.db
      .model("users")
      .object(altogic.auth.getUser()._id)
      .update({ address: {
        country: address.country,
        city: address.city,
        address: address.address,
      } });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async () => {
  try {
    const resp = await altogic.auth.getUserFromDB();
    if (resp.errors === null) {
      altogic.auth.setUser(resp.user);
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeProfilePhoto = async () => {
  try {
    return await altogic.storage
      .bucket(PROFILE_PICTURES)
      .deleteFiles([`profile_picture-${altogic.auth.getUser()._id}`]);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id) => {
  try {
    return await altogic.db.model("users").object(id).get();
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    return await altogic.db.model("products").object(id).get();
  } catch (error) {
    console.error(error);
  }
}

export function formatPrice(number) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}