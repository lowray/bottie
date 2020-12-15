export function isIterable(obj : any) {
    if (obj == null || typeof obj == 'string')return false;
    return typeof obj[Symbol.iterator] === 'function';
  }