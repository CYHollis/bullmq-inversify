import { Metadata } from '@auroravpn/class-metadata'
import { JobsOptions } from 'bullmq'

export class BaseMetadata extends Metadata {
    constructor() {
        super()
    }
    getQueueMetadata(constructorName: string) {
        return this.get(constructorName) as QueueMetadata
    }
    setQueueMetadata(constructor: Function, queueName: string) {
        const queue = this.getQueueMetadata(constructor.name)
        if (queue) {
                    
            queue.queueName = queueName
            queue.target = constructor
            return
        }
        
        this.define(constructor.name, new QueueMetadata(queueName, constructor))
    }
}

export class QueueMetadata extends Metadata {
    constructor(public queueName: string, public target: Function) {
        super()
    }
    getJobMetadata(propertyName: string) {
        return this.get(propertyName) as JobMetadata
    }
    setJobMetadata(propertyName: string, jobName: string, jobOption?: JobsOptions,) {
        const job = this.getJobMetadata(propertyName)
        if (job) {
            job.jobOption = jobOption
            job.jobName = jobName
            return
        }
        this.define(propertyName, new JobMetadata(jobName, propertyName, jobOption))
    }
}

export class JobMetadata extends Metadata {
    constructor(
      public jobName: string,
      public propertyName: string,
      public jobOption?: JobsOptions
    ) {
        super()
    }
}