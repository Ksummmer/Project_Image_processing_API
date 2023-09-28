import express from 'express';
import routes from './routes/index';

//create global object
const app = express();
const port = 3000;

//create endpoint
app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('main api route');
});
//using routes
app.use('/api', routes);

//create server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
