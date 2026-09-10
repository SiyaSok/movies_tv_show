/** @format */

import { useEffect, useState } from "react";

/**
 * Progress loader.
 * - Pass `progress` (0–100) for a determinate bar.
 * - Omit it for an indeterminate, continuously sweeping bar.
 *
 * <Loader label="Syncing transactions" progress={64} />
 * <Loader label="Fetching data" />
 */
const Loader = ({ label = "Loading", progress }) => {
  const isDeterminate = typeof progress === "number";
  const clamped = isDeterminate ? Math.min(100, Math.max(0, progress)) : 0;

  // Smooth, slightly eased fill so jumps in `progress` don't feel abrupt.
  const [displayValue, setDisplayValue] = useState(clamped);
  useEffect(() => {
    if (!isDeterminate) return;
    const frame = requestAnimationFrame(() => setDisplayValue(clamped));
    return () => cancelAnimationFrame(frame);
  }, [clamped, isDeterminate]);

  return (
    <div className='w-full max-w-sm'>
      <div className='mb-2 flex items-baseline justify-between'>
        <span className='text-sm font-medium text-slate-600'>{label}</span>
        {isDeterminate && (
          <span className='text-sm font-semibold tabular-nums text-slate-900'>
            {Math.round(displayValue)}%
          </span>
        )}
      </div>

      <div
        className='relative h-2 w-full overflow-hidden rounded-full bg-slate-200'
        role='progressbar'
        aria-label={label}
        aria-valuenow={isDeterminate ? Math.round(displayValue) : undefined}
        aria-valuemin={0}
        aria-valuemax={100}>
        {isDeterminate ? (
          <div
            className='h-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 transition-[width] duration-500 ease-out motion-reduce:transition-none'
            style={{ width: `${displayValue}%` }}
          />
        ) : (
          <div className='absolute inset-y-0 w-1/3 animate-loader-sweep rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 motion-reduce:animate-none motion-reduce:w-full motion-reduce:from-slate-300 motion-reduce:to-slate-300' />
        )}
      </div>
    </div>
  );
};

export default Loader;

/*
  Add this to your tailwind.config.js so the sweep animation is available:

  module.exports = {
    theme: {
      extend: {
        keyframes: {
          "loader-sweep": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(300%)" },
          },
        },
        animation: {
          "loader-sweep": "loader-sweep 1.2s ease-in-out infinite",
        },
      },
    },
  };
*/
