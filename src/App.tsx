import { CameraView } from "./components/r3f/CameraView";
import { InteractiveScene } from "./components/r3f/InteractiveScene";
import { Timeline } from "./components/ui/Timeline";
import { cameraConfigStore } from "./state-management/CameraConfig.store";
import { observer } from "mobx-react";

const App = observer(() => {
  const { max, interval, intermediateInterval, currentTimestamp, setCurrentTimestamp } = cameraConfigStore;

  return (
    <main className="relative w-full h-screen bg-primary">
      <InteractiveScene />
      <CameraView />

      <div className="absolute bottom-0 w-full px-20 mb-5">
        <Timeline
          max={max}
          interval={interval}
          intermediateInterval={intermediateInterval}
          timestamp={currentTimestamp}
          setTimestamp={setCurrentTimestamp}
        />
      </div>
    </main>
  );
});

export default App;
