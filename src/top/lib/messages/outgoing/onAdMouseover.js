import sendMessage from './sendMessage';

export default function onAdMouseover() {
  const slotId = window.jQuery(this).attr('id');

  sendMessage({
    frame: 'cn_ads_navigator',
    message: 'onAdMouseover',
    payload: {
      slotId,
    },
  });
}
