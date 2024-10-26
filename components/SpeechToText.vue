<template>
    <div>
      <button @click="startRecognition">Start Speech Recognition</button>
      <p>{{ transcript }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recognition: null, // Stores SpeechRecognition instance
        transcript: '', // Stores transcribed text
      };
    },
    mounted() {
      // Check if browser supports SpeechRecognition
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
  
        // Capture the results and update the transcript
        this.recognition.onresult = (event) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              this.transcript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          this.transcript = this.transcript.trim() + interimTranscript;
        };
  
        // Handle errors and end events
        this.recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
        };
  
        this.recognition.onend = () => {
          console.log("Speech recognition ended");
        };
      } else {
        alert("Your browser does not support speech recognition.");
      }
    },
    methods: {
      startRecognition() {
        if (this.recognition) {
          this.transcript = ''; // Clear the transcript
          this.recognition.start(); // Start recognition
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    padding: 8px 12px;
    font-size: 16px;
    margin-bottom: 12px;
  }
  </style>