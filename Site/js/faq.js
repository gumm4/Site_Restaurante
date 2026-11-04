const STORAGE_KEY = 'casanostra_faqs';

const FAQS_PADRAO = [
    {
        pergunta: 'Quais são os horários de funcionamento?',
        resposta: 'Terça à Quinta e Domingo: 17:00 às 23:00. Sexta e Sábado: 17:00 às 00:00.'
    },
    {
        pergunta: 'Vocês fazem entregas?',
        resposta: 'Sim, trabalhamos com delivery. Você pode pedir pelo nosso cardápio online ou pelo telefone do estabelecimento.'
    },
    {
        pergunta: 'Aceitam cartão de crédito?',
        resposta: 'Sim, aceitamos cartões de crédito, débito, pix e dinheiro.'
    },
    {
        pergunta: 'Possuem opções vegetarianas?',
        resposta: 'Sim, temos diversas opções de massas e pizzas vegetarianas no cardápio.'
    },
    {
        pergunta: 'É necessário fazer reserva?',
        resposta: 'Não é obrigatório, mas recomendamos reservar para finais de semana e feriados.'
    }
];

function obterFaqs() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
        try {
            return JSON.parse(salvo);
        } catch (e) {
            return FAQS_PADRAO;
        }
    }
    return FAQS_PADRAO;
}

function salvarFaqs(faqs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs));
}

let faqs = obterFaqs();

const lista = document.getElementById('lista-faqs');
const form = document.getElementById('form-nova-pergunta');
const inputPergunta = document.getElementById('nova-pergunta');
const inputResposta = document.getElementById('nova-resposta');

function renderizar() {
    lista.innerHTML = '';

    faqs.forEach((faq, index) => {
        const item = document.createElement('div');
        item.className = 'faq-item';

        const cabecalho = document.createElement('div');
        cabecalho.className = 'faq-pergunta';
        cabecalho.setAttribute('role', 'button');
        cabecalho.setAttribute('aria-expanded', 'false');
        cabecalho.setAttribute('aria-controls', `resposta-${index}`);
        cabecalho.tabIndex = 0;
        const textoPergunta = document.createElement('span');
        textoPergunta.textContent = faq.pergunta;

        const seta = document.createElement('span');
        seta.className = 'seta';
        seta.textContent = '▼';

        cabecalho.append(textoPergunta, seta);


        const corpo = document.createElement('div');
        corpo.className = 'faq-resposta';
        corpo.id = `resposta-${index}`;
        corpo.textContent = faq.resposta;

        function alternar() {
            const aberto = item.classList.contains('aberto');
            document.querySelectorAll('.faq-item.aberto').forEach(el => {
                el.classList.remove('aberto');
                el.querySelector('.faq-pergunta').setAttribute('aria-expanded', 'false');
            });
            if (!aberto) {
                item.classList.add('aberto');
                cabecalho.setAttribute('aria-expanded', 'true');
            }
        }

        cabecalho.addEventListener('click', alternar);
        cabecalho.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                alternar();
            }
        });

        item.appendChild(cabecalho);
        item.appendChild(corpo);
        lista.appendChild(item);
    });
}

function adicionarFaq(e) {
    e.preventDefault();

    const pergunta = inputPergunta.value.trim();
    const resposta = inputResposta.value.trim();

    if (!pergunta || !resposta) return;

    faqs.push({ pergunta, resposta });
    salvarFaqs(faqs);
    renderizar();

    form.reset();
    inputPergunta.focus();
}

form.addEventListener('submit', adicionarFaq);

renderizar();
