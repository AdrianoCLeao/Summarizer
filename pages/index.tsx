import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
import axios from 'axios';
import { Vortex } from "../components/ui/vortex";
import { FlipWords } from "../components/ui/flip-words";
import SlideTabs from "../components/ui/SlideTabsExample";
import Example from "../components/ui/EncryptButton";
import TextArea from "../components/Inputs/TextArea";
import CategoryLinks from "../components/categoryLinks";
import SpeechRecognitionComponent from "../components/SpeechRecognition/SpeechRecognition";

import useSummarize from "../components/callAPI";

const Summarizer: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const summary = useSummarize(sourceText);

  const words = ["Intelligence", "Creativity", "Perception", "Processing"];

  return (
    <div className='overflow-x-hidden'>
      <div className="w-screen mx-auto rounded-md h-screen overflow-hidden">
        <div className="mt-2">
          <SlideTabs />
        </div>
        <Vortex
          backgroundColor="black"
          rangeY={300}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text tracking-tight text-transparent text-4xl md:text-8xl font-bold text-center">
            Abstractive Text Summarizer
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-2xl mt-6 text-center">
            Our AI tool converts lengthy texts into incisive summaries. Input
            text or URLs, and we'll handle the rest!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Example />
          </div>
        </Vortex>
      </div>
      <div className="h-screen relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold  text-neutral-200">
              Artificial<span className="text-[#86198f]"><FlipWords words={words} /></span>
            </h1>

            <p className="mt-3 text-neutral-400">
            Understanding, transforming, analyzing, generating language.
            </p>

            <div className="w-full h-full sm:mt-12 mx-auto relative overflow-x-hidden" id='summarizer'>
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="Input"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSourceText(e.target.value)
                    }
                    placeholder="Input text"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex gap-5">
                      <span className="cursor-pointer flex space-x-2 flex-row">
                        <SpeechRecognitionComponent
                          setSourceText={setSourceText}
                        />
                      </span>
                    </div>

                    <span className="text-sm pr-4">
                      {sourceText.length} / 2500
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                <TextArea
                    id="Summarized"
                    value={summary}
                    onChange={() => {}}
                    placeholder="Summarized Text"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex items-center space-x-2 flex-row">
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CategoryLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
