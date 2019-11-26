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
    const updatedItems = this.items.map((item) => {
      const updatedItem = item.copy();

      if (updatedItem.name == SULFURAS) {
        return updatedItem;
      }

      if (updatedItem.name == BRIE || updatedItem.name == PASSES) {
        updateQualityForAgedBrieOrBackstagePasses(updatedItem);
      } else if (updatedItem.quality > 0) {
        updatedItem.quality = updatedItem.quality - 1;
      }

      updatedItem.sellIn = updatedItem.sellIn - 1;

      if (updatedItem.sellIn < 0) {
        updatedItem.sellIn = 0;
        if (updatedItem.name != BRIE) {
          if (updatedItem.name != PASSES) {
            if (updatedItem.quality > 0) {
              updatedItem.quality = updatedItem.quality - 1;
            }
          } else {
            updatedItem.quality = 0;
          }
        }
      }

      return updatedItem;
    });

    return new Shop(updatedItems);
  }
}

module.exports = {
  Shop
};
