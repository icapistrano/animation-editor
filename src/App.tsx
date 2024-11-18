import { CameraView } from "./components/r3f/CameraView";
import { InteractiveScene } from "./components/r3f/InteractiveScene";

function App() {
  return (
    <main className="relative w-full h-screen bg-primary">
      <InteractiveScene />
      <CameraView />
    </main>
  );
}

export default App;
