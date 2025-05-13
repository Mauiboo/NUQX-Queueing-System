const fs = require("fs");
const mdi = require("@iconify/json/json/mdi.json");

const iconNames = Object.keys(mdi.icons);
fs.writeFileSync("./public/mdi-icons.json", JSON.stringify(iconNames, null, 2));
