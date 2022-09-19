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

//Desloca os elementos na tela
//recebe parâmetros elemento, velocidade, incremento
const moveElemento = (el, veloc, inc) => {
    //executa a cada x milissegundos
    const anima = setInterval(() => {
        
        veloc = veloc + inc
        el.style.left = veloc + 'px'
        //verifica se elemento saiu do quadro 
        //OU se foi clicado (classe "morto")
        //retorna para uma posição 
        //à esquerda quadro (re-entra)
        if (veloc > larguraQuadro || el.classList.contains('morto')) {
            //sorteia um valor entre -50 e -500
            veloc = -Math.random() * 450 + 50
            inc = Math.random() * 40 + 10
            posicElement(el)
            el.classList.remove('morto')
        }
        //Adiciona atributo velocidade para
        //consulta no código JS
        el.setAttribute('velocidade', inc)
    }, 40);
}



//ao clicar nos insetos
const clickBug = (el) => {
    //Adiciona a classe "morto" ao inseto
    el.classList.add('morto')
    //adiciona 10 pts ao score
    score += 10
    //se o inseto clicado for bonzinho perde 50 pontos
    if(el.classList.contains('bonzinho')){
        score -= 60
    }
    document.getElementById('score').innerText = score
    //Se velocidade for maior que 20, faz 100 pontos
    //apenas nos insetos que tenha a classe "invasor"
    if (el.getAttribute('velocidade') > 20 && el.classList.contains('invasor')){
        score += 100
        // mostra +100 pontos após  1/2 segundo
        let pts100 = document.getElementById('pts100')
        pts100.style.left = el.style.left
        pts100.style.top = el.style.top
        /*
        const mostra100pts = setInterval(() => {
            pts100.style.left = '-300px'
            //interrompe o setInterval 
            clearInterval(mostra100pts)
        }, 500); */

        const mostra100pts = setTimeout(() => {
            pts100.style.left = '-300px'
        }, 500);
    }
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
    moveElemento(inv, Math.random() * 10, Math.random() * 19 + 1)
    // e.target = elemento que executa o evento, ou seja, inseto clicado
    inv.addEventListener('mousedown', (e) => { clickBug(e.target) })

}

for (bom of bonzinhos){
    posicElement(bom)
    moveElemento(bom, Math.random() * 10, Math.random() * 19 + 1)
    // e.target = elemento que executa o evento, ou seja, inseto clicado
    bom.addEventListener('mousedown', (e) => { clickBug(e.target) })

}

//contagem regressiva 
setTimeout(() => {
    //avisa ao usuário ofim do tempo
    alert('tempo esgotado!!!')
    //recarrega a página - semelhante
    location.reload(true)     
}, tempoRestante*1000);

// a cada segundo mostra o tempo restante
const mostratempo = setInterval(() => {
    document.getElementById('infoTR').innerText = tempoRestante
    document.getElementById('temporest').innerText = tempoRestante --

}, 1000);




