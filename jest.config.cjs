module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['**/tests/**/*.test.js'], // Sesuaikan dengan lokasi file pengujian Anda
};