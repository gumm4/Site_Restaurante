const HORARIOS  = {

    0: [17,23],
    1: null,
    2: [17,23],
    3: [17,23],
    4: [17,23],
    5: [17,24],
    6: [17,24]

};


const NOMES_DIAS = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];

function horarioBrasil() {

    const pares = new Intl.DateTimeFormat('en-US',{

        timeZone: 'America/Sao_Paulo',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
            
    }).formatToParts(new Date());

    const mapa = {};
    pares.forEach(p => mapa[p.type] = p.value);


    const dias = {Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6};
    const hora = parseInt(mapa.hour, 10) % 24;
    const minuto = parseInt(mapa.minute, 10);

    return { dia:dias[mapa.weekday], horaDecimal: hora + minuto / 60};

}

function formatarHora(h) {

    return (h % 24) + ':00'.replace(':00', 'h');

}

function proximaAbertura(diaAtual, horaDecimal) {

    for (let i = 0; i < 7; i++) {

        const dia = (diaAtual + i) % 7;
        const horario = HORARIOS[dia];
        if (!horario) continue;
        if (i === 0 && horaDecimal >= horario[0]) continue;
        const quando = i === 0 ? 'hoje' : (i === 1 ? 'amanhã' : NOMES_DIAS[dia]);
        return `${quando} às ${formatarHora(horario[0])}`;

    }

    return null;

}

function atualizarStatus() {

    const el = document.getElementById('status-funcionamento');
    if (!el) return;

    const { dia, horaDecimal} = horarioBrasil();
    const horario = HORARIOS[dia];
    const aberto = horario && horaDecimal >= horario[0] && horaDecimal < horario[1];

    if (aberto) {
        el.className = 'aberto';
        el.textContent = `Aberto agora . fecha às ${formatarHora(horario[1])}`;
    } else {

        el.className = 'fechado';
        const prox = proximaAbertura(dia, horaDecimal);
        el.textContent = prox ? `Fechado agora . abre ${prox}` : 'Fechado agora';

    }

}

atualizarStatus();
setInterval(atualizarStatus,60000);


const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu-principal');


function fecharMenu() {

    if (!menu || !botaoMenu) return;
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    botaoMenu.textContent = '☰';

}

if (botaoMenu && menu) {

    botaoMenu.addEventListener('click', () => {

        const abrir = !menu.classList.contains('aberto');
        menu.classList.toggle('aberto', abrir);
        botaoMenu.setAttribute('aria-expanded', String(abrir));
        botaoMenu.setAttribute('aria-label', abrir ? 'Fecha menu' : 'Abrir menu');
        botaoMenu.textContent = abrir ? 'x' : '☰'; 

    });

    document.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') fecharMenu();

    });


    window.addEventListener('resize', () => {

        if (window.innerWidth > 768) fecharMenu();

    });

}

