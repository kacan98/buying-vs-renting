module.exports = {
  input: [
    "src/**/*.{ts,tsx}", // Scan TypeScript and TSX files
    "!src/**/*.spec.{ts,tsx}", // Exclude test files
    "!**/node_modules/**", // Exclude node_modules
  ],
  output: "./public",
  options: {
    func: {
      list: ["t"], // Include the 't' function
      extensions: [".ts", ".tsx"], // Scan TypeScript and TSX files
    },
    lngs: ["en", "de", "cz", "dk", "se", "ro"],
    defaultLng: "en",
    resource: {
      loadPath: "i18n/{{lng}}/{{ns}}.json",
      savePath: "i18n/{{lng}}/{{ns}}.json",
      override: false, // Do not override the existing JSON files
    },
  },
};
