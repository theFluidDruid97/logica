const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie:
        'session=U2FsdGVkX1+i0CS0QuKCSzIn9F4h0ggkeghSn53HK13mkFtxgAPatyf0TVFhG75FErvganEcAeXOsM1J3nsadw==',
      authorization: 'Bearer 1',
    },
    null,
    2
  )
}

console.log(generateGraphiQLHeader())

export default generateGraphiQLHeader
