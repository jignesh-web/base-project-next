// type Join<K, P> = K extends string | number
//   ? P extends string | number
//     ? `${K}.${P}`
//     : never
//   : never;

// type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

// type Paths<T, D extends number = 5> = [D] extends [never]
//   ? string
//   : T extends object
//   ? {
//       [K in keyof T]: K extends string | number
//         ?
//             | `${K}`
//             | (Paths<T[K], Prev[D]> extends ""
//                 ? `${K}`
//                 : Join<K, Paths<T[K], Prev[D]>>)
//         : never;
//     }[keyof T]
//   : "";

// type NestedValue<T, P, D extends number = 5> = [D] extends [never]
//   ? T extends object
//     ? unknown
//     : never
//   : P extends `${infer Key}.${infer Rest}`
//   ? Key extends keyof T
//     ? NestedValue<T[Key], Rest, Prev[D]>
//     : never
//   : P extends keyof T
//   ? T[P]
//   : never;

type Paths<T> = any;
type NestedValue<T, P> = any;

export function getNestedValue<T extends object, P extends Paths<T>>(
  object: T,
  path: P
): NestedValue<T, P> {
  const keys = (path as string).split(".");

  let current: object = object;
  for (const key of keys) {
    if (current && typeof current === "object") {
      current = current[key as keyof typeof current];
    }
  }
  return current as NestedValue<T, P>;
}
