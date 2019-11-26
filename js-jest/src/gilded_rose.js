const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (item.name == SULFURAS) {
        continue;
      }

      if (item.name == BRIE || item.name == PASSES) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;

          if (item.name == PASSES) {
            if (item.sellIn < 11) {
              item.quality = item.quality + 1;
            }

            if (item.sellIn < 6) {
              item.quality = item.quality + 1;
            }
          }
        }
      } else if (item.quality > 0) {
        item.quality = item.quality - 1;
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name != BRIE) {
          if (item.name != PASSES) {
            if (item.quality > 0) {
              item.quality = item.quality - 1;
            }
          } else {
            item.quality = 0;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Shop
};
