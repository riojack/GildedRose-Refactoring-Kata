const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

const updateAgedBrie = (item) => {
  if (item.quality >= 50) {
    return;
  }

  item.quality = item.quality + 1;
};

const updateBackstagePass = (item) => {
  if (item.quality >= 50) {
    return;
  }

  item.quality = item.quality + 1;

  if (item.sellIn === 0) {
    item.quality = 0;
  } else if (item.sellIn <= 5) {
    item.quality = item.quality + 2;
  } else if (item.sellIn <= 10) {
    item.quality = item.quality + 1;
  }
};

const updateCommonItem = (item) => {
  if (item.quality <= 0) {
    return;
  }

  item.quality = item.quality - 1;
  if (item.sellIn === 0) {
    item.quality = item.quality - 1;
  }
};

const updateItem = (item) => {
  if (item.name === SULFURAS) {
    return item;
  }

  if (item.sellIn > 0) {
    item.sellIn = item.sellIn - 1;
  }

  if (item.name === BRIE) {
    updateAgedBrie(item);
  } else if (item.name === PASSES) {
    updateBackstagePass(item);
  } else {
    updateCommonItem(item);
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
