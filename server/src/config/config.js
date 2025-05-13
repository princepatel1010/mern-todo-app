const config = {
  port: process.env.PORT,
  mongodb: {
    url: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default config;
