import express from "express";
import uploads from "../config/multer.js";
import { createEvent,deleteEvent,getAllEvents, getAllEventsUser } from "../controllers/event.controllers.js";

const eventRouter = express.Router();

eventRouter.post("/create-event", uploads.fields([{ name: "file", maxCount: 5 }]), createEvent);
eventRouter.get("/getAllEvents/:id", getAllEvents);
eventRouter.delete("/deleteEvent/:id", deleteEvent);
eventRouter.get("/getAllEventsUser", getAllEventsUser); 
export default eventRouter;
