import { Container } from 'inversify'
import { InversifyBullmq, Job, Queue } from '../../src/index'
import Redis, { RedisOptions } from 'ioredis'

import { describe, it } from 'vitest'

@Queue('test')
class TestScheduler {
  @Job('log', { repeat: { every: 1000 } })
  public test() {
    console.log('test')
  }
}

describe('BullMQTest', () => {
  it('null', async () => {
    const container = new Container()
    container.bind(TestScheduler).toSelf()

    const connection = new Redis({
      host: 'localhost',
      port: 6379,
      db: 3,
      maxRetriesPerRequest: null
    })

    const app = new InversifyBullmq(container, connection)

    app.start()
  })
})
