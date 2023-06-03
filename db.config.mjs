export default {
    HOST: "localhost",
    USER: "newuser",
    PASSWORD: "1234",
    DB: "session_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};