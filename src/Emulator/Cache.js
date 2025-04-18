class Cache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  set(address, value) {
    if (this.cache.size >= this.size) {
      this.evictRandom(); // Remove a random entry if full
    }
    this.cache.set(address, value);
  }

  get(address) {
    return this.cache.get(address);
  }

  getCache() {
    return this.cache;
  }

  //Random Eviction Policy
  evictRandom() {
    let keys = Array.from(this.cache.keys());
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    this.cache.delete(randomKey);
  }
}

export default Cache;
