const MOCK = new Promise<Array<Record<string, any>>>((resolve) => {
  resolve([
    {
      product_id: '11db848d-3ee3-4bab-a6a1-e184aba78368',
      count: 1
    },
    {
      product_id: 'dab0d866-a9c6-4e39-bbb1-d8efaf09fee9',
      price: 2
    },
    {
      product_id: '20a7e4b9-5936-4220-a1e0-501a51ba5bf1',
      price: 3
    },
  ])
})

export default MOCK;
