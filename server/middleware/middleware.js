const fs = require('fs').promises
const path = require('path');

async function saveAvatar(req, res, next) {
  const { newAvatar } = req.body;
  if (newAvatar) {
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = newAvatar.match(regex);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');
    const fileName = `${Date.now()}-avatar`;
    const dirName = `/${__dirname}/../public/images`
    await fs.writeFile(`${dirName}/${fileName}.${ext}`, buffer);
    req.body.profile_photo = `${fileName}.${ext}`;
  }
  next();
}

module.exports = { saveAvatar }
