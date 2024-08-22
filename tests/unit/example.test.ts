import request from 'supertest';
import app from '../../src/app';

describe('GET /api', () => {
  it('should return a 200 status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
