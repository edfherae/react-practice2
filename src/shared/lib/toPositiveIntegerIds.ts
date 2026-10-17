import { isPositiveInteger } from "./isPositiveInteger";

export default function toPositiveIntegerIds(value: unknown[]): number[] {
  return value.filter(isPositiveInteger);
}
