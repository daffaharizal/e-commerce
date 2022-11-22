const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rand = () => Math.random().toString(36).substring(2, 12);

const modifyFileName = (fileName) => {
  const strOfArray = fileName.split('.');
  strOfArray.splice(strOfArray.length - 1, 0, ...[rand(), '.']);
  return strOfArray.join('');
};

const uploadFile = async (file, fileDir = '') => {
  const fileName = modifyFileName(file.name);

  const filePath = path.join(path.dirname(__dirname), `../public/uploads/${fileDir}`);
  if (!fs.existsSync(filePath)){
    fs.mkdirSync(filePath, { recursive: true });
  }

  await sharp(file.data)
    .resize({
      width: 500
    })
    .toFile(`${filePath}${fileName}`);

  // await file.mv(filePath);

  return `/static/uploads/${fileDir}${fileName}`;
};

module.exports = { rand, modifyFileName, uploadFile };
