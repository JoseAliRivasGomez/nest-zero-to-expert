

export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: +process.env.PORT || 4000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
})