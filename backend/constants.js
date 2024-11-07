require('dotenv').config();

const SERVER_URL = 'localhost';
const PORT = '8900';
const ENV = 'dev';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

module.exports = {
    SERVER_URL,
    PORT,
    ENV,
    GEMINI_API_KEY
};
