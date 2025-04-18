export async function request<T, P = any>(
  endpoint: string,
  method: MethodType = 'GET',
  payload?: P,
  url?: string,
  headers: HeaderType = {}
): Promise<T | null> {
  const searchParams = new URLSearchParams()

  if (method === 'GET' && payload) {
    Object.entries(payload as any).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => searchParams.append(key, val))
      } else {
        searchParams.append(key, value)
      }
    })
  }

  searchParams.set('endpoint', endpoint)

  const proxyUrl = `/api/proxy?${searchParams.toString()}`

  const response = await fetch(proxyUrl, {
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
      ...headers
    }
  })

  try {
    return (await response.json()) as T
  } catch (error) {
    console.error('Failed to parse response', error)
    return null
  }
}
