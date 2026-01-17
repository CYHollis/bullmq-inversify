import { Container } from 'inversify'
import { InversifyBullmq, Job, Queue } from '../../src/index'
import Redis from 'ioredis'

@Queue('test')
class TestScheduler {
  @Job('log', { repeat: { every: 1000 } })
  public test() {
    console.log('test')
  }
}

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

