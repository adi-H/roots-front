const isProduction = process.env.NODE_ENV == "production";
console.log(process.env.NODE_ENV);

export default {
  serverUrl: isProduction
    ? "http://bhd1roots.com:9000"
    : "http://localhost:9000",
};
