import countComments from '../modules/countComment.js';

const mockCommentData = [
  {
    id: 1,
    username: 'user1',
    comment: 'This is comment 1',
  },
  {
    id: 2,
    username: 'user2',
    comment: 'This is comment 2',
  },
];

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([mockCommentData]),
}));

describe('countComments function', () => {
  it('should return the length of the data', async () => {
    const result = await countComments('mockItemId');

    expect(result).toBe(1);
  });
});
