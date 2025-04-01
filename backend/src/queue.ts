import { runAddressLookupJob } from "./jobs/addressLookupJob";

const addressJobQueue: string[] = [];

export const addAddressLookupJob = (address: string) => {
  addressJobQueue.push(address);
};

// Simulated background job processor
setInterval(() => {
  if (addressJobQueue.length > 0) {
    const address = addressJobQueue.shift();
    if (address) {
      runAddressLookupJob(address);
    }
  }
}, 3000);
