const explanations = {
  '1': {
    title: 'Gigi Haruwan',
    text: 'Motif ini terinspirasi dari pola gigi haruwan (alat tradisional atau simbol tertentu), biasanya melambangkan keteguhan dan perlindungan dalam kehidupan sehari-hari.'
  },
  '2': {
    title: 'Langsat',
    text: 'Motif ini mengambil bentuk buah langsat, melambangkan kemakmuran, kesejahteraan, dan kesuburan, karena buah ini identik dengan hasil panen yang melimpah.'
  },
  '3': {
    title: 'Tameng Dayak',
    text: 'Motif ini meniru bentuk tameng suku Dayak, melambangkan keberanian, perlindungan, dan identitas budaya masyarakat Dayak.'
  }
};

const modal = document.getElementById('explanation-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close-btn');
const infoButtons = document.querySelectorAll('.info-btn');
const modalContent = document.querySelector('.modal-content');

/* ===== FUNCTION: OPEN MODAL ===== */
const openModal = (info) => {
  modalTitle.textContent = info.title;
  modalText.textContent = info.text;

  modal.classList.remove('hidden');
  modalContent.classList.remove('closing');
};

/* ===== FUNCTION: CLOSE MODAL WITH ANIMATION ===== */
const closeModal = () => {
  if (modal.classList.contains('hidden')) return;

  modal.classList.add('closing');
  modalContent.classList.add('closing');

  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('closing');
    modalContent.classList.remove('closing');
  }, 300); // harus sama atau sedikit lebih besar dari animasi CSS
};

/* ===== ASSIGN BUTTON EVENTS ===== */
infoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const infoId = button.getAttribute('data-info');
    const info = explanations[infoId];
    if (info) openModal(info);
  });
});

/* ===== CLOSE EVENTS ===== */
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
