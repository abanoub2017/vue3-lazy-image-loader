module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "js", "json", "vue"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,vue}", "!src/types.ts"],
};
