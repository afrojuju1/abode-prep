import cors from "cors";
import express from "express";
import morgan from "morgan";
import addressLookupRoute from "./routes/addressLookupRoute";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use("/api", addressLookupRoute);

app.listen(3001, () =>
  console.log("🚀 Backend running on http://localhost:3001")
);
