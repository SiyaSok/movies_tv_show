/** @format */

export const getRatingColor = (rating) => {
  if (rating >= 8) return "text-emerald-400";
  if (rating >= 6) return "text-amber-400";
  if (rating >= 4) return "text-orange-400";
  return "text-red-400";
};
