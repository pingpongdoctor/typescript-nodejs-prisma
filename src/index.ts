import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/get-users", userRoute);

app.listen(8000, () => {
  console.log(`server is listening to http://localhost:8000`);
});
