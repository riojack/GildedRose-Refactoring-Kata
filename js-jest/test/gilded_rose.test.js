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

  it('should maintain the expiration and quality of "Sulfuras, Hand of Ragnaros" over time', () => {
    const sellIn = 50;
    const quality = 5;

    const brewfestSampler = new Item('Sulfuras, Hand of Ragnaros', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();
    shop.updateQuality();
    shop.updateQuality();

    expect(shop.items[0].sellIn).toBe(sellIn);
    expect(shop.items[0].quality).toBe(quality);
  });

  it('should increase the quality of "Backstage passes to a TAFKAL80ETC concert" by one if the sellIn is more than ten days', () => {
    const sellIn = 50;
    const quality = 5;

    const brewfestSampler = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(6);
  });

  it('should increase the quality of "Backstage passes to a TAFKAL80ETC concert" by two if the sellIn is ten days or less', () => {
    const sellIn = 10;
    const quality = 5;

    const brewfestSampler = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(7);
  });

  it('should increase the quality of "Backstage passes to a TAFKAL80ETC concert" by three if the sellIn is five days or less', () => {
    const sellIn = 5;
    const quality = 5;

    const brewfestSampler = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([brewfestSampler]);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(8);
  });
});
