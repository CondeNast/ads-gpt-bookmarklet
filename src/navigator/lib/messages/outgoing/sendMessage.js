export default function sendMessage({ frame, message, payload }) {
  window.frames[frame].postMessage(
    {
      frame,
      message,
      payload,
    },
    '*'
  );
}
