import { CameraView } from "./components/r3f/CameraView";
import { InteractiveScene } from "./components/r3f/InteractiveScene";
import { Timeline } from "./components/ui/Timeline";

function App() {
  return (
    <main className="relative w-full h-screen bg-primary">
      <InteractiveScene />
      <CameraView />

      <div className="absolute bottom-0 w-full px-20 mb-3 h-36 bg-slate-1001">
        <Timeline />
      </div>
    </main>
  );
}

export default App;
