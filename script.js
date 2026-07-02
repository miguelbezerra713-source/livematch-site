document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function googleTranslateElementInit() {
  if (!window.google?.translate) return;
  new google.translate.TranslateElement({
    pageLanguage: 'pt',
    autoDisplay: false,
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

const amountInput = document.getElementById('investmentAmount');
const equityInput = document.getElementById('equityPercent');
const calculationNote = document.getElementById('calculationNote');
const investorContact = document.getElementById('investorContact');
const ROUND_AMOUNT = 300000;
const ROUND_EQUITY = 10;

function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
function money(value) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value); }
function refreshContact(amount, equity) {
  calculationNote.textContent = `${money(amount)} correspondem a aproximadamente ${equity.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}% da empresa.`;
  const body = `Olá! Tenho interesse em conhecer a rodada do LiveMatch.\n\nValor indicativo: ${money(amount)}\nParticipação estimada: ${equity.toFixed(4)}%\nNome: \nPaís: \nPerfil do investidor: `;
  investorContact.href = `mailto:liveMatch750@gmail.com?subject=${encodeURIComponent('Interesse de investimento no LiveMatch')}&body=${encodeURIComponent(body)}`;
}
amountInput?.addEventListener('input', () => {
  const amount = clamp(Number(amountInput.value) || 1000, 1000, ROUND_AMOUNT);
  const equity = amount / ROUND_AMOUNT * ROUND_EQUITY;
  equityInput.value = equity.toFixed(4);
  refreshContact(amount, equity);
});
equityInput?.addEventListener('input', () => {
  const equity = clamp(Number(equityInput.value) || (1000 / ROUND_AMOUNT * ROUND_EQUITY), 1000 / ROUND_AMOUNT * ROUND_EQUITY, ROUND_EQUITY);
  const amount = equity / ROUND_EQUITY * ROUND_AMOUNT;
  amountInput.value = Math.round(amount);
  refreshContact(amount, equity);
});
refreshContact(1000, 1000 / ROUND_AMOUNT * ROUND_EQUITY);
