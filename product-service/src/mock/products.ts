const MOCK = new Promise<Array<Record<string, any>>>((resolve) => {
  resolve([
    {
      id: 1,
      title: "ProductOneFromMyBackend",
      price: 10
    },
    {
      id: 2,
      title: "ProductTwoFromMyBackend",
      price: 20
    },
    {
      id: 3,
      title: "ProductThreeFromMyBackend",
      price: 30
    },
  ])
})

export default MOCK;