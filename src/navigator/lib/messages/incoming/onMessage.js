import * as incoming from './index';

export default function onMessage(event) {
  const { frame, message } = event.data;

  if (frame === 'cn_ads_navigator') {
    incoming[message](event);
  }
}
