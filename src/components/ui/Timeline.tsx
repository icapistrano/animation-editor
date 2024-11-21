import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { Seekbar } from "./Seekbar";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { calculatePercentages, formatTimestamp, msToPercentage, percentageToMs } from "../../utils/utils";

interface TimelineProps {
  /**
   * The maximum value in milliseconds (MS) to represent the end of the timeline.
   * This determines the total duration of the timeline.
   */
  max: number;

  /**
   * The interval in milliseconds (MS) between each timestamp in the timeline.
   * For example, if the interval is 1000ms, timestamps will appear at 0ms, 1000ms, 2000ms, etc.
   */
  interval: number;

  /**
   * The intermediate interval in milliseconds (MS) to generate additional timestamps between each major interval.
   * This value determines how frequently intermediate timestamps are added between the main ones.
   */
  intermediateInterval: number;

  /**
   * The current timestamp in milliseconds (MS) that represents the current position on the timeline.
   * This value is used to track and update the current state of the timeline.
   */
  timestamp: number;

  /**
   * Callback function to update the current timestamp.
   * This function is used to modify the `timestamp` value (e.g., when the user moves along the timeline).
   */
  setTimestamp: (val: number) => void;
}

export const Timeline: FC<TimelineProps> = ({ max, interval, intermediateInterval, timestamp, setTimestamp }) => {
  const timestampIntervals = useMemo(() => calculatePercentages(max, interval), [max, interval]);
  const timestamps = useMemo(() => {
    return timestampIntervals.map((timestampInterval) => {
      const ms = (timestampInterval / 100) * max;
      return formatTimestamp(ms);
    });
  }, [timestampIntervals, max]);

  const intermediateIntervals = useMemo(() => {
    const majorIntervals = timestampIntervals.map((i) => (i / 100) * max);
    const majorIntervalSet = new Set(majorIntervals);

    const _intermediateIntervals: number[] = [];
    for (let i = 0; i < majorIntervals.length - 1; i++) {
      const start = majorIntervals[i];
      const end = majorIntervals[i + 1];

      // Add intermediate intervals
      for (let j = start + intermediateInterval; j <= end; j += intermediateInterval) {
        if (majorIntervalSet.has(j)) continue;
        _intermediateIntervals.push(msToPercentage(j, max));
      }
    }

    return _intermediateIntervals;
  }, [timestampIntervals, max, intermediateInterval]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [seekBarPosition, setSeekbarPosition] = useState(0);

  const onMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current || !isMouseDown) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const ms = ((e.clientX - left) / width) * max; // normalised between 0 - max
    const clampedMs = Math.min(Math.max(ms, 0), max); // clamp between 0 - max
    const percentage = Math.round(msToPercentage(clampedMs, max)); // Calculate the percentage
    setSeekbarPosition(percentage);
  };

  useEffect(() => {
    if (seekBarPosition >= 100) {
      setIsPlaying(false);
    }

    const ms = percentageToMs(seekBarPosition, max);
    setTimestamp(ms);
  }, [seekBarPosition]);

  useEffect(() => {
    if (!isPlaying) return;

    if (seekBarPosition >= 100) {
      setSeekbarPosition(0);
    }

    const intervalId = setInterval(() => {
      setSeekbarPosition((seekBarPosition) => (seekBarPosition += 1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  useEffect(() => {
    const mouseDownFn = () => setIsMouseDown(true);
    const mouseUpFn = () => setIsMouseDown(false);

    window.document.addEventListener("mousedown", mouseDownFn);
    window.document.addEventListener("mouseup", mouseUpFn);

    return () => {
      window.document.removeEventListener("mousedown", mouseDownFn);
      window.document.removeEventListener("mouseup", mouseUpFn);
    };
  }, []);

  return (
    <div className="relative w-full select-none">
      <div className="flex w-full justify-center items-center gap-x-2">
        {isPlaying ? (
          <IconPlayerPauseFilled onClick={() => setIsPlaying(false)} />
        ) : (
          <IconPlayerPlayFilled onClick={() => setIsPlaying(true)} />
        )}
        <h2>
          {formatTimestamp(timestamp)} / {formatTimestamp(max)}
        </h2>
      </div>

      <div className="border-t border-white mt-5 mb-3"></div>

      <div ref={containerRef} className="relative mx-10 pb-10" onPointerMove={(e) => onMouseMove(e)}>
        <div className="flex items-center h-10">
          {timestampIntervals.map((timestampInterval, idx) => (
            <h2
              key={`timestamp-${idx}`}
              className="absolute bottom-01 -translate-x-1/2"
              style={{ left: `${timestampInterval}%` }}
            >
              {timestamps[idx]}
            </h2>
          ))}

          {intermediateIntervals.map((intermediateInterval) => (
            <div
              key={`dot-${intermediateInterval}`}
              className="absolute bottom-01 -translate-x-1/2"
              style={{ left: `${intermediateInterval}%` }}
            >
              <div className="h-1 w-1 rounded-full bg-white opacity-30"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-3" style={{ left: `${seekBarPosition}%` }}>
          <Seekbar />
        </div>
      </div>
    </div>
  );
};
