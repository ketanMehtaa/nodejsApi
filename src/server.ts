import cors from "cors";
import express from "express";
import morgon from "morgan";
import { createNewUser, signin } from "./handlers/user";
import { protect } from "./modules/auth";
import router from "./router";

const app = express();

const customLogger = (message) => (req, res, next) => {
	console.log("Custom logger");
	next();
};
app.use(cors());
app.use(morgon("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger("custom loooger"));
app.get("/", (req, res) => {
	console.log("Hello from express");
	res.status(200).json({ message: "Hello" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

export default app;
