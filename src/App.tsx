import { InteractiveScene } from "./components/r3f/InteractiveScene";
import { ControlBar } from "./components/ui/ControlBar";
import { Timeline } from "./components/ui/Timeline";
import { cameraConfigStore } from "./state-management/CameraConfig.store";
import { observer } from "mobx-react";

const App = observer(() => {
  const {
    max,
    interval,
    intermediateInterval,
    currentTimestamp,
    setCurrentTimestamp,
    cameras,
    setSelectedCamera,
    selectedCamera,
    updateCamera,
  } = cameraConfigStore;

  return (
    <main className="relative w-screen h-screen bg-dark overflow-hidden w-screen h-screen">
      <InteractiveScene />
      {/* <CameraView /> */}

      <div className="w-screen absolute bottom-0 p-5">
        <Timeline
          max={max}
          interval={interval}
          intermediateInterval={intermediateInterval}
          timestamp={currentTimestamp}
          setTimestamp={setCurrentTimestamp}
          keyframes={cameras}
          selectedKeyframe={selectedCamera}
          setKeyframe={setSelectedCamera}
          updateKeyframe={updateCamera}
        />
      </div>

      {selectedCamera !== undefined && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-5">
          <ControlBar />
        </div>
      )}

      {/* <div className="absolute bottom-0 w-full flex flex-col items-end gap-y-5 px-10 bg-secondary py-5">
        <div className="ml-auto bg-white">
          <CameraConfig />
        </div>

        <Timeline
          max={max}
          interval={interval}
          intermediateInterval={intermediateInterval}
          timestamp={currentTimestamp}
          setTimestamp={setCurrentTimestamp}
          keyframes={cameras}
          selectedKeyframe={selectedCamera}
          setKeyframe={setSelectedCamera}
          updateKeyframe={updateCamera}
        />
      </div> */}
    </main>
  );
});

export default App;
