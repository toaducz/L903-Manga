type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type HeaderType = Record<string, string>

export async function request<T, P extends Record<string, unknown> = Record<string, unknown>>(
  endpoint: string,
  method: MethodType = 'GET',
  payload?: P,
  url?: string,
  headers: HeaderType = {}
): Promise<T> {
  const searchParams = new URLSearchParams()

  if (method === 'GET' && payload) {
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => searchParams.append(key, String(val)))
      } else {
        searchParams.append(key, String(value))
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
