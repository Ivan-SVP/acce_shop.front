const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../outputData/dist"),

    devServer: {
        proxy: 'http://localhost:8000'
    },
};
