const {Item} = require('../src/item');

describe('Item', () => {
  it('creates a deep copy of the item', () => {
    const item = new Item('foo', 5, 7);

    const copy = item.copy();

    expect(copy).toBeDefined();
    expect(copy).toBeInstanceOf(Item);
    expect(copy).not.toBe(item);
  });
});
