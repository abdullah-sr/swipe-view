const development = {
    API_URL: 'https://renthoop-sandbox-148201.appspot.com',
    env: process.env.NODE_ENV,
};

const production = {
    API_URL: 'https://renthoop-production.appspot.com',
    env: process.env.NODE_ENV,
};

export default process.env.NODE_ENV === 'production' ? production : development;
