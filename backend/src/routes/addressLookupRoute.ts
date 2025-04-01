import { Router } from "express";
import { addressLookupQueue } from "../queues/addressQueue";

const router = Router();

router.post("/address-lookup", async (req, res) => {
  const { address } = req.body;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "Address is required" });
  }

  await addressLookupQueue.add("lookup", { address });
  return res.status(202).json({ message: "Job added to queue" });
});

export default router;
