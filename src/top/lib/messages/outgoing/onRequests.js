import sendMessage from './sendMessage';

export default function onRequests() {
  sendMessage({
    frame: 'cn_ads_navigator',
    message: 'onRequests',
    payload: {
      requests: getRequests(),
    },
  });
}

function getRequests() {
  const requests = performance.getEntries().filter(x => {
    return /^https:\/\/securepubads\.g\.doubleclick\.net\/gampad\/ads\?/.test(x.name);
  });

  return requests.map(request => request.name);
}
