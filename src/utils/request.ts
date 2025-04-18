export async function request<T, P = any>(
  endpoint: string,
  method: MethodType = 'GET',
  payload?: P,
  url?: string,
  headers: HeaderType = {},
): Promise<T | null> {
  let params = ''
  if (method === 'POST') {
    // Bạn không dùng POST nên bỏ qua
  } else if (method === 'GET') {
    if (payload) {
      params = `?${new URLSearchParams(payload as any).toString()}`
    }
  }

  // ✅ Chuyển hướng request tới API route của bạn
  const proxyUrl = `/api/proxy?endpoint=${encodeURIComponent(endpoint)}${params}`

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
