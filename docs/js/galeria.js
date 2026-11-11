const FOTOS = [
    { src: '../img/Imagem_Prato_1.jpeg', alt: 'Prato da Casa Nostra 1' },
    { src: '../img/Imagem_Prato_2.jpeg', alt: 'Prato da Casa Nostra 2' },
    { src: '../img/Imagem_Prato_3.jpeg', alt: 'Prato da Casa Nostra 3' },
    { src: '../img/Imagem_Prato_4.jpeg', alt: 'Prato da Casa Nostra 4' },
    { src: '../img/Imagem_Prato_5.jpeg', alt: 'Prato da Casa Nostra 5' }
];

// Exemplos de teste: troque por depoimentos reais antes de publicar
const DEPOIMENTOS = [
    { nome: 'Cliente 1', texto: 'Texto do depoimento 1.', nota: 5 },
    { nome: 'Cliente 2', texto: 'Texto do depoimento 2.', nota: 5 },
    { nome: 'Cliente 3', texto: 'Texto do depoimento 3.', nota: 5 }
];

// ===== Galeria =====
const grade = document.getElementById('galeria-grade');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxFechar = document.getElementById('lightbox-fechar');

if (grade && lightbox && lightboxImg) {
    FOTOS.forEach(foto => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'galeria-item';
        botao.setAttribute('aria-label', `Ampliar foto: ${foto.alt}`);

        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = 'lazy';

        botao.appendChild(img);
        botao.addEventListener('click', () => {
            lightboxImg.src = foto.src;
            lightboxImg.alt = foto.alt;
            lightbox.showModal();
        });

        grade.appendChild(botao);
    });

    lightboxFechar.addEventListener('click', () => lightbox.close());

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.close();
    });
}

// ===== Depoimentos =====
const listaDepoimentos = document.getElementById('depoimentos-lista');

if (listaDepoimentos) {
    DEPOIMENTOS.forEach(dep => {
        const card = document.createElement('blockquote');
        card.className = 'depoimento';

        const estrelas = document.createElement('div');
        estrelas.className = 'depoimento-estrelas';
        estrelas.textContent = '★'.repeat(dep.nota) + '☆'.repeat(5 - dep.nota);
        estrelas.setAttribute('aria-label', `Nota ${dep.nota} de 5`);

        const texto = document.createElement('p');
        texto.textContent = dep.texto;

        const autor = document.createElement('footer');
        autor.textContent = dep.nome;

        card.appendChild(estrelas);
        card.appendChild(texto);
        card.appendChild(autor);
        listaDepoimentos.appendChild(card);
    });
}
