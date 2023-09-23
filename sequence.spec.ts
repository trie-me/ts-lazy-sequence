import { sequence } from "./sequence";

describe('sequence', () => {
  it('should multiply all numbers in the sequence by 2', () => {
    const data = [1, 2, 3]
    const seq = sequence(data).map(v => v * 2).toArray();
    expect(seq).toEqual([2, 4, 6])
  })

  it('should pass iteration indices correctly', () => {
    const data = [1, 2, 3]
    const seq = sequence(data).map((v, i) => i).toArray();
    expect(seq).toEqual([0, 1, 2])
  })

  it('should pass iteration indices correctly in foreach', () => {
    const data = [1, 2, 3]
    const result: number[] = [];
    const seq = sequence(data).map((v, i) => i)
      .forEach(v => result.push(v));
    expect(result).toEqual([0, 1, 2])
  })

  it('should sum all numbers', () => {
    const data = [1, 2, 3]
    const seq = sequence(data).map(v => v * 2).reduce((acc, val) => acc + val, 0);
    expect(seq).toEqual(12)
  })

  it('should sum indices', () => {
    const data = [1, 2, 3]
    const seq = sequence(data).map((v,i) => i).reduce((acc, val) => acc + val, 0);
    expect(seq).toEqual(3)
  })

  it('should sum all numbers in raw array', () => {
    const data = [1, 2, 3]
    const seq = sequence(data).reduce((acc, val) => acc + val, 0);
    expect(seq).toEqual(6)
  })

  it('should foreach and produce 6', () => {
    const data = [1, 2, 3]
    let result = 0
    const seq = sequence(data).forEach(v => { result = result + v })
    expect(result).toEqual(6)
  })

  it('should filter 6', () => {
    const data = [1, 2, 3]
    const seq = sequence(data).map(val => {
      return val * 2
    }).filter(v => v <= 4).toArray()
    expect(seq).toEqual([2, 4])
  })

  it('should printf lazy evaluation order', () => {
    const data = [1, 2, 3]
    const result: string[] = [];
    const seq = sequence(data).map(val => {
      result.push('map');
      return val * 2
    }).reduce((acc, val) => {
      result.push('reduce');
      return acc + val
    }, 0);
    expect(result).toEqual(['map', 'reduce', 'map', 'reduce', 'map', 'reduce'])
  })
});