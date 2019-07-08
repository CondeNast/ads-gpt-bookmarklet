import sendMessage from './sendMessage';

export default function expand() {
  sendMessage({
    frame: 'top',
    message: 'onExpand',
  });

  document.getElementById('navbar').style.display = 'none';
  document.getElementById('overlay').style.display = '';
}
