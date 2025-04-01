import { Queue } from "bullmq";
import { connection } from "./connection";

export const addressLookupQueue = new Queue("address-lookup", {
  connection,
});
