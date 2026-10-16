export default function toPositiveIntegerIds(value: unknown[]): number[] {
  return value.filter(
    (val): val is number =>
      typeof val === "number" && Number.isInteger(val) && val > 0,
  );
}
