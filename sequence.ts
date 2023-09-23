export type Sequence<T> = {
  map<U>(mapper: (value: T, index: number) => U): Sequence<U>;
  filter(predicate: (value: T) => boolean): Sequence<T>;
  reduce<U>(reducer: (accumulator: U, current: T, index: number) => U, initialValue: U): U;
  forEach(action: (value: T, index: number) => void): void;
  toArray(): T[];
};

function* mapGenerator<T, U>(arg: T[] | Generator<T, void, unknown>, map: (value: T, index: number) => U) {
  let i = 0;
  for (let item of arg) {
    yield map(item, i++)
  };
}

function* filterGenerator<T, U>(arg: T[] | Generator<T, void, unknown>, predicate: (value: T) => boolean) {
  for (let item of arg) {
    if (predicate(item)) yield item;
  };
}

export function sequence<T>(elements: T[] | Generator<T, void, unknown>): Sequence<T> {
  return {
    map<U>(mapper: (value: T, index: number) => U): Sequence<U> {
      return sequence(mapGenerator(elements, mapper))
    },

    filter(predicate: (value: T) => boolean): Sequence<T> {
      return sequence(filterGenerator(elements, predicate))
    },

    reduce<U>(reducer: (accumulator: U, current: T, index: number) => U, initialValue: U): U {
      if (elements instanceof Array) return elements.reduce(reducer, initialValue);
      let i = 0;
      let acc = initialValue;
      for (let item of elements) {
        acc = reducer(acc, item, i++);
      }
      return acc;
    },

    forEach(action: (value: T, index: number) => void): void {
      let i = 0
      for (let item of elements) action(item, i++);
    },

    toArray(): T[] {
      return [...elements];
    },
  };
}