class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  copy() {
    return new Item(this.name, this.sellIn, this.quality);
  }
}

module.exports = {Item};
