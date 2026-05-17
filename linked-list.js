class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    let newnode = new Node(value);
    if (!this.head) {
      this.head = newnode;
      return true;
    }
    let current = this.head;
    while (current.next) {
      if (current.value === value) {
        current = newnode;
        return false;
      }
      current = current.next;
    }
    if (current.value === value) {
      current = newnode;
      return false;
    }

    current.next = newnode;
    return true;
  }

  has(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  delete(value) {
    if (!this.head) {
      return;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let prev = null;
    let current = this.head;
    while (current && current.value !== value) {
      prev = current;
      current = current.next;
    }
    if (!current) {
      return;
    }
    prev.next = current.next;
  }

  toArray() {
    let current = this.head;
    let temp = [];
    while (current) {
      temp.push(current.value);
      current = current.next;
    }
    return temp;
  }

  toString() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value + "->";
      current = current.next;
    }
    return result + "null";
  }
}
