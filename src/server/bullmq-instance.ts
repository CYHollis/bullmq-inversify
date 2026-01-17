import { Queue, Worker } from "bullmq"

export const queues: Queue[] = []

export const workers: Worker[] = []

export function addQueue(queue: Queue) {
  queues.push(queue)
}

export function addWorker(worker: Worker) {
  workers.push(worker)
}
