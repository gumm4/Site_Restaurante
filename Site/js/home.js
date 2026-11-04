let indiceSlide = 0;
const slide = document.querySelectorAll('.slide');


function mostrarSlide(index) {

    if (index >= slide.length) {
        indiceSlide = 0;
    }

    else if (index < 0) {
        indiceSlide = slide.length - 1;
    } else {
        indiceSlide = index;
    }

    slide.forEach(slide => slide.classList.remove('ativo'));

    slide[indiceSlide].classList.add('ativo');

}

function mudarSlide(direcao) {
    mostrarSlide(indiceSlide + direcao);
}