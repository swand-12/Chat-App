import express from "express";
import { getUSersForSidebar,getMessages,SendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/route.protector.js";
const router=express();

router.get("/users",protectRoute,getUSersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,SendMessage);



export default router;