const config = {
    port: process.env.PORT || 3001,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://birkio:AQpv4TKatCBiDqjw@cluster0.0hmaqkz.mongodb.net/test?retryWrites=true&w=majority',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
