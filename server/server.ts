import express from "express";
import { order_routes } from "./routes/index";

let cors = require("cors");

let allowCrossDomain = function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

const app = express();
const port = process.env.PORT || 5000;

app.all("*", function (req, res, next) {
  var origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(allowCrossDomain);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
});

app.use(order_routes);

app.listen(port, () => {
  console.log(`Shipping label app listening on port ${port}`);
});
