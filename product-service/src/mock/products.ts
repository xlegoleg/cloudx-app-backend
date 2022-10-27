const MOCK = new Promise<Array<Record<string, any>>>((resolve) => {
  resolve([
    {
      id: '11db848d-3ee3-4bab-a6a1-e184aba78368',
      title: "ProductOneFromMyBackend",
      description: "ProductOneDescription",
      price: 10
    },
    {
      id: 'dab0d866-a9c6-4e39-bbb1-d8efaf09fee9',
      title: "ProductTwoFromMyBackend",
      description: "ProductTwoDescription",
      price: 20
    },
    {
      id: '20a7e4b9-5936-4220-a1e0-501a51ba5bf1',
      title: "ProductThreeFromMyBackend",
      description: "ProductThreeDescription",
      price: 30
    },
  ])
})

export default MOCK;
