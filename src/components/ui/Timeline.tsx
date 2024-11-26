import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { Seekbar } from "./Seekbar";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { calculatePercentages, formatTimestamp, msToPercentage, percentageToMs } from "../../utils/utils";
import { Keyframe } from "./Keyframe";
import { CameraMetadata } from "../../state-management/CameraConfig.store";
import { Button } from "./Button";

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

  keyframes: CameraMetadata[];

  selectedKeyframe?: CameraMetadata;

  setKeyframe: (keyframe?: CameraMetadata) => void;

  updateKeyframe: (keyframe: Partial<CameraMetadata>) => void;
}

export const Timeline: FC<TimelineProps> = ({
  max,
  interval,
  intermediateInterval,
  timestamp,
  setTimestamp,
  keyframes,
  setKeyframe,
  selectedKeyframe,
  updateKeyframe,
}) => {
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

  const maxKeyframePercentage = useMemo(
    () => msToPercentage(keyframes[keyframes.length - 1].timestamp, max),
    [keyframes],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [seekBarPosition, setSeekbarPosition] = useState(0);
  const [isSeekbarHovered, setIsSeekbarHovered] = useState(false);
  const [isSeekbarDraggable, setIsSeekbarDraggable] = useState(false);

  const [isKeyframeDraggable, setIsKeyframeDraggable] = useState(false);
  const [isKeyframeHovered, setIsKeyframeHovered] = useState(false);

  useEffect(() => {
    // check if user clicks on seekbar
    setIsSeekbarDraggable(isMouseDown && isSeekbarHovered);

    // check if user clicks
    setIsKeyframeDraggable(isMouseDown && isKeyframeHovered);
  }, [isMouseDown]);

  const onMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current || isPlaying) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const ms = ((e.clientX - left) / width) * max; // normalised between 0 - max
    const clampedMs = Math.min(Math.max(ms, 0), max); // clamp between 0 - max
    const percentage = Math.round(msToPercentage(clampedMs, max)); // Calculate the percentage

    if (isSeekbarDraggable) {
      setSeekbarPosition(percentage);
      return;
    }

    if (isKeyframeDraggable) {
      updateKeyframe({ timestamp: percentageToMs(percentage, max) });
    }
  };

  useEffect(() => {
    if (seekBarPosition >= maxKeyframePercentage) {
      setIsPlaying(false);
    }

    const ms = percentageToMs(seekBarPosition, max);
    setTimestamp(ms);
  }, [seekBarPosition]);

  useEffect(() => {
    if (!isPlaying) return;

    if (seekBarPosition >= maxKeyframePercentage) {
      setSeekbarPosition(0);
    }

    const intervalId = setInterval(() => {
      setSeekbarPosition((seekBarPosition) => (seekBarPosition += 1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="relative w-full select-none flex flex-col px-10 py-5 rounded-lg bg-secondary bg-opacity-95">
      <div className="relative flex w-full justify-center items-center mb-2 gap-x-2">
        <div className="flex gap-x-2 items-center">
          {isPlaying ? (
            <Button icon={<IconPlayerPauseFilled />} onClick={() => setIsPlaying(false)} />
          ) : (
            <Button icon={<IconPlayerPlayFilled />} onClick={() => setIsPlaying(true)} />
          )}
          <h2>
            {formatTimestamp(timestamp)} / {formatTimestamp(max)}
          </h2>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mx-10 flex flex-col"
        onPointerMove={(e) => onMouseMove(e)}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <div className="border-t border-tertiary mt-2 mb-5 -mx-10"></div>

        <div className="flex items-center h-10">
          {timestampIntervals.map((timestampInterval, idx) => (
            <h2
              key={`timestamp-${idx}`}
              className="absolute -translate-x-1/2"
              style={{ left: `${timestampInterval}%` }}
            >
              {timestamps[idx]}
            </h2>
          ))}

          {intermediateIntervals.map((intermediateInterval) => (
            <div
              key={`dot-${intermediateInterval}`}
              className="absolute -translate-x-1/2"
              style={{ left: `${intermediateInterval}%` }}
            >
              <div className="h-1 w-1 rounded-full bg-tertiary opacity-50"></div>
            </div>
          ))}
        </div>

        <div className="h-10 mb-5">
          {keyframes.map((keyframe) => (
            <div
              key={`keyframe-${keyframe.label}`}
              className="absolute -translate-x-1/2"
              style={{ left: `${msToPercentage(keyframe.timestamp, max)}%` }}
            >
              <Keyframe
                isSelected={keyframe === selectedKeyframe}
                isDisabled={selectedKeyframe !== undefined && keyframe !== selectedKeyframe}
                onClick={() => setKeyframe(keyframe)}
                onHoverChange={setIsKeyframeHovered}
              />
            </div>
          ))}
        </div>

        <div className="absolute h-full" style={{ left: `${seekBarPosition}%` }}>
          <Seekbar onHoverChange={setIsSeekbarHovered} />
        </div>
      </div>
    </div>
  );
};
