import sendMessage from './sendMessage';

export default function onRequests() {
  sendMessage({
    frame: 'top',
    message: 'onRequests',
  });
}
