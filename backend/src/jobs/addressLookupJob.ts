import { Job, Worker } from "bullmq";
import { prisma } from "../lib/prisma";
import { connection } from "../queues/connection";

const worker = new Worker(
  "address-lookup",
  async (job: Job) => {
    const { address } = job.data;
    console.log(`🔍 Looking up HCAD info for: ${address}`);

    // Simulated lookup delay
    await new Promise((res) => setTimeout(res, 1000));

    // fake result for now
    const result = {
      ownerName: "Jane Doe",
      mailingAddress: "PO Box 123, Houston, TX",
      value2024: "$425,000",
      houseSqft: 2100,
      lotSqft: 7500,
      county: "Harris",
    };

    // todo: crawl for the real result

    await prisma.addressLookup.create({
      data: {
        address,
        ...result,
      },
    });

    console.log(`✅ Lookup complete and saved for ${address}:`, result);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`🎉 Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job?.id}`, err);
});
