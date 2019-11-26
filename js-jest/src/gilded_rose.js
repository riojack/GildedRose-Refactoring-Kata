const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

const updateAgedBrieOrBackstagePass = (item) => {
  if (item.quality < 50) {
    item.quality = item.quality + 1;

    if (item.name === PASSES) {
      if (item.sellIn < 11) {
        item.quality = item.quality + 1;
      }

      if (item.sellIn < 6) {
        item.quality = item.quality + 1;
      }
    }
  }
};

const updateCommonItem = (item) => {
  if (item.quality > 0) {
    item.quality = item.quality - 1;

    if (item.sellIn === 0) {
      item.quality = item.quality - 1;
    }
  }

};

const updateItem = (item) => {
  if (item.name === SULFURAS) {
    return item;
  }

  if (item.sellIn > 0) {
    item.sellIn = item.sellIn - 1;
  }

  if (item.name === BRIE || item.name === PASSES) {
    updateAgedBrieOrBackstagePass(item);
  } else {
    updateCommonItem(item);
  }

  if (item.sellIn === 0 && item.name === PASSES) {
    item.quality = 0;
  }

  return item;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    const updatedItems =
      this.items
        .map((item) => item.copy())
        .map((item) => updateItem(item));

    return new Shop(updatedItems);
  }
}

module.exports = {
  Shop
};
