import { storage } from "../metadata/storage"

export function Queue(queueName: string) {
  return function (constructor: Function) {
    storage.setQueue(constructor, queueName)
  }
}
