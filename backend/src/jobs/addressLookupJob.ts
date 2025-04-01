import { Job, Worker } from "bullmq";
import { connection } from "../queues/connection";

const worker = new Worker(
  "address-lookup",
  async (job: Job) => {
    const { address } = job.data;
    console.log(`🔍 Looking up HCAD info for: ${address}`);

    // Simulated lookup delay
    await new Promise((res) => setTimeout(res, 1000));

    // Fake result
    const result = {
      owner: "Jane Doe",
      value: "$425,000",
      county: "Harris",
    };

    console.log(`✅ Lookup complete for ${address}:`, result);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`🎉 Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job?.id}`, err);
});
