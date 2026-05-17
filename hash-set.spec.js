import HashSet from "./hash-set.js";

describe("HashSet", () => {
  let set;

  beforeEach(() => {
    // Creates a fresh hash set before every single test
    set = new HashSet();
  });

  describe("Basic Operations: add(), has(), length()", () => {
    test("length() starts at 0", () => {
      expect(set.length()).toBe(0);
    });

    test("add() inserts a value and has() confirms it exists", () => {
      set.add("apple");
      expect(set.has("apple")).toBe(true);
      expect(set.length()).toBe(1);
    });

    test("has() returns false for a value that does not exist", () => {
      expect(set.has("missingValue")).toBe(false);
    });

    test("add() ignores duplicate values and does not increase length", () => {
      set.add("apple");
      set.add("apple"); // Duplicate

      expect(set.has("apple")).toBe(true);
      expect(set.length()).toBe(1); // Length should NOT increase to 2
    });
  });

  describe("Removal Operations: remove(), clear()", () => {
    beforeEach(() => {
      set.add("apple");
      set.add("banana");
    });

    test("remove() deletes the value and returns true", () => {
      const result = set.remove("apple");
      expect(result).toBe(true);
      expect(set.has("apple")).toBe(false);
      expect(set.length()).toBe(1);
    });

    test("remove() returns false if the value does not exist", () => {
      const result = set.remove("carrot");
      expect(result).toBe(false);
      expect(set.length()).toBe(2);
    });

    test("clear() completely empties the hash set", () => {
      set.clear();
      expect(set.length()).toBe(0);
      expect(set.has("apple")).toBe(false);
      expect(set.has("banana")).toBe(false);
    });
  });

  describe("Data Retrieval: values()", () => {
    beforeEach(() => {
      set.add("apple");
      set.add("banana");
      set.add("carrot");
    });

    test("values() returns an array of all values in the set", () => {
      const values = set.values();
      expect(values.length).toBe(3);
      // expect.arrayContaining checks if all elements exist, regardless of order
      expect(values).toEqual(
        expect.arrayContaining(["apple", "banana", "carrot"]),
      );
    });
  });

  describe("Dynamic Resizing (Growth Functionality)", () => {
    test("successfully resizes when exceeding the load factor", () => {
      // 1. Populate to exactly the load factor (16 * 0.75 = 12 items)
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

      expect(set.length()).toBe(12);

      // 2. Add the 13th item to trigger the capacity doubling (16 to 32 buckets)
      set.add("moon");

      // 3. Verify total length is correctly tracked
      expect(set.length()).toBe(13);

      // 4. Verify items survived the rehashing process
      expect(set.has("apple")).toBe(true);
      expect(set.has("lion")).toBe(true);
      expect(set.has("moon")).toBe(true);
    });
  });
});
