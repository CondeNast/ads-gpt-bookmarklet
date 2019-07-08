import * as incoming from './index';

export default function onMessage(event) {
  const { frame, message } = event.data;

  if (frame === 'top') {
    incoming[message](event);
  }
}
