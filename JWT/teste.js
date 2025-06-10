const jwt = require('jsonwebtoken');

const secret = 'minha_chave_secreta';

// Gerar token
const token = jwt.sign(
  { id: 123, nome: 'João' },
  secret,
  { expiresIn: '1h' }
);

console.log('Token:', token);

// Verificar token
try {
  const decoded = jwt.verify(token, secret);
  console.log('Decoded:', decoded);
} catch (err) {
  console.log('Token inválido');
}