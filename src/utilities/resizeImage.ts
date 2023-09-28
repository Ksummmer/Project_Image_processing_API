import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

//const sharp = require('sharp');

//create a folder for future thumbimages if it doesn't exist yet
fs.access(path.join(__dirname, '../../images/thumb'), (err) => {
  if (err) {
    fs.mkdir(path.join(__dirname, '../../images/thumb'), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

//caching function

const ArrayofImages: ThumbImages[] = [];
interface ThumbImages {
  fileName?: string;
  width?: number;
  height?: number;
}
const createCache = (fileName: string, width: number, height: number): void => {
  const thumbImage: ThumbImages = { fileName, width, height };
  ArrayofImages.push(thumbImage);
};
//resizing
/*
const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: () => void
): Promise<void> => {
  const fileName: string = req.query.fileName as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  if (fileName && width && height) {
    if (!fs.existsSync(`./images/thumb/${fileName}-${width}x${height}.jpg`)) {
      //check if thumbimage already exists
      await sharp(`./images/full/${fileName}.jpg`)
        .resize(width, height)
        .toFile(`./images/thumb/${fileName}-${width}x${height}.jpg`)
        .then(() => next())
        .catch((err) => {
          console.error(err);
          res.send('Mistake in fileName');
          return;
        });
      createCache(fileName as string, width as number, height as number);
      return;
    }
    next();
    return;
  }
  res.send('No image information');
  return;
};
*/

const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: () => void
): Promise<void> => {
  const fileName: string = req.query.fileName as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  if (!(fileName && width && height)) {
    res.send('No image information');
    return;
  } else if (!fs.existsSync(`./images/full/${fileName}.jpg`)) {
    res.send('Mistake in filename');
    return;
  } else if (width <= 0 || height <= 0) {
    res.send('Mistake in image specifications');
    return;
  } else {
    if (!fs.existsSync(`./images/thumb/${fileName}-${width}x${height}.jpg`)) {
      //check if thumbimage already exists
      await sharp(`./images/full/${fileName}.jpg`)
        .resize(width, height)
        .toFile(`./images/thumb/${fileName}-${width}x${height}.jpg`)
        .then(() => next())
        .catch((err) => {
          console.error(err);
          res.send('Mistake in fileName');
          return;
        });
      createCache(fileName as string, width as number, height as number);
      return;
    }
    next();
    return;
  }
};

export { ArrayofImages, ThumbImages, createCache, resizeImage };
