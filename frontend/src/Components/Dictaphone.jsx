import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CiMicrophoneOn, CiMicrophoneOff  } from "react-icons/ci";
const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? <CiMicrophoneOn /> : <CiMicrophoneOff  />}</p>
      {listening ?
      <button className='btn btn-error' onClick={SpeechRecognition.stopListening}>Stop</button> :
      <button className='btn btn-success' onClick={SpeechRecognition.startListening}>Start</button>}
      <button className='btn btn-warning' onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;
