const {Shop, Item} = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  it('should foo', () => {
    const sellIn = 0;
    const quality = 0;
    const gildedRose = new Shop([new Item('foo', sellIn, quality)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('foo');
  });

  it('should degrade an unexpired Brewfest Sampler\'s quality by one after one day', () => {
    const sellIn = 5;
    const quality = 10;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(9);
  });

  it('should degrade an expired Brewfest Sampler\'s quality twice as fast', () => {
    const sellIn = 0;
    const quality = 10;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(8);
  });

  it('should maintain a quality of zero for an expired Brewfest Sampler', () => {
    const sellIn = 0;
    const quality = 0;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(0);
  });

  it('should increase Aged Brie\'s quality by one', () => {
    const sellIn = 10;
    const quality = 5;

    const brewfestSampler = new Item('Aged Brie', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(6);
  });

  it('should increase Aged Brie\'s quality by one even after it has expired', () => {
    const sellIn = 0;
    const quality = 5;

    const brewfestSampler = new Item('Aged Brie', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(6);
  });
});
