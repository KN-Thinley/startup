const app = require("./app");

require("dotenv").config({ path: "./configuration/config.env" });
const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
