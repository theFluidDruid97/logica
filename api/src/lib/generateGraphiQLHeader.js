const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie:
        'session=U2FsdGVkX1/L/tZnZ4S+8SW21+7fToWghO0ugKDPlVOAnvFdZuBxx1rlpv8zsgGrhxycC29dXllDXDgTlmraTw==',
      authorization: 'Bearer 1',
    },
    null,
    2
  )
}

console.log(generateGraphiQLHeader())

export default generateGraphiQLHeader
