const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

const updateAgedBrie = (item) => {
  const {quality} = item;

  if (quality >= 50) {
    return;
  }

  item.quality = quality + 1;
};

const updateBackstagePass = (item) => {
  const {quality, sellIn} = item;

  if (quality >= 50) {
    return;
  }

  if (sellIn === 0) {
    item.quality = 0;
  } else if (sellIn <= 5) {
    item.quality = quality + 3;
  } else if (sellIn <= 10) {
    item.quality = quality + 2;
  } else {
    item.quality = quality + 1;
  }
};

const updateCommonItem = (item) => {
  const {quality, sellIn} = item;

  if (quality <= 0) {
    return;
  }

  if (sellIn === 0) {
    item.quality = quality - 2;
  } else {
    item.quality = quality - 1;
  }
};

const updateItem = (item) => {
  const {name, sellIn} = item;

  if (name === SULFURAS) {
    return item;
  }

  if (sellIn >= 1) {
    item.sellIn = sellIn - 1;
  }

  if (name === BRIE) {
    updateAgedBrie(item);
  } else if (name === PASSES) {
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
