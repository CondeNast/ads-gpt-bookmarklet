(function () {
  'use strict';

  // SET AD SLOT ID
  function setSlotId(event) {
    const { slotId } = event.data.payload;
    const initiator = document.getElementById('initiator');

    initiator.innerHTML = slotId;
    initiator.dataset.slot = slotId;
  }

  function navigate(activeTab) {
    const wrappers = document.querySelectorAll('#info-wrapper div[data-tab]');

    [].forEach.call(wrappers, wrapper => {
      if (wrapper.dataset.tab === activeTab) {
        wrapper.classList.add('active');
      } else {
        wrapper.classList.remove('active');
      }
    });
  }

  function onSlotInfo(event) {
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

  /* eslint-disable camelcase */

  function onRequests(event) {
    display$1(event.data.payload);
    navigate('onRequests');
  }

  function display$1(payload, selectedIndex = 0) {
    const { requests } = payload;

    const selectedRequest = requests[selectedIndex];

    const tab = document.querySelectorAll('#info-wrapper [data-tab="onRequests"]')[0];

    // Reset container
    tab.innerHTML = '';

    let tabMarkup = `
    ${displaySelectDropdown(requests)}
    ${displaySelectedRequest(selectedRequest)}
  `;

    tab.insertAdjacentHTML('afterbegin', tabMarkup);

    const dropdown = tab.querySelectorAll('select')[0];
    dropdown.value = selectedIndex;

    dropdown.addEventListener(
      'change',
      e => {
        const selectedIndex = e.target.value;
        display$1(payload, selectedIndex);
      },
      false
    );
  }

  function displaySelectDropdown(requests) {
    return `
    <div>
      <h3>Outgoing Ad Requests</h3>
      <div class="select-wrapper">
        <select>${displayRequestOptions(requests)}</select>
      </div>
    </div>
  `;
  }

  function displayRequestOptions(requests) {
    return requests.reduce((accumulator, request, index) => {
      accumulator += `<option value='${index}'>Request ${index + 1}</option>`;
      return accumulator;
    }, '');
  }

  function displaySelectedRequest(request) {
    const data = parseRequest(request);

    const { serviceTargeting, slots } = cleanRequest(data);

    let requestMarkup = `
    ${displayRawRequest(request)}
    ${displaySlots(slots)}
    ${displayServiceTargeting$1(serviceTargeting)}
  `;

    return requestMarkup;
  }

  function displayRawRequest(request) {
    return `
    <div>
      <h3>Request</h3>
      <textarea>${request}</textarea>
    </div>
  `;
  }

  function displaySlots(slots) {
    return slots.reduce((accumulator, slot) => {
      accumulator += `
      <div class="slot-request-wrapper">
        ${displayAdUnitPath$1(slot.adUnitPath)}
        ${displaySizes(slot.sizes)}
        ${displaySlotTargeting$1(slot.targeting)}
      </div>
    `;
      return accumulator;
    }, '');

    // ${displayAdUnitPath(slots[0].adUnitPath)}
  }

  function displayAdUnitPath$1(adUnitPath) {
    return `
    <div>
      <h3>Ad Unit Path</h3>
      <table>
        <tbody>
          <tr>
            <td>${adUnitPath}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  }

  function displaySizes(sizes) {
    return `
    <div>
      <h3>Slot Sizes</h3>
      <table>
        <tbody>
          ${sizes.map(size => `<tr><td>${size}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
  }

  function displaySlotTargeting$1(targeting) {
    return `
    <div>
      <h3>Ad Slot Targeting</h3>
      <table>
        <tbody>
          ${Object.keys(targeting)
            .map(key => `<tr><td>${key}</td><td>${targeting[key].join(',')}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
  `;
  }

  function displayServiceTargeting$1(targeting) {
    return `
    <div>
      <h3>Service Targeting</h3>
      <table>
        <tbody>
          ${Object.keys(targeting)
            .map(key => `<tr><td>${key}</td><td>${targeting[key].join(',')}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
  `;
  }

  function parseRequest(request) {
    const queryString = request.split('?').pop();

    return queryStringToJSON(queryString);
  }

  function cleanRequest(data) {
    const { cust_params } = data;

    const serviceTargeting = getServiceTargeting(cust_params);
    const adUnitPaths = getAdUnitPaths(data);
    const sizes = getSizes(data);
    const slotTargeting = getSlotTargeting(data);

    const request = {
      serviceTargeting,
      slots: [],
    };

    adUnitPaths.forEach((adUnitPath, index) => {
      request.slots[index] = {
        adUnitPath,
        sizes: sizes[index],
        targeting: slotTargeting[index],
      };
    });

    return request;
  }

  function getServiceTargeting(cust_params) {
    if (cust_params) {
      return cust_params.split('&').reduce((accumulator, targeting) => {
        const pair = targeting.split('=');
        accumulator[pair[0]] = pair[1].split(',');
        return accumulator;
      }, {});
    }
    return {};
  }

  function getSlotTargeting({ prev_scp, scp }) {
    if (scp) {
      const slotTargeting = scp.split('&').reduce((accumulator, targeting) => {
        const pair = targeting.split('=');
        accumulator[pair[0]] = pair[1].split(',');
        return accumulator;
      }, {});

      return [slotTargeting];
    } else if (prev_scp) {
      const slotTargeting = prev_scp.split('|').map(targeting => {
        return targeting.split('&').reduce((accumulator, targeting) => {
          const pair = targeting.split('=');
          accumulator[pair[0]] = pair[1].split(',');
          return accumulator;
        }, {});
      });

      return slotTargeting;
    }
    return {};
  }

  function getAdUnitPaths({ enc_prev_ius, iu_parts, iu }) {
    if (iu) {
      return [iu];
    }

    iu_parts = iu_parts.split(',');

    return enc_prev_ius.split(',').map(adUnitPath => {
      return adUnitPath
        .split('/')
        .map(adUnit => {
          var index = parseInt(adUnit, 10);
          return iu_parts[index];
        })
        .join('/');
    });
  }

  function getSizes({ prev_iu_szs, sz }) {
    if (sz) {
      return [[sz]];
    }

    return prev_iu_szs.split(',').map(request => {
      return request.split('|');
    });
  }

  function queryStringToJSON(queryString) {
    const pairs = queryString.split('&');

    const result = {};
    pairs.forEach(pair => {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }



  var incoming = /*#__PURE__*/Object.freeze({
    onAdMouseover: setSlotId,
    onSlotInfo: onSlotInfo,
    onRequests: onRequests
  });

  function onMessage(event) {
    const { frame, message } = event.data;

    if (frame === 'cn_ads_navigator') {
      incoming[message](event);
    }
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

  function collapse() {
    sendMessage({
      frame: 'top',
      message: 'onCollapse',
    });

    document.getElementById('navbar').style.display = '';
    document.getElementById('overlay').style.display = 'none';
  }

  function expand() {
    sendMessage({
      frame: 'top',
      message: 'onExpand',
    });

    document.getElementById('navbar').style.display = 'none';
    document.getElementById('overlay').style.display = '';
  }

  function onReady() {
    sendMessage({
      frame: 'top',
      message: 'onReady',
    });
  }

  function onRequests$1() {
    sendMessage({
      frame: 'top',
      message: 'onRequests',
    });
  }

  function onSlotInfo$1() {
    sendMessage({
      frame: 'top',
      message: 'onSlotInfo',
    });
  }



  var outgoing = /*#__PURE__*/Object.freeze({
    onCollapse: collapse,
    onExpand: expand,
    onReady: onReady,
    onSlotInfo: onSlotInfo$1,
    onRequests: onRequests$1
  });

  function getActiveTab() {
    return document.querySelectorAll('#info-wrapper div.active')[0].dataset.tab;
  }

  // Listen for Post Messages
  window.addEventListener('message', onMessage, false);

  // DOM LISTENERS
  document.getElementById('initiator').addEventListener('click', () => {
    onSlotInfo$1();
    expand();
  });

  document.querySelector('button.close').addEventListener('click', collapse);
  document.getElementById('underlay').addEventListener('click', collapse);

  document.querySelector('button.hamburger').addEventListener('click', () => {
    navigate('onNavigation');
  });

  document.getElementById('navigation').addEventListener('click', event => {
    if (event.target.dataset.outgoing !== getActiveTab()) {
      outgoing[event.target.dataset.outgoing]();
    }
  });

  onReady();

}());
