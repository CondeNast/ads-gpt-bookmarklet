/*eslint-disable */
import sendMessage from './sendMessage';

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

export default function onSlotInfo() {
  sendMessage({
    frame: 'cn_ads_navigator',
    message: 'onSlotInfo',
    payload: {
      serviceTargeting: getServiceTargeting(),
      slots: getAllSlotInfo(),
    },
  });
}
