const MOCK = new Promise<Array<Record<string, any>>>((resolve) => {
  resolve([
    {
      id: 1,
      title: "ProductOne",
      price: 10
    },
    {
      id: 2,
      title: "ProductTwo",
      price: 20
    },
    {
      id: 3,
      title: "ProductThree",
      price: 30
    },
  ])
})

export default MOCK;