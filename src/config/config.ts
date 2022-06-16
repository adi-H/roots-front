const isProduction = process.env.NODE_ENV == "production";

export default {
  serverUrl: isProduction
    ? "http://bhd1roots.com:9000"
    : "http://84.229.64.190:9000",
};
