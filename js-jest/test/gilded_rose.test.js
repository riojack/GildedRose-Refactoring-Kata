const {Shop, Item} = require('../src/gilded_rose');

describe('Gilded Rose', function () {
  it('should foo', function () {
    const sellIn = 0;
    const quality = 0;
    const gildedRose = new Shop([new Item('foo', sellIn, quality)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('foo');
  });
});
