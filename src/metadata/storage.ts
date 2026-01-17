import { JobsOptions } from 'bullmq'
import { BaseMetadata } from './metadata'

class MetadataStorage {
  metadata: BaseMetadata = new BaseMetadata()
  public setQueue(constructor: Function, queueName: string) {
    this.metadata.setQueueMetadata(constructor, queueName)
  }

  public setJob(
    constructor: Function,
    propertyName: string,
    jobName: string,
    jobOption?: JobsOptions
  ) {
    const queue = this.metadata.getQueueMetadata(constructor.name)
    if (queue) {
      queue.setJobMetadata(propertyName, jobName, jobOption)
      return
    }
    this.setQueue(constructor, '')
    this.setJob(constructor, propertyName, jobName, jobOption)
  }
}

export const storage = new MetadataStorage()