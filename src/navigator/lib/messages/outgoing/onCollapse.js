import sendMessage from './sendMessage';

export default function collapse() {
  sendMessage({
    frame: 'top',
    message: 'onCollapse',
  });

  document.getElementById('navbar').style.display = '';
  document.getElementById('overlay').style.display = 'none';
}
