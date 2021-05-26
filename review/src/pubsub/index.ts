import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
  port: 6379,
  host: '127.0.0.1',
  password: 'Test1234',
  retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000);
  },
};

const PubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export default PubSub;
