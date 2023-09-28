import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Server is working right way', () => {
  it('server should be created without error', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('route (/api) should be working without error', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('route (/api/images) should be working without error', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
  it('route (/api/images?fileName=santamonica&width=200&height=200) should be working without error', async () => {
    const response = await request.get(
      '/api/images?fileName=santamonica&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
});
