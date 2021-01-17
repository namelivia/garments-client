module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    ".*\\.(js)$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}"],
  setupFiles: ["./test-setup.js"],
};
