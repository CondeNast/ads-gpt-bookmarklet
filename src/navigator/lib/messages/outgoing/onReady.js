import sendMessage from './sendMessage';

export default function onReady() {
  sendMessage({
    frame: 'top',
    message: 'onReady',
  });
}
