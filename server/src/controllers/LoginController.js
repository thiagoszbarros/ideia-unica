import QueryService from '../services/postgres/QueryService.js';
import jsonwebtoken from 'jsonwebtoken';

export default class LoginController {
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      res
      .status(400)
      .json({ message: 'Username and password are required' });
      return;
    }
    const user = await QueryService
      .get(
        'users', 
        ['id', 'username', 'password'],
        { username: username }
      );
    if (!user || user.password != password) {
      res
      .status(401)
      .json({ message: 'Invalid credentials' });
      return;
    }
    const token = jsonwebtoken
      .sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TTL }
      );

    const now = new Date();

    const expiresAt = new Date(now + +process.env.JWT_TTL);
    await QueryService
      .update(
        'users',
        { id: user.id },
        { token: token, expires_at: expiresAt, updated_at: now }
      );
    res
    .status(200)
    .json({ message: 'Login successful', token });
  }

  verify(req, res){
    const token = req.body?.token;

    if(!token){
      return res
      .status(400)
      .json({message: 'Token is required'});
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, _) => {
      if (err) {
        return res.status(400).json({ message: 'Token is invalid' })
      };
    });

    return res
    .status(200)
    .send();
  }
}
