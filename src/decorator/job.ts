import { JobsOptions } from "bullmq"
import { storage } from "../metadata/storage"

export function Job(jobName: string, jobOption?: JobsOptions) {
  return function (
    target: object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    storage.setJob(target.constructor, propertyName, jobName, jobOption)
  }
}