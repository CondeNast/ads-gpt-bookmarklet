import onMessage from './lib/messages/incoming/onMessage';
import * as outgoing from './lib/messages/outgoing/index';
import getActiveTab from './lib/getActiveTab';
import navigate from './lib/navigate';

// Listen for Post Messages
window.addEventListener('message', onMessage, false);

// DOM LISTENERS
document.getElementById('initiator').addEventListener('click', () => {
  outgoing.onSlotInfo();
  outgoing.onExpand();
});

document.querySelector('button.close').addEventListener('click', outgoing.onCollapse);
document.getElementById('underlay').addEventListener('click', outgoing.onCollapse);

document.querySelector('button.hamburger').addEventListener('click', () => {
  navigate('onNavigation');
});

document.getElementById('navigation').addEventListener('click', event => {
  if (event.target.dataset.outgoing !== getActiveTab()) {
    outgoing[event.target.dataset.outgoing]();
  }
});

outgoing.onReady();
