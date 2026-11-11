const CARDAPIO = {

    'Pizzas': {

        'Tradicionais': [
            { nome: 'Alho e Óleo',    descricao: 'Molho, mussarela, tomate, parmesão gratinado, alho e orégano.',                          preco: null },
            { nome: 'Calabresa',      descricao: 'Molho, mussarela, linguiça calabresa fatiada, cebola e orégano.',                        preco: null },
            { nome: 'Frangopiry',     descricao: 'Molho, frango desfiado, mussarela, catupiry, azeitona e orégano.',                       preco: null },
            { nome: 'Casa Nostra',    descricao: 'Molho, mussarela, presunto, bacon, peito de frango desfiado, ervilha, milho verde e orégano.', preco: null },
            { nome: 'Moda da Casa',   descricao: 'Molho, mussarela, presunto, calabresa, bacon, pimentão, cebola, azeitonas e orégano.',   preco: null },
            { nome: 'Quatro Queijos', descricao: 'Molho, mussarela, catupiry, parmesão, queijo prato, azeitonas e orégano.',               preco: null }
        ],

        'Especiais': [
            { nome: 'Parmegiana', descricao: 'Molho, mussarela, bife à milanesa, parmesão gratinado e orégano.', preco: null }
        ]

    },

    'Hambúrgueres': {
        'Tradicionais': [
            { nome: 'Clássico', descricao: 'Pão, hambúrguer, queijo, alface e tomate.', preco: null },
            { nome: 'Bacon',    descricao: 'Pão, hambúrguer, queijo e bacon crocante.',  preco: null }
        ],

        'Originais': [

            { nome: 'BaconBurger', descricao:'Sensacional hambúrguer caseiro com 180g Coberto com finas e suculentas fatias de Bacon, queijo cheddar, molho barbecue da casa e cebola caramelizada no Pão de Hambúrguer Caseiro. Acompanha fritas e molho da casa.'}

        ]
    },

    'Bebidas': [
        { nome: 'Refrigerante lata', descricao: '350 ml.',              preco: null },
        { nome: 'Suco natural',      descricao: 'Consulte os sabores.', preco: null }
    ],

    'Sobremesas': [
        { nome: 'Pizza doce', descricao: 'Consulte os sabores.', preco: null }
    ]

};

const abas = document.getElementById('cardapio-abas');
const subabas = document.getElementById('cardapio-subabas');
const itens = document.getElementById('cardapio-itens');

function formatarPreco(preco) {
    if (typeof preco !== 'number' || preco <= 0) return 'Consulte';
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Uma categoria com subcategorias é um objeto; sem subcategorias, uma lista
function temSubCategorias(categoria) {
    return !Array.isArray(CARDAPIO[categoria]);
}

function marcarAtiva(container, texto) {
    container.querySelectorAll('button').forEach(botao => {
        const ativa = botao.textContent === texto;
        botao.classList.toggle('ativa', ativa);
        botao.setAttribute('aria-selected', String(ativa));
    });
}

function mostrarPratos(lista) {
    itens.replaceChildren();

    lista.forEach(prato => {
        const card = document.createElement('div');
        card.className = 'prato-item';
        card.tabIndex = 0;

        const topo = document.createElement('div');
        topo.className = 'prato-topo';

        const nome = document.createElement('h3');
        nome.textContent = prato.nome;

        const preco = document.createElement('span');
        preco.className = 'prato-preco';
        preco.textContent = formatarPreco(prato.preco);

        topo.appendChild(nome);
        topo.appendChild(preco);

        const descricao = document.createElement('p');
        descricao.textContent = prato.descricao;

        card.appendChild(topo);
        card.appendChild(descricao);
        itens.appendChild(card);
    });
}

function mostrarSubcategoria(categoria, sub) {
    marcarAtiva(subabas, sub);
    mostrarPratos(CARDAPIO[categoria][sub]);
}

function mostrarCategoria(categoria) {
    marcarAtiva(abas, categoria);
    subabas.replaceChildren();

    if (temSubCategorias(categoria)) {
        const subs = Object.keys(CARDAPIO[categoria]);

        subs.forEach(sub => {
            const botao = document.createElement('button');
            botao.type = 'button';
            botao.setAttribute('role', 'tab');
            botao.textContent = sub;
            botao.addEventListener('click', () => mostrarSubcategoria(categoria, sub));
            subabas.appendChild(botao);
        });

        subabas.hidden = false;
        mostrarSubcategoria(categoria, subs[0]);
    } else {
        subabas.hidden = true;
        mostrarPratos(CARDAPIO[categoria]);
    }
}

if (abas && subabas && itens) {
    const categorias = Object.keys(CARDAPIO);

    categorias.forEach(categoria => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.setAttribute('role', 'tab');
        botao.textContent = categoria;
        botao.addEventListener('click', () => mostrarCategoria(categoria));
        abas.appendChild(botao);
    });

    mostrarCategoria(categorias[0]);
}
