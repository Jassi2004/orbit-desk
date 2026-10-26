import { TEAM_DISCOUNT_BASIS_POINTS } from "../config/seat-pricing.js";

/** Monthly seat billing, in integer cents. Three or more seats receive 10% off. */
export function totalMonthlyCents(seats, unitPriceCents = 4000) {
  if (!Number.isInteger(seats) || seats < 1)
    throw new RangeError("Seats must be a positive integer.");
  if (!Number.isInteger(unitPriceCents) || unitPriceCents < 0)
    throw new RangeError("Unit price must be non-negative integer cents.");
  const subtotal = seats * unitPriceCents;
  const discountBasisPoints = seats >= 3 ? TEAM_DISCOUNT_BASIS_POINTS : 0;
  return Math.ceil((subtotal * (10000 - discountBasisPoints)) / 10000);
}
