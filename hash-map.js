export default class HashMap {
  capacity;
  loadFactor;
  constructor() {
    this.initialize();
  }

  initialize() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.map = [];
    this.size = 0;
    for (let i = 0; i < this.capacity; i++) {
      this.map[i] = [];
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    return hashCode;
  }

  set(key, value) {
    if (!this.has(key)) {
      this.size++;
    }
    if (this.size >= this.capacity * this.loadFactor) {
      this.grow();
    }
    let h = this.hash(key);
    this.map[h][key] = value;
  }

  grow() {
    this.capacity *= 2;
    let temp = [];
    for (let i = 0; i < this.capacity; i++) {
      temp[i] = [];
    }

    for (let i = 0; i < this.map.length; i++) {
      for (let key in this.map[i]) {
        let h = this.hash(key);
        temp[h][key] = this.map[i][key];
      }
    }
    this.map = temp;
  }

  get(key) {
    let h = this.hash(key);
    let value = this.map[h][key];
    if (value) {
      return value;
    }
    return null;
  }

  has(key) {
    if (this.get(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.has(key)) {
      let h = this.hash(key);
      let temp = [];
      for (let el in this.map[h]) {
        if (el !== key) {
          temp[el] = this.map[h][el];
        }
      }
      this.map[h] = temp;
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.initialize();
  }

  keys() {
    let temp = [];
    for (let i = 0; i < this.map.length; i++) {
      for (let key in this.map[i]) {
        temp.push(key);
      }
    }
    return temp;
  }

  values() {
    let temp = [];
    for (let i = 0; i < this.map.length; i++) {
      for (let key in this.map[i]) {
        temp.push(this.map[i][key]);
      }
    }
    return temp;
  }

  entries() {
    let temp = [];
    for (let i = 0; i < this.map.length; i++) {
      for (let key in this.map[i]) {
        temp.push([key, this.map[i][key]]);
      }
    }
    return temp;
  }

  print() {
    for (let i = 0; i < this.map.length; i++) {
      const label = String(i).padEnd(3, "   ") + ":";
      console.log(label, this.map[i]);
    }
  }
}
