export async function request<T, P = any>(
  endpoint: string,
  method: MethodType = 'GET',
  payload?: P,
  url?: string,
  headers: HeaderType = {}
): Promise<T> {
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

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Request failed: ${response.status} - ${errorBody}`)
  }

  try {
    return (await response.json()) as T
  } catch (error) {
    console.error('Failed to parse response', error)
    throw new Error('Invalid JSON response')
  }
}
