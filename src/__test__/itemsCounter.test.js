import itemsCounter from '../modules/itemsCounter.js';

describe('itemsCounter', () => {
  it('should return the length of the pokeArray', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ results: [1, 2, 3] }),
    }));

    const count = await itemsCounter();
    expect(count).toBe(3);
  });
});