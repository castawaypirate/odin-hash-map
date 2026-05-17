import HashMap from "./hash-map.js";
import HashSet from "./hash-set.js";

const set = new HashSet();

set.add("apple");
set.add("banana");
set.add("carrot");
set.add("dog");
set.add("elephant");
set.add("frog");
set.add("grape");
set.add("hat");
set.add("ice cream");
set.add("jacket");
set.add("kite");
set.add("lion");
set.add("lion");
set.add("moon");
set.add("moon");
set.add("silver");

console.log(set.has("test"));
console.log(set.has("dog"));
console.log(set.has("lion"));

console.log(set.remove("lion"));
console.log(set.remove("dog"));

console.log(set.has("lion"));
console.log(set.has("dog"));
console.log(set.values());

set.print();
console.log(set.length());

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

console.log(map.get("apple"));
console.log(map.get("red"));

console.log(map.has("apple"));
console.log(map.has("red"));

console.log(map.remove("dog"));
console.log(map.remove("horse"));

console.log(map.length());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());

map.set("moon", "silver");
map.set("sun", "helion");

console.log(map.length());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());

map.print();
