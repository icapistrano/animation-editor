import { IconDownload, IconPlayerPlay, IconPlus, IconUpload } from "@tabler/icons-react";
import { Timeline } from "./components/ui/Timeline";
import { Button } from "./components/ui/Button";
import { ConfigContainer } from "./components/ui/ConfigContainer";

function App() {
  return (
    <div className="w-full h-screen bg-primary p-4 flex flex-col gap-4">
      {/* Top row with canvases */}
      <div className="flex flex-row gap-x-2 h-5/6">
        {/* <div className="bg-white rounded-md w-94">canvas</div>
    <div className="border-1 flex flex-col gap-4">
      <div className="bg-white w-full h-64"></div>
      <ConfigContainer />
    </div> */}
        <div className="bg-white rounded-md h-full grow">1st</div>
        <div className="flex flex-col gap-4 border-secondary w-1/3">
          <div className="bg-white w-full h-3/6"></div>
          <ConfigContainer />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button icon={<IconUpload size={20} />} text="Upload model" />
          <div className="h-10 w-px mx-2 bg-gray-300"></div>
          <Button icon={<IconDownload size={20} />} text="Download animation" />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-x-3 p-2">
          <IconPlayerPlay size={20} />
          <span>0:01 / 0:08</span>
        </div>

        <Button icon={<IconPlus size={20} />} text="Add camera" />
      </div>

      {/* Full-width div at the bottom */}
      <Timeline />
    </div>
  );
}

export default App;
