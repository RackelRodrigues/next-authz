import { defineConfig } from '@prisma/config'

export default defineConfig({
  // @ts-expect-error: Prisma 6.7 não tipa seed, mas funciona
  seed: {
    run: async () => {
      await import('./seed')
    },
  },
})

