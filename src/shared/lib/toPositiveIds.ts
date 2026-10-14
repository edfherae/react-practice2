export default function toPositiveIds(value: unknown[]): number[] {
  return value.filter(
    (val): val is number =>
      typeof val === "number" && Number.isFinite(val) && val > 0,
  );
}
