const {Item} = require('../src/item');
const {Shop} = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  it('should default items to an empty list', () => {
    const shop = new Shop();

    expect(shop.items).toHaveLength(0);
  });

  it('should return a new instance of the Shop with an empty list by default', () => {
    const shop = new Shop();
    const shopAfterUpdate = shop.updateQuality();

    expect(shopAfterUpdate).toBeInstanceOf(Shop);
    expect(shopAfterUpdate.items).toHaveLength(0);
    expect(shopAfterUpdate.items).not.toBe(shop.items);
  });

  it('should update all items in the store', () => {
    const gildedRose = new Shop([
      new Item('foo', 5, 5),
      new Item('bar', 5, 1),
      new Item('baz', 5, 32)
    ]);

    const [foo, bar, baz] = gildedRose.updateQuality().items;

    expect(foo.quality).toBe(4);
    expect(bar.quality).toBe(0);
    expect(baz.quality).toBe(31);

    expect(foo.sellIn).toBe(4);
    expect(bar.sellIn).toBe(4);
    expect(baz.sellIn).toBe(4);
  });

  it('should create copies of all items after updating quality of items', () => {
    const gildedRose = new Shop([
      new Item('foo', 5, 5),
      new Item('bar', 5, 1),
      new Item('baz', 5, 32)
    ]);

    const [foo, bar, baz] = gildedRose.updateQuality().items;

    expect(foo).toBeDefined();
    expect(foo).not.toBe(gildedRose.items[0]);

    expect(bar).toBeDefined();
    expect(bar).not.toBe(gildedRose.items[1]);

    expect(baz).toBeDefined();
    expect(baz).not.toBe(gildedRose.items[2]);
  });

  it('should degrade an unexpired Brewfest Sampler\'s sellIn by one after one day', () => {
    const sellIn = 5;
    const quality = 10;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]).updateQuality();

    expect(shop.items[0].sellIn).toBe(4);
  });

  it('should degrade an unexpired Brewfest Sampler\'s quality by one after one day', () => {
    const sellIn = 5;
    const quality = 10;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]).updateQuality();

    expect(shop.items[0].quality).toBe(9);
  });

  it('should degrade an expired Brewfest Sampler\'s quality twice as fast', () => {
    const sellIn = 0;
    const quality = 10;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]).updateQuality();

    expect(shop.items[0].quality).toBe(8);
  });

  it('should maintain a quality of zero for an expired Brewfest Sampler', () => {
    const sellIn = 0;
    const quality = 0;

    const brewfestSampler = new Item('Brewfest Sampler', sellIn, quality);

    const shop = new Shop([brewfestSampler]).updateQuality();

    expect(shop.items[0].quality).toBe(0);
  });

  it('should increase Aged Brie\'s quality by one', () => {
    const sellIn = 10;
    const quality = 5;

    const agedBrie = new Item('Aged Brie', sellIn, quality);

    const shop = new Shop([agedBrie]).updateQuality();

    expect(shop.items[0].quality).toBe(6);
  });

  it('should increase Aged Brie\'s quality by one even if it has expired', () => {
    const sellIn = 0;
    const quality = 5;

    const agedBrie = new Item('Aged Brie', sellIn, quality);

    const shop = new Shop([agedBrie]).updateQuality();

    expect(shop.items[0].quality).toBe(6);
  });

  it('should prevent Aged Brie\'s quality from exceeding fifty', () => {
    const sellIn = 10;
    const quality = 50;

    const agedBrie = new Item('Aged Brie', sellIn, quality);

    const shop = new Shop([agedBrie]).updateQuality();

    expect(shop.items[0].quality).toBe(50);
  });

  it('should prevent Aged Brie\'s quality from exceeding fifty even after expiring', () => {
    const sellIn = 0;
    const quality = 50;

    const agedBrie = new Item('Aged Brie', sellIn, quality);

    const shop = new Shop([agedBrie]).updateQuality();

    expect(shop.items[0].quality).toBe(50);
  });

  it('should maintain the expiration and quality of "Sulfuras, Hand of Ragnaros" over time', () => {
    const sellIn = 50;
    const quality = 5;

    const sulfuras = new Item('Sulfuras, Hand of Ragnaros', sellIn, quality);

    const shop = new Shop([sulfuras])
      .updateQuality()
      .updateQuality()
      .updateQuality();

    expect(shop.items[0].sellIn).toBe(sellIn);
    expect(shop.items[0].quality).toBe(quality);
  });

  it('should increase the quality of "Backstage passes to a TAFKAL80ETC concert" by one if the sellIn is more than ten days', () => {
    const sellIn = 50;
    const quality = 5;

    const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([backstagePasses]).updateQuality();

    expect(shop.items[0].quality).toBe(6);
  });

  it('should prevent the quality of "Backstage passes to a TAFKAL80ETC concert" from exceeding fifty', () => {
    const sellIn = 50;
    const quality = 50;

    const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([backstagePasses]).updateQuality();

    expect(shop.items[0].quality).toBe(50);
  });

  it('should increase the quality of "Backstage passes to a TAFKAL80ETC concert" by two if the sellIn is ten days or less', () => {
    const sellIn = 10;
    const quality = 5;

    const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([backstagePasses]).updateQuality();

    expect(shop.items[0].quality).toBe(7);
  });

  it('should increase the quality of "Backstage passes to a TAFKAL80ETC concert" by three if the sellIn is five days or less', () => {
    const sellIn = 5;
    const quality = 5;

    const brewfestSampler = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([brewfestSampler]).updateQuality();

    expect(shop.items[0].quality).toBe(8);
  });

  it('should drop the quality of "Backstage passes to a TAFKAL80ETC concert" to zero when it expires', () => {
    const sellIn = 0;
    const quality = 5;

    const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);

    const shop = new Shop([backstagePasses]).updateQuality();

    expect(shop.items[0].quality).toBe(0);
  });
});
