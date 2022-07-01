export interface ECommerceData {
  background: string;
  image: string;
  name: string;
  value: number;
  id: string;
}

export const getEcommerceData = (): Promise<ECommerceData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '01249fsadas78gaf9s2qe3',
          background: 'https://t4.ftcdn.net/jpg/02/82/24/63/240_F_282246367_qTvPo1marktsBqtHI8Bu9pWsUiWawdCd.jpg',
          image: 'https://as2.ftcdn.net/v2/jpg/03/15/91/95/1000_F_315919556_b7J8OGH5IobzosWBmC5NOwMoP5eZLpxn.jpg',
          name: 'Café',
          value: 1.5,
        },
        {
          id: '1278yhfaskjsf98q2ujo',
          background: 'https://t4.ftcdn.net/jpg/01/45/65/65/240_F_145656554_9vxBBZ790eKPYHfkN4qtRA2nghvSz6xz.jpg',
          image: 'https://t4.ftcdn.net/jpg/02/30/78/21/240_F_230782111_T9GRNhJOtD3uUhZ6M7BidfimwmsQxZVG.jpg',
          name: 'Refrigerante',
          value: 10.5,
        },
      ]);
    }, 300)
  });
}