import { Router } from "express";
import { prisma } from "../lib/prisma";
import { addressLookupQueue } from "../queues/addressQueue";

const router = Router();

router.get("/address-lookup/:id", async (req, res) => {
  const { id } = req.params;

  const record = await prisma.addressLookup.findUnique({
    where: { id },
  });

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  return res.status(200).json(record);
});

router.post("/address-lookup", async (req, res) => {
  const { address } = req.body;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "Address is required" });
  }

  const record = await prisma.addressLookup.create({
    data: {
      address,
      status: "pending",
    },
  });

  await addressLookupQueue.add("lookup", {
    address,
    id: record.id, // pass this ID to worker
  });

  return res.status(202).json({
    message: "Job queued",
    id: record.id, // this is what frontend will poll with
  });
});

export default router;
