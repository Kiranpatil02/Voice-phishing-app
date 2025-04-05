import { Body } from "./Components/Body/Body";
import { Deepfakeinfo } from "./Components/Deepfake/Deepfake";
import { Facts } from "./Components/Info/Facts";
import { AudioProcessingFlow } from "./Components/Map/Working";
import { Navbar } from "./Components/Navbar/Navbar";
import img from "./assets/Group 1.svg";
import img2 from "./assets/Group 3.svg";
import img4 from "./assets/Group 5.svg";

function App() {
  return (
    <>
      <div className="max-w-7xl  mx-auto">
        <Navbar />
        <Body />
        <div className="">
          <Deepfakeinfo
            title="Authenticity Check for Voice calls"
            description="Detect synthetic or morphed voices with advanced spectrogram-based deep learning analysis."
            category="Deep Learning"
            imagesrc={img}
          />
          <Deepfakeinfo
            title="Analyze Conversations for Phishing Risks"
            description="We process recorded audio with LLMs to extract insights, detect suspicious intent, and flag potential phishing conversations."
            category="Large Language Models"
            imagesrc={img2}
            size={300}
            
          />
          <Deepfakeinfo
            title="Analyze Conversations for Phishing Risks"
            description="We process recorded audio with LLMs to extract insights, detect suspicious intent, and flag potential phishing conversations."
            category="Large Language Models"
            imagesrc={img4}
          />
          {/* <Facts/> */}
          {/* <AudioProcessingFlow/> */}
        </div>
      </div>
    </>
  );
}

export default App;
