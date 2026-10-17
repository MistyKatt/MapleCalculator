/** A named attribute with independently stored flat and percentage values. */
export interface BaseAttribute {
  name: string;
  /** Percentage points in [0, 100], e.g. 25 means 25%. */
  percentage: number;
  /** Finite, nonnegative value. */
  value: number;
  /** Finite, nonnegative final value; no formula is assumed. */
  valueFinal: number;
}

export function isBaseAttribute(value: unknown): value is BaseAttribute {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const attribute = value as Record<string, unknown>;
  return (
    typeof attribute.name === "string" &&
    typeof attribute.percentage === "number" &&
    Number.isFinite(attribute.percentage) &&
    attribute.percentage >= 0 &&
    attribute.percentage <= 100 &&
    typeof attribute.value === "number" &&
    Number.isFinite(attribute.value) &&
    attribute.value >= 0 &&
    typeof attribute.valueFinal === "number" &&
    Number.isFinite(attribute.valueFinal) &&
    attribute.valueFinal >= 0
  );
}
