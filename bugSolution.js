function foo(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!b.hasOwnProperty(key) || !deepCompare(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

function deepCompare(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepCompare(a[i], b[i])) return false;
    }
    return true;
  }
  return foo(a,b);
}

const a = { a: 1, b: { c: 3 } };
const b = { a: 1, b: { c: 3 } };
console.log(deepCompare(a, b)); // true

const c = { a: 1, b: { c: 3 } };
const d = { a: 1, b: { c: 4 } };
console.log(deepCompare(c, d)); // false

const e = { a: 1, b: { c: 3 } };
const f = { a: 1, b: { c: 3 }, d: 4 };
console.log(deepCompare(e, f)); // false

const g = { a: 1, b: [1, 2, 3] };
const h = { a: 1, b: [1, 2, 3] };
console.log(deepCompare(g, h)); //true