import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePasswords = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};
export const createJWT = (user) => {
	const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: 'Not authorized 1' });
		return;
	}
	const [, token] = bearer.split(' ');
	if (!token) {
		console.log('here');
		res.status(401);
		res.send('Not a valid token');
		return;
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		console.log('payload from auth', payload);
		next();
		return;
	} catch (e) {
		console.error(e);
		console.log(token);
		res.status(401);
		res.send('Not valid token');
		return;
	}
};
