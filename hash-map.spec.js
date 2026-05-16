import HashMap from "./hash-map";

describe("HashMap", () => {
  let map;

  beforeEach(() => {
    map = new HashMap();
  });

  describe("Basic Operations: set(), get(), has(), length()", () => {
    test("length() starts at 0", () => {
      expect(map.length()).toBe(0);
    });

    test("set() adds a new key-value pair and get() retrieves it", () => {
      map.set("apple", "red");
      expect(map.get("apple")).toBe("red");
      expect(map.length()).toBe(1);
    });

    test("get() returns null for a key that does not exist", () => {
      expect(map.get("missingKey")).toBeNull();
    });

    test("has() returns true for existing keys and false for missing keys", () => {
      map.set("apple", "red");
      expect(map.has("apple")).toBe(true);
      expect(map.has("banana")).toBe(false);
    });

    test("set() overwrites the value if the key already exists", () => {
      map.set("apple", "red");
      map.set("apple", "green"); // Overwrite

      expect(map.get("apple")).toBe("green");
      expect(map.length()).toBe(1); // Length should NOT increase
    });
  });

  describe("Removal Operations: remove(), clear()", () => {
    beforeEach(() => {
      map.set("apple", "red");
      map.set("banana", "yellow");
    });

    test("remove() deletes the entry and returns true", () => {
      const result = map.remove("apple");
      expect(result).toBe(true);
      expect(map.has("apple")).toBe(false);
      expect(map.length()).toBe(1);
    });

    test("remove() returns false if the key does not exist", () => {
      const result = map.remove("carrot");
      expect(result).toBe(false);
      expect(map.length()).toBe(2);
    });

    test("clear() completely empties the hash map", () => {
      map.clear();
      expect(map.length()).toBe(0);
      expect(map.has("apple")).toBe(false);
      expect(map.has("banana")).toBe(false);
    });
  });

  describe("Data Retrieval: keys(), values(), entries()", () => {
    beforeEach(() => {
      map.set("apple", "red");
      map.set("banana", "yellow");
      map.set("carrot", "orange");
    });

    test("keys() returns an array of all keys", () => {
      const keys = map.keys();
      expect(keys.length).toBe(3);
      expect(keys).toEqual(
        expect.arrayContaining(["apple", "banana", "carrot"]),
      );
    });

    test("values() returns an array of all values", () => {
      const values = map.values();
      expect(values.length).toBe(3);
      expect(values).toEqual(
        expect.arrayContaining(["red", "yellow", "orange"]),
      );
    });

    test("entries() returns an array of [key, value] pairs", () => {
      const entries = map.entries();
      expect(entries.length).toBe(3);
      expect(entries).toEqual(
        expect.arrayContaining([
          ["apple", "red"],
          ["banana", "yellow"],
          ["carrot", "orange"],
        ]),
      );
    });
  });

  describe("Dynamic Resizing (Growth Functionality)", () => {
    test("successfully resizes when exceeding the load factor without losing data", () => {
      // 1. Populate to exactly the load factor (16 * 0.75 = 12 items)
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

      expect(map.length()).toBe(12);

      // 2. Add the 13th item to trigger the capacity doubling (16 to 32 buckets)
      map.set("moon", "silver");

      // 3. Verify total length is correctly tracked
      expect(map.length()).toBe(13);

      // 4. Verify EVERY single item survived the rehashing process
      expect(map.get("apple")).toBe("red");
      expect(map.get("dog")).toBe("brown");
      expect(map.get("lion")).toBe("golden");
      expect(map.get("moon")).toBe("silver");
    });

    test("methods still work as expected after expansion", () => {
      // Trigger expansion
      for (let i = 0; i < 15; i++) {
        map.set(`key${i}`, `value${i}`);
      }

      // Overwrite an existing node post-expansion
      map.set("key0", "NEW_VALUE");
      expect(map.get("key0")).toBe("NEW_VALUE");
      expect(map.length()).toBe(15); // Length shouldn't change on overwrite

      // Remove an item post-expansion
      expect(map.remove("key1")).toBe(true);
      expect(map.has("key1")).toBe(false);
      expect(map.length()).toBe(14);

      // Check full arrays
      expect(map.keys().length).toBe(14);
      expect(map.values().length).toBe(14);
    });
  });
});
