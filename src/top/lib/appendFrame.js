export default function appendFrame(url) {
  const iframe = `<iframe id="cn_ads_navigator" name="cn_ads_navigator" frameborder="0" style="position: fixed; z-index: 2147483647; width: 100vw; height: 30px; top: 0; left: 0" src="${
    url
    }navigator.html"></iframe>`;
  document.body.insertAdjacentHTML('beforeend', iframe);
}
