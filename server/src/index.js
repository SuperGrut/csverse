import { connectToDB } from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App connected @ ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("app failed", error.message);
  });
