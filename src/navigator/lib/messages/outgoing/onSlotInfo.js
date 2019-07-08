import sendMessage from './sendMessage';

export default function onSlotInfo() {
  sendMessage({
    frame: 'top',
    message: 'onSlotInfo',
  });
}
