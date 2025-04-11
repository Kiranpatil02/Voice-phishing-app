import { Button, Text, Callout } from "@radix-ui/themes";
import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Results } from "../Results/Results";
import { LLM } from "../LLM/LLM";
import { GoogleGenerativeAI } from "@google/generative-ai"

export function Upload() {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [llmResponse, setLLMResponse] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  console.log("Errrr:", errorMessage);

  const ALLOWED_EXTENSIONS = ["wav", "mp3"]; // Define allowed extensions
  const ALLOWED_MIME_TYPES = ["audio/wav", "audio/mpeg"]; // Define corresponding MIME types

    const DEEPFAKE_URL = "https://1452-2409-40f4-2105-2f88-95aa-d2b7-c5de-6fbc.ngrok-free.app/predict/";
  const LLM_URL = "https://your-ngrok-url.com/llm/"; 
  const GEMINI_API_KEY = "AIzaSyByKg5DBFcI166VkQc8Tx0GGwre_0us9TQ";
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); 

  const handlefileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("File Selected:", file.name);
      console.log("numbers", file.type);
      const fileExtension = file.name;

      const fileMimeType = file.type;

      const isValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);
      const isValidMimeType = ALLOWED_MIME_TYPES.includes(fileMimeType);

      if (!isValidExtension && !isValidMimeType) {
        console.warn(
          `Invalid file type selected: ${file.name} (Type: ${fileMimeType}, Extension: ${fileExtension})`
        );
        setSelectedFile(null);
        setUploadStatus(false); // Set status to error
        setErrorMessage(
          `Invalid file type. Please select a .${ALLOWED_EXTENSIONS.join(
            " or ."
          )} file.`
        );
        setServerResponse(null);
        return; // Stop processing this file
      }

      setSelectedFile(file);
      setServerResponse(null);
    } else {
      setSelectedFile(null);
    }
  };

  const handlesubmit = (e) => {
    // e.preventdefault();
    try {
      upload(selectedFile);
    } catch (error) {
      console.log("Failed sending file:", error);
      setErrorMessage("Failed uploading file");
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Extract the base64 part from the data URL
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const callGeminiAPI = async (file) => {
    try {
      // Get the file as base64
      const base64Audio = await fileToBase64(file);
      
      // Get the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      // Prepare parts array with text prompt and audio file
      const parts = [
        {
          text: "Analyze this audio file for signs of deepfake or voice phishing attempts. Provide a detailed analysis of the voice characteristics, any unnatural elements, and your assessment of whether this is likely genuine or artificially manipulated. Also identify any suspicious content that might indicate phishing."
        },
        {
          inlineData: {
            mimeType: file.type,
            data: base64Audio
          }
        }
      ];
      
      // Generate content
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        }
      });
      
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };
  const upload = useCallback(async (fileUpload) => {
    if (!fileUpload) return;

    const formData1 = new FormData();
    const formData2 = new FormData();
    formData1.append("file", fileUpload);
    formData2.append("file", fileUpload);
    console.log(`Uploading........`);

    // const geminiPromise = callGeminiAPI(fileUpload).catch(err => {
    //   console.error("Gemini API error:", err);
    //   return "Error analyzing audio with Gemini. Please try again.";
    // });
    console.log("Sent to Gemini.................")

    try {
      const [deepfakeRes,geminiText] = await Promise.all([
        fetch(DEEPFAKE_URL, {
          method: "POST",
          body: formData1,
        }),
        // geminiPromise
      ]);

      const deepfakeData = await deepfakeRes.json();
      console.log("Response from backend", deepfakeData);
      // console.llog("Response from Gemini.....:",geminiText)

      // if (!response.ok) {
      //   console.log("Upload failed:", response.status, deepfakeData);
      //   throw new Error(response.message);
      // }

      console.log("Upload successful:", deepfakeData);
      setUploadStatus(true);
      setServerResponse(deepfakeData);
      setDeepfakeResponse(deepfakeData);
      setLLMResponse(llmData);
      
    } catch (error) {
      console.log("Error uploading file:", error);
      setSelectedFile(null);
      setUploadStatus(false);
      setErrorMessage(error);
    }
  }, []);

  useEffect(() => {
    if (serverResponse !== null) {
      console.log("Serverresponse updated:", serverResponse);
    }
  }, [serverResponse]);

  return (
    <>
      <input
        className=""
        type="file"
        ref={fileInputRef}
        onChange={handlefileChange}
        accept=".wav,.mp3"
        style={{ display: "none" }}
        disabled={uploadStatus}
      ></input>

      <div className="w-full max-w-4xl mx-auto p-8 ">
        {errorMessage && (
          <>
            <div className="w-96 mx-auto mb-4">
              <Callout.Root color="red" role="alert">
                <Callout.Icon>
                  <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                  Access denied. Please contact the network administrator to
                  view this page.
                </Callout.Text>
              </Callout.Root>
            </div>
          </>
        )}
        <>
          <div
            className="w-full rounded-3xl border cursor-pointer border-gray-200 bg-white p-12 flex flex-col items-center justify-center shadow"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex items-center gap-2 mb-4 ">
              <div className="p-2 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-audio-lines h-[32px] w-[32px]"
                >
                  <path d="M2 10v3"></path>
                  <path d="M6 6v11"></path>
                  <path d="M10 3v18"></path>
                  <path d="M14 8v7"></path>
                  <path d="M18 5v13"></path>
                  <path d="M22 10v3"></path>
                </svg>
              </div>
              <div className="text-black">
                <span className="mx-2">›</span>
              </div>
              <div className="p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-text h-[32px] w-[32px]"
                >
                  <path d="M17 6.1H3"></path>
                  <path d="M21 12.1H3"></path>
                  <path d="M15.1 18H3"></path>
                </svg>
              </div>
            </div>

            <div className="text-center mb-6">
              <Text>
                <p className="text-lg font-medium text-gray-500">
                  Upload an audio file to check for Deepfake
                </p>
                <p className="text-lg font-medium text-gray-500">
                  or attempted Phishing
                </p>
              </Text>
            </div>
            {/* <LLM/> */}
            <div className=" w-full  p-2">
              <div className="w-fit ml-auto">
                <Button
                  size="3"
                  radius="large"
                  variant="surface"
                  onClick={handlesubmit}
                  disabled={uploadStatus}
                >
                  Upload{" "}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>

            {/* <button
            className={`bg-black text-white font-medium px-6 py-3 rounded-full transition-all ${
              isHovering ? "bg-gray-800" : "bg-black"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>UPLOAD FILE</span>
            </div>
          </button> */}
          </div>
        </>
      </div>
      <div>
        {serverResponse && (
          <Results
            result={serverResponse.result || ""}
            confidence={serverResponse.confidence || 0}
          />
        )}
      </div>
      {/* <div
          className="w-full rounded-3xl border cursor-pointer border-gray-200 bg-white p-12 flex flex-col items-center justify-center shadow"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={()=>fileInputRef.current?.click()}
        >
         {
          serverResponse ? (
            <>
            <div className="border flex flex-col h-55 overflow-scroll w-3xl">
              <Text weight="medium" >
                  Speaker1:   {serverResponse.User}
              </Text>
              <Text weight="medium">
                Speaker 2: {serverResponse}
              </Text>

            </div>
            </>
          ):(
            <>
            <div className="flex items-center gap-2 mb-4 ">
            <div className="p-2 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-audio-lines h-[32px] w-[32px]"
              >
                <path d="M2 10v3"></path>
                <path d="M6 6v11"></path>
                <path d="M10 3v18"></path>
                <path d="M14 8v7"></path>
                <path d="M18 5v13"></path>
                <path d="M22 10v3"></path>
              </svg>
            </div>
            <div className="text-black">
              <span className="mx-2">›</span>
            </div>
            <div className="p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text h-[32px] w-[32px]"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
            </div>
          </div>
                    <div className="text-center mb-6">
                    <Text>
                      <p className="text-lg font-medium text-gray-500">
                        Upload an audio file to check for Deepfake
                      </p>
                      <p className="text-lg font-medium text-gray-500">
                        or attempted Phishing
                      </p>
                    </Text>
                  </div>
        
                  </>

          ) }


          <div className=" w-full ">
              <hr />
            <div className="w-fit ml-auto mt-2">
              <Button
                size="3"
                radius="large"
                variant="surface"
                onClick={handlesubmit}
                disabled={uploadStatus}
              >
                Upload{" "}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
      </div> */}
    </>
  );
}
