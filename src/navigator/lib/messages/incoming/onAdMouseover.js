// SET AD SLOT ID
export default function setSlotId(event) {
  const { slotId } = event.data.payload;
  const initiator = document.getElementById('initiator');

  initiator.innerHTML = slotId;
  initiator.dataset.slot = slotId;
}
