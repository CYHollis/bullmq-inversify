import { Redis } from "ioredis"
import { context } from "./context"
import { Container } from "inversify"
import { loadQueue } from "../server/queue-loader"

export class InversifyBullmq {
  constructor(container: Container, connection: Redis) {
    context.initContext(container, connection)
  }

  start() {
    loadQueue()
  }
}
