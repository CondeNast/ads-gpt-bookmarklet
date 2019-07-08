(function () {
  'use strict';

  function collapse() {
    document.getElementById('cn_ads_navigator').style.height = '30px';
  }

  function expand() {
    document.getElementById('cn_ads_navigator').style.height = '100vh';
  }

  function sendMessage({ frame, message, payload }) {
    window.frames[frame].postMessage(
      {
        frame,
        message,
        payload,
      },
      '*'
    );
  }

  function onAdMouseover() {
    const slotId = window.jQuery(this).attr('id');

    sendMessage({
      frame: 'cn_ads_navigator',
      message: 'onAdMouseover',
      payload: {
        slotId,
      },
    });
  }

  /*eslint-disable */

  function getAllSlotInfo() {
    return window.googletag
      .pubads()
      .getSlots()
      .reduce((accumulator, slot) => {
        const slotId = slot.getSlotElementId();
        accumulator[slotId] = getSlotInfo(slot);
        return accumulator;
      }, {});
  }

  function getSlotInfo(slot) {
    return {
      adUnitPath: slot.getAdUnitPath(),
      id: slot.getSlotElementId(),
      sizes: {
        defined: getDefinedSizes(slot),
        requestable: getRequestableSizes(slot),
      },
      targeting: getSlotTargeting(slot),
      responseInformation: slot.getResponseInformation(),
    };
  }

  function getDefinedSizes(slot) {
    return slot.getSizes().map(size => (size.getWidth && size.getHeight ? [size.getWidth(), size.getHeight()] : [size]));
  }

  function getRequestableSizes(slot) {
    return slot
      .getSizes(window.innerWidth, window.innerHeight)
      .map(size => (size.getWidth && size.getHeight ? [size.getWidth(), size.getHeight()] : [size]));
  }

  function getSlotTargeting(slot) {
    return slot.getTargetingKeys().reduce((accumulator, key) => {
      accumulator[key] = slot.getTargeting(key);
      return accumulator;
    }, {});
  }

  function getServiceTargeting() {
    return window.googletag
      .pubads()
      .getTargetingKeys()
      .reduce((accumulator, key) => {
        accumulator[key] = googletag.pubads().getTargeting(key);
        return accumulator;
      }, {});
  }

  function onSlotInfo() {
    sendMessage({
      frame: 'cn_ads_navigator',
      message: 'onSlotInfo',
      payload: {
        serviceTargeting: getServiceTargeting(),
        slots: getAllSlotInfo(),
      },
    });
  }

  function onRequests() {
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
      return /^https:\/\/securepubads\.g\.doubleclick\.net\/gampad\/ads\?gdfp_req/.test(x.name);
    });

    return requests.map(request => request.name);
  }

  function init() {
    window.jQuery('body').on('mouseover', 'div[data-google-query-id]', onAdMouseover);
  }

  function loadJQUERY() {
    let script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.onload = init;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function onReady() {
    loadJQUERY();
  }

  function onRequests$1() {
    onRequests();
  }

  function onSlotInfo$1() {
    onSlotInfo();
  }



  var incoming = /*#__PURE__*/Object.freeze({
    onCollapse: collapse,
    onExpand: expand,
    onReady: onReady,
    onRequests: onRequests$1,
    onSlotInfo: onSlotInfo$1
  });

  function onMessage(event) {
    const { frame, message } = event.data;

    if (frame === 'top') {
      incoming[message](event);
    }
  }

  function appendFrame(url) {
    const iframe = `<iframe id="cn_ads_navigator" name="cn_ads_navigator" frameborder="0" style="position: fixed; z-index: 2147483647; width: 100vw; height: 30px; top: 0; left: 0" src="${
    url
    }navigator.html"></iframe>`;
    document.body.insertAdjacentHTML('beforeend', iframe);
  }

  const config = {};

  {
    config.url = './bookmark/prod/'; // DIRECTORY PATH WHERE YOUR PROD ASSETS ARE HOSTED example: 'https://MY-AWESOME-SITE.com/public/prod/'
  }

  // Check if cn_ads_navigator already exists
  if (!window.frames.cn_ads_navigator) {
    // Listen for Post Messages
    window.addEventListener('message', onMessage, false);

    // Append CN Ads Navigator iframe
    appendFrame(config.url);
  }

}());
