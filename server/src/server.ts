import { app } from "./app";
import { PORT } from "./config";
import { runGenerator } from "./generator";

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});

runGenerator();

export {};
