const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie:
        'session=U2FsdGVkX1+jvfU3C1Ob76tgBKS8GYw4A9jLKNcAIaxF/xaAAc+H7z/3U7yUrRYqB5D3ZMWlsqolwyQz6fhyQg==',
      authorization: 'Bearer 1',
    },
    null,
    2
  )
}

console.log(generateGraphiQLHeader())

export default generateGraphiQLHeader
