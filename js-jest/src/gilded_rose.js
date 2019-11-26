const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

const updateQualityForAgedBrieOrBackstagePasses = (item) => {
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
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name == SULFURAS) {
        return;
      }

      if (item.name == BRIE || item.name == PASSES) {
        updateQualityForAgedBrieOrBackstagePasses(item);
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
    });

    return new Shop();
  }
}

module.exports = {
  Shop
};
