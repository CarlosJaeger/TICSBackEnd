import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = "pollita"
const REFRESH_TOKEN_SECRET = "otrapollita"

//Generate an access token and a refresh token for this database user
function jwtTokens({ user_id, user_name, user_email }) {
  const user = { user_id, user_name, user_email}; 
  const accessToken = jwt.sign(user,ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
  return ({ accessToken, refreshToken });
}

export {jwtTokens};