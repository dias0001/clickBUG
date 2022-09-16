/*
--------------------------------------------------------------------------------
                        variáveis e funções
--------------------------------------------------------------------------------
*/
// lista com os invasor
let invasores = document.getElementsByClassName('invasor')



//lstas com os "bonzinhos"
let bonzinhos = document.getElementsByClassName('bonzinho')

let score = 0
let tempoRestante = 30

let larguraQuadro = document.getElementById('quadro').offsetWidth

//função paraposicionar um elemento
//recebe parameto el que informa o elemento
const posicElement = (el) => {
    let posX = Math.floor(Math.random() * 1000)  // (*900 + 100) 100 a 1000
    let posY = Math.floor(Math.random() * 400)
    el.style.position = 'absolute'
    el.style.left = -posX + 'px'
    el.style.top = posY + 'px'
}

//desloca os elementos na tela
//recebe parâmetros elemento (div), velocidade, incremento
const moveElemento = (el, veloc, inc)=> {


    //executa a cada x milisegundos
    const anima = setInterval(() => {
        veloc =  veloc + inc
        el.style.left = veloc + 'px'
        //verifica se elemento saiu do quadro
        //volta para uma posição inicial
        if(veloc > larguraQuadro && el.classList.contain('emtela')) {
            el.classList.remove('emtela')
            posicElement(el)
        }
    }, 40);

}
/*
-------------------------------------------------------------------------------
                      eventos e execuções automáticas
-------------------------------------------------------------------------------
*/
//posicElement(document.getElementById('inv1'))
//posicElement(document.getElementById('inv2'))
//posicElement(document.getElementById('inv3'))

for (inv of invasores) {
    posicElement(inv)
    moveElemento(inv, Math.random()*10,Math.random()*19 + 1)
}

