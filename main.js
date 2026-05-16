import HashMap from "./hash-map.js";

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");
map.set("lion", "mustard");

// console.log(map.get("apple"));
// console.log(map.get("red"));

// console.log(map.has("apple"));
// console.log(map.has("red"));

// console.log(map.remove("dog"));
// console.log(map.remove("horse"));

console.log(map.length());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
map.set("moon", "silver");
console.log(map.length());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
map.print();
