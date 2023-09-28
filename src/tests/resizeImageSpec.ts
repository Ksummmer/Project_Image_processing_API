import supertest from 'supertest';
import path from 'path';
import app from '../index';
import express from 'express';
import sharp from 'sharp';
import { resizeImage } from '../utilities/resizeImage';


const request = supertest(app);

describe('Image processing through resizeImage by sharp ', () => {
  it('Should send resized thumbfile without error', () => {
    expect(
      app.get(`/api/images`, resizeImage, (req, res) => {
        res.sendFile(
          path.join(
            __dirname,
            `../../../images/thumb/${req.query.fileName}-${req.query.width}X${req.query.height}.jpg`
          )
        );
      })
    ).toThrowError();
  });
  it('Should use sharp to resize the image without error', () => {
    expect(async () => {
      await sharp(`./images/full/fjord.jpg`);
    }).not.toThrow();
  });
  
  const httpMocks = require('node-mocks-http');

  it('Should resize the image without error', () => {
    expect(async () => {
      const response = httpMocks.createResponse();
      const request = httpMocks.createRequest();
      const next = function () {
        console.log('next was called');
      };
      request.body = {
        fileName: "santamonica",
        width: "200",
        height: "200"
      };
      await resizeImage(request, response, next);
    }).not.toThrow();
  });
});



