import Redis from 'ioredis';

// 글로벌 타입 정의
const globalForRedis = global as unknown as { redis: Redis };

// Redis 연결 함수
const createRedisClient = () => {
    return new Redis(process.env.REDIS_URL || 'redis://:localhost:6379', {
        // 연결 실패 시 재시도 설정 (선택)
        retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    });
};

// 싱글톤 인스턴스
export const redis = globalForRedis.redis || createRedisClient();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

// 에러 핸들링 추가
redis.on('error', (err) => {
    console.error('[ioredis] Error:', err);
});