import { useEffect, useState } from 'react'

export interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
}

interface UseCryptoDataResult {
  data: CryptoData[]
  loading: boolean
  error: string | null
}

export default function useCryptoData(): UseCryptoDataResult {
  const [data, setData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    const sampleData: CryptoData[] = [
      { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 42500, change24h: 2.5, marketCap: 850000000000 },
      { id: '2', name: 'Ethereum', symbol: 'ETH', price: 2250, change24h: -1.2, marketCap: 270000000000 },
      { id: '3', name: 'Cardano', symbol: 'ADA', price: 0.75, change24h: 3.8, marketCap: 27000000000 },
      { id: '4', name: 'Solana', symbol: 'SOL', price: 145, change24h: 5.2, marketCap: 62000000000 },
    ]

    const timeout = window.setTimeout(() => {
      setData(sampleData)
      setLoading(false)
    }, 500)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [])

  return { data, loading, error }
}
