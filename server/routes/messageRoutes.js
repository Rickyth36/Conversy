import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getAllUserForSideBar, getMessages, markMessageAsSeen } from "../controllers/messageController.js";

const messageRouter = express.Router()

messageRouter.get("/user", protectRoute, getAllUserForSideBar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);

export default messageRouter;