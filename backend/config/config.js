module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/todo-app',
    JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER || 'smanyama36@gmail.com',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'my-email-password'
};