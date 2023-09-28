Udacity Full Stack JavaScript Developer
Project: Image Processing API

Description.

This API made for  Udacity Full Stack JavaScript Developer Programm. It resizes and saves images to user specifications (filename, width, height) when visiting URL. 
Image is resized when endpoint is reached for the first time. 
As caching is used in this API, stored image is loaded when endpoint is reached subsequent times. 
Images are served from './images/full'. Resized images are stored in './images/thumb'.

To run the API, you should:
1. install API with npm 'npm install'
2. start with 'npm run start' (the server will listen on port 3000)
3. use http://localhost:3000/api/images to reach the endpoint from the browser and get a response with a status of 200.
4. build with 'npm run build'
5. save the image you need to resize in './images/full'
6. use the endpoint with user specifications, including filename of your image, desired width and height.
For example: http://localhost:3000/api/images?fileName=santamonica&width=200&height=200
