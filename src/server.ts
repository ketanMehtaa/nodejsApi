import cors from 'cors';
import express from 'express';
import { body, validationResult } from 'express-validator';
import morgon from 'morgan';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

const customLogger = (message) => (req, res, next) => {
	console.log(message);
	next();
};
app.use(cors());
app.use(morgon('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger('server.ts file loaded'));

app.get('/', (req, res, next) => {
	// console.log('Hello from express');
	// res.status(200).json({ message: 'simeple / in url ' });
	// throw new Error('Something went wrong');

	res.json({ message: 'Hello' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.post('/product', body('name').isString(), (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400);
		res.json({ errors: errors.array() });
	}
});
app.use((err, req, res, next) => {
	if (err.type === 'auth') {
		res.status(401).json({ message: 'Unauthorized' });
	} else if (err.type === 'input') {
		res.status(400).json({ message: 'invalid input' });
	} else {
		res.status(500).json({ message: 'oops,thats on us' });
	}
});
export default app;
