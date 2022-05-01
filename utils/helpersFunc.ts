export const checkObjectProperty = (obj: object, prop: string): boolean => obj.hasOwnProperty(prop) && obj[prop] !== '' && obj[prop] !== null && obj[prop] !== undefined
