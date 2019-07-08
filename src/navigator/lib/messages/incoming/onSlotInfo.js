import navigate from '../../navigate';

export default function onSlotInfo(event) {
  display(event.data.payload);
  navigate('onSlotInfo');
}

function display(payload) {
  const { serviceTargeting, slots } = payload;

  const selectedSlot = getSelectedSlot(slots);

  const tab = document.querySelectorAll('#info-wrapper [data-tab="onSlotInfo"]')[0];

  // Reset container
  tab.innerHTML = '';

  let tabMarkup = `
    ${displaySlotDefinitions(slots)}
    ${displayAdUnitPath(selectedSlot)}
    ${displayResponseInformation(selectedSlot)}
    ${displayDefinedSizes(selectedSlot)}
    ${displayRequestableSizes(selectedSlot)}
    ${displaySlotTargeting(selectedSlot)}
    ${displayServiceTargeting(serviceTargeting)}
  `;

  tab.insertAdjacentHTML('afterbegin', tabMarkup);

  const slotDefinitions = document.getElementById('slot-definitions');
  slotDefinitions.value = selectedSlot.id;

  slotDefinitions.addEventListener(
    'change',
    e => {
      const initiator = document.getElementById('initiator');
      const slotName = e.target.value;

      initiator.innerHTML = slotName;
      initiator.dataset.slot = slotName;

      display(payload);
    },
    false
  );
}

function displaySlotDefinitions(slots) {
  return `
    <div>
      <h3>Ad Slot Definitions</h3>
      <div class="select-wrapper">
        <select id="slot-definitions">${displayDefinedSlots(slots)}</select>
      </div>
    </div>
  `;
}

function displayDefinedSlots(slots) {
  return Object.keys(slots).reduce((accumulator, key) => {
    accumulator += `<option value='${key}'>${key}</option>`;
    return accumulator;
  }, '');
}

function displayAdUnitPath(slot) {
  return `
    <div>
      <h3>Ad Unit Path</h3>
      <table>
        <tbody>
          <tr>
            <td>${slot.adUnitPath}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function displayResponseInformation(slot) {
  if (!slot.responseInformation) {
    return '';
  }

  const { advertiserId, campaignId, creativeId, lineItemId } = slot.responseInformation;

  return `
    <div>
      <h3>Response Information</h3>
      <table>
        <tbody>
          <tr>
            <td>Advertiser ID</td>
            <td><a href="https://admanager.google.com/3379#delivery/ListOrders/companyId=${advertiserId}" target="_blank">${advertiserId}</td>
          </tr>
          <tr>
            <td>Campaign ID</td>
            <td><a href="https://admanager.google.com/3379#delivery/OrderDetail/orderId=${campaignId}" target="_blank">${campaignId}</a></td>
          </tr>
          <tr>
            <td>Line Item ID</td>
            <td><a href="https://admanager.google.com/3379#delivery/LineItemDetail/lineItemId=${lineItemId}" target="_blank">${lineItemId}</a></td>
          </tr>
          <tr>
            <td>Creative ID</td>
            <td><a href="https://admanager.google.com/3379#delivery/CreativeDetail/creativeId=${creativeId}" target="_blank">${creativeId}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function displayDefinedSizes(slot) {
  return `
    <div>
      <h3>Defined Slot Sizes</h3>
      <table>
        <tbody>
          ${slot.sizes.defined.map(size => `<tr><td>${size[0]} x ${size[1]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function displayRequestableSizes(slot) {
  return `
    <div>
      <h3>Requestable Slot Sizes</h3>
      <table>
        <tbody>
          ${slot.sizes.requestable.map(size => `<tr><td>${size[0]} x ${size[1]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function displaySlotTargeting(slot) {
  const { targeting } = slot;

  return `
    <div>
      <h3>Ad Slot Targeting</h3>
      <table>
        <tbody>
          ${Object.keys(targeting)
            .sort()
            .map(key => `<tr><td>${key}</td><td>${targeting[key].join(',')}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function displayServiceTargeting(targeting) {
  return `
    <div>
      <h3>Service Targeting</h3>
      <table>
        <tbody>
          ${Object.keys(targeting)
            .sort()
            .map(key => `<tr><td>${key}</td><td>${targeting[key].join(',')}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function getSelectedSlot(slots) {
  const selected = document.getElementById('initiator').dataset.slot;

  if (selected) {
    return slots[selected];
  }
  return slots[Object.keys(slots)[0]];
}
