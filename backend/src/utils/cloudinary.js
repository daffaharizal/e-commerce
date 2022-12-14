import Cloudinary from 'cloudinary';

import ENV from './constants.js';

Cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async ({ file, path }) => {
  return await Cloudinary.v2.uploader.upload(
    file,
    {
      folder: `uploads/${path}`,
      use_filename: true,
      unique_filename: true,
      resource_type: 'auto'
    },
    (result, error) => console.log(result, error)
  );
};

export { uploadToCloudinary };
