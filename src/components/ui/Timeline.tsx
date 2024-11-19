import classNames from "classnames";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { Seekbar } from "./Seekbar";

export const Timeline: FC = () => {
  const jumpInterval = 5;
  const seconds = Array.from({ length: 11 }).map((_, idx) => (idx < 10 ? `0:0${idx}` : `0:${idx}`));

  const containerRef = useRef<HTMLDivElement>(null);

  const [seekBarPosition, setSeekbarPosition] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const onMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current || !isMouseDown) return;

    const { left, width } = containerRef.current.getBoundingClientRect();

    const percentage = ((e.clientX - left) / width) * 100;
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    setSeekbarPosition(Math.round(clampedPercentage));
  };

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
    <div className="relative w-full select-none h-full">
      <div className="border-t border-white"></div>

      <div ref={containerRef} className="relative flex1 mx-10 h-full pt-6" onPointerMove={(e) => onMouseMove(e)}>
        <div className="flex items-center">
          {/* Timestamps */}
          {seconds.map((second, idx) => (
            <h2 className="absolute -translate-x-1/2" style={{ left: `${idx * 10}%` }}>
              {second}
            </h2>
          ))}

          {/* Intermediate dots */}
          {seconds.map((_, idx) =>
            Array.from({ length: jumpInterval - 1 }).map((__, intervalIdx) => (
              <div
                key={`dot-${idx}-${intervalIdx}`}
                className={classNames("absolute -translate-x-1/2", {
                  hidden: idx === seconds.length - 1,
                })}
                style={{ left: `${idx * 10 + ((intervalIdx + 1) * 10) / jumpInterval}%` }}
              >
                <div className="h-1 w-1 rounded-full bg-white opacity-30"></div>
              </div>
            )),
          )}
        </div>

        {/* Seekbar */}
        <div className="absolute -top-4" style={{ left: `${seekBarPosition}%` }}>
          <Seekbar />
        </div>
      </div>
    </div>
  );
};
