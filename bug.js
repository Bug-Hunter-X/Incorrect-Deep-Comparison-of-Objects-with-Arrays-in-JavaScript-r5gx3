function foo(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!b.hasOwnProperty(key) || !foo(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

const a = { a: 1, b: { c: 3 } };
const b = { a: 1, b: { c: 3 } };
console.log(foo(a, b)); // true

const c = { a: 1, b: { c: 3 } };
const d = { a: 1, b: { c: 4 } };
console.log(foo(c, d)); // false

const e = { a: 1, b: { c: 3 } };
const f = { a: 1, b: { c: 3 }, d: 4 };
console.log(foo(e, f)); // false

const g = { a: 1, b: [1, 2, 3] };
const h = { a: 1, b: [1, 2, 3] };
console.log(foo(g, h)); //false, this is the bug