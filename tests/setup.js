
const supertest = require('supertest');

const BASE_URL = 'http://127.0.0.1';

global.request = supertest(BASE_URL);
