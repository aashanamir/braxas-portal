import express from "express";
import { createMessage, deleteMessage, getAllMessages, getSingleMessage } from "../controller/messageController.js";

const router = express.Router();

router.route("/send").post(createMessage);
router.route("/all").get(getAllMessages);
router.route("/:id").get(getSingleMessage).delete(deleteMessage);


export default router;