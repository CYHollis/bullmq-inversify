# Bullmq-DI

## 安装

```bash
npm install @auroravpn/bullmq-di
yarn add @auroravpn/bullmq-di
pnpm add @auroravpn/bullmq-di
```

## 快速开始

```typescript
// 导入包
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

// 创建inversify容器
const container = new Container()

// 绑定类
container.bind(TestScheduler).toSelf()

// 创建Redis连接对象
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  db: 3,
  maxRetriesPerRequest: null
})

// 创建InversifyBullmq实例
const app = new InversifyBullmq(container, connection)

// 启动InversifyBullmq实例
app.start()
```

## API 参考

### 构造函数

#### `new InversifyBullmq(container, connection)`

**参数**

- `container` `Inversify.container` **必填, **容器实例
- `connection` `Redis` **必填, **`Redis`连接对象

**返回值** `void`

**示例**

```typescript
const container = new Container()

const connection = new Redis({
  maxRetriesPerRequest: null
})

const app = new InversifyBullmq(container, connection)
```



### 实例方法

#### `InversifyBullmq.start()`

**返回值** `void`

**示例**

```typescript
app.start()
```



### 装饰器

#### `Queue(queueName)`

**参数**

- `queueName` `string` **必填, **队列名称`

**示例**

```typescript
@Queue('test')
class TestScheduler {
}
```



#### `Job(jobName, [jobOption])`

**参数**

- `jobName` `string` **必填, **任务名称

**示例**

```typescript
@Queue('test')
class TestScheduler {
  @Job('log', { repeat: { every: 1000 } })
  public test() {
    console.log('test')
  }
}
```

