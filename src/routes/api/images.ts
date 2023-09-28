import express from 'express';
import { resizeImage } from '../../utilities/resizeImage';
import path from 'path';

const images = express.Router();

images.get(
  '/',
  resizeImage,
  (req: express.Request, res: express.Response): void => {
    res.sendFile(
      path.join(
        __dirname,
        `../../../images/thumb/${req.query.fileName}-${req.query.width}X${req.query.height}.jpg`
      )
    );
  }
);

export default images;
