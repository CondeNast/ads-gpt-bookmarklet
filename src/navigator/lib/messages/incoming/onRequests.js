/* eslint-disable camelcase */

import navigate from '../../navigate';

export default function onRequests(event) {
  display(event.data.payload);
  navigate('onRequests');
}

function display(payload, selectedIndex = 0) {
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
      display(payload, selectedIndex);
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
    ${displayServiceTargeting(serviceTargeting)}
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
        ${displayAdUnitPath(slot.adUnitPath)}
        ${displaySizes(slot.sizes)}
        ${displaySlotTargeting(slot.targeting)}
      </div>
    `;
    return accumulator;
  }, '');

  // ${displayAdUnitPath(slots[0].adUnitPath)}
}

function displayAdUnitPath(adUnitPath) {
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

function displaySlotTargeting(targeting) {
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

function displayServiceTargeting(targeting) {
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
