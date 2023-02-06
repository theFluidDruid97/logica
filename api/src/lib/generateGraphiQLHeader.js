const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie:
        'session=U2FsdGVkX1/S1kE4ff2OkhHJl4GHrhvgmkTAc61S1eyRBHWQEeN8Ua3Z3mMEJar5qGWQy7Hj7zCjjGjdx+swbg==',
      authorization: 'Bearer 1',
    },
    null,
    2
  )
}

console.log(generateGraphiQLHeader())

export default generateGraphiQLHeader
