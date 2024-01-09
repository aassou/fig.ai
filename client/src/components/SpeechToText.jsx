import React, { useState, useEffect, useRef } from 'react';
import 'webrtc-adapter';
import { MicrophoneIcon } from '@heroicons/react/24/solid'

const SpeechToText = ({ onTranscriptChange, buttonTitle }) => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const title = buttonTitle ?? 'Tell me the image to generate';

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error('Speech recognition is not supported in this browser.');
    } else {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const newTranscript = event.results[0][0].transcript;
        setTranscript(newTranscript);
        onTranscriptChange(newTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className='mt-5'>
      <button 
        onClick={listening ? stopListening : startListening}
        className='text-white bg-red-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5'  
      >
        <div>
          <MicrophoneIcon className="inline-block h-5 w-5 text-white-500" />
          {listening ? 'Stop Listening ...' : title}
        </div>
      </button>
    </div>
  );
};

export default SpeechToText;
