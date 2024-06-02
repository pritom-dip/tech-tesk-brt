import { cache } from 'react'
import { QueryClient } from '@tanstack/react-query'
import config from '@/lib/config'

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: config.STALE_TIME
    }
  }
}

export const getQueryClient = cache(() => new QueryClient(queryClientConfig))
