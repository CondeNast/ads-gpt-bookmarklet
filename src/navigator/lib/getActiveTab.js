export default function getActiveTab() {
  return document.querySelectorAll('#info-wrapper div.active')[0].dataset.tab;
}
