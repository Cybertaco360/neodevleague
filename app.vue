<template>
  <div class="app">
    <button :class="{ active: isRecording }" @click="toggleMic">Record</button>
    <div class="transcript">{{ transcript }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define reactive variables for transcript text and recording status
const transcript = ref('');
const isRecording = ref(false);

let sr;

onMounted(() => {
  // Initialize SpeechRecognition only if supported and in the browser
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    sr = new SpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;

    // Set up event handlers for the SpeechRecognition instance
    sr.onstart = () => {
      console.log('Speech Recognition Started');
      isRecording.value = true;
    };

    sr.onend = () => {
      console.log('Speech Recognition Stopped');
      isRecording.value = false;
    };

    sr.onresult = (evt) => {
      const results = Array.from(evt.results)
        .map(result => result[0].transcript)
        .join('');
      transcript.value = results;

      // Check commands only for final results
      for (let i = 0; i < evt.results.length; i++) {
        const result = evt.results[i];
        if (result.isFinal) {
          checkForCommand(result[0].transcript);
        }
      }
    };
  } else {
    console.error("Speech recognition not supported in this browser.");
  }
});

// Function to handle specific commands
const checkForCommand = (text) => {
  if (text.includes('stop recording')) {
    sr.stop();
  } else if (text.includes('what is the time') || text.includes("what's the time")) {
    alert(new Date().toLocaleTimeString());
    sr.stop();
    setTimeout(() => sr.start(), 100);  // Restart recognition after showing time
  }
};

// Toggle the microphone on and off
const toggleMic = () => {
  if (isRecording.value) {
    sr.stop();
  } else {
    sr.start();
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button.active {
  background-color: #f00;
  color: #fff;
}

.transcript {
  font-size: 18px;
  margin-top: 20px;
}
</style>