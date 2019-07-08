import { onAdMouseover } from './messages/outgoing/index';

function init() {
  window.jQuery('body').on('mouseover', 'div[data-google-query-id]', onAdMouseover);
}

export default function loadJQUERY() {
  let script = document.createElement('script');
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  script.onload = init;
  document.getElementsByTagName('head')[0].appendChild(script);
}
