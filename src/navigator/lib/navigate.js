export default function navigate(activeTab) {
  const wrappers = document.querySelectorAll('#info-wrapper div[data-tab]');

  [].forEach.call(wrappers, wrapper => {
    if (wrapper.dataset.tab === activeTab) {
      wrapper.classList.add('active');
    } else {
      wrapper.classList.remove('active');
    }
  });
}
