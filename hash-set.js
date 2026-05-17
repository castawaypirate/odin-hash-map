import LinkedList from "./linked-list.js";

export default class HashSet {
  capacity;
  loadFactor;
  constructor() {
    this.initialize(16);
  }

  initialize(capacity) {
    this.capacity = capacity;
    this.loadFactor = 0.75;
    this.set = [];
    this.size = 0;
    for (let i = 0; i < this.capacity; i++) {
      this.set[i] = null;
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

  add(value) {
    if (this.size >= this.capacity * this.loadFactor) {
      this.grow();
    }

    let h = this.hash(value);
    if (this.set[h]) {
      if (!this.set[h].append(value)) {
        return;
      }
    } else {
      this.set[h] = new LinkedList();
      this.set[h].append(value);
    }
    this.size++;
  }

  grow() {
    let temp = [];
    for (let i = 0; i < this.set.length; i++) {
      if (this.set[i]) {
        for (let value of this.set[i].toArray()) {
          temp.push(value);
        }
      }
    }
    this.capacity *= 2;
    this.initialize(this.capacity);
    for (let value of temp) {
      this.add(value);
    }
  }

  has(value) {
    let h = this.hash(value);
    if (this.set[h]) {
      return this.set[h].has(value);
    }
    return false;
  }

  remove(value) {
    if (this.has(value)) {
      let h = this.hash(value);
      this.set[h].delete(value);
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.initialize(16);
  }

  values() {
    let temp = [];
    for (let i = 0; i < this.set.length; i++) {
      if (this.set[i]) {
        for (let value of this.set[i].toArray()) {
          temp.push(value);
        }
      }
    }
    return temp;
  }

  print() {
    for (let i = 0; i < this.set.length; i++) {
      const label = String(i).padEnd(3, "   ") + ": ";
      if (this.set[i]) {
        console.log(label, this.set[i].toString());
      } else {
        console.log(label, "null");
      }
    }
  }
}
