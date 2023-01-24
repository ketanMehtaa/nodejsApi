import supertest from 'supertest';
import app from '../server';
describe('GET /', () => {
	it('should return 200 OK', async () => {
		const res = await supertest(app).get('/');
		expect(res.body.message).toBe('Hello');
	});
});
