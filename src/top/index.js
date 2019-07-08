import onMessage from './lib/messages/incoming/onMessage';
import appendFrame from './lib/appendFrame';
import config from './config';

// Check if cn_ads_navigator already exists
if (!window.frames.cn_ads_navigator) {
  // Listen for Post Messages
  window.addEventListener('message', onMessage, false);

  // Append CN Ads Navigator iframe
  appendFrame(config.url);
}
