import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { BASE_URL } from "../utils/constants";
const Dictaphone = ({
  setTranscript,
  setTitle,
  setPriority,
  setStatus,
  setDueDate,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const fetchTodoParser = async () => {
    try {
      const res = await fetch(BASE_URL + "todoParser", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: transcript }),
      });
      const resJson = await res.json();
      if (resJson.status) {
        const { title, priority, status, dueDate } = resJson.data;
        setTitle(title);
        setPriority(priority);
        setStatus(status);
        setDueDate(dueDate);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTodoParser();
    }, 2000);
    return () => timer;
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  setTranscript(transcript);

  return (
    <>
      <div>
        <div className="card-actions justify-end">
          {listening ? (
            <button
              className="btn btn-error "
              onClick={SpeechRecognition.stopListening}
            >
              Stop <CiMicrophoneOff />
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={SpeechRecognition.startListening}
            >
              Start <CiMicrophoneOn />
            </button>
          )}
          <button className="btn btn-warning " onClick={resetTranscript}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
export default Dictaphone;
