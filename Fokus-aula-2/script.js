const html = document.querySelector('html')

//varávies dos botões
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')

//variavés que são usadas para as funções de música
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')

//variáveis de áudios
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const musicaBepp = new Audio('./sons/beep.mp3')
const audioPause = new Audio('./sons/pause.mp3')
const audioPlay = new Audio('./sons/play.wav')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
    
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })


     html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }

}

 const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaBepp.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        audioPause.play()
        zerar()
        return   
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000) //setInterval é um cronômetro que executa uma função em intervalos regulares de tempo, ele é útil para animações e/ou realizar tarefas repetitivas em um determinado tempo.
    iniciarOuPausarBt.textContent = "Pausar"//textContent: método que permite você ler ou modificar o texto dentro de um elemento HTML.
    iniciarOuPausarBtIcone.setAttribute('src', './imagens/pause.png')
}

function zerar() {
 clearInterval(intervaloId)
 intervaloId = null
 iniciarOuPausarBt.textContent = "Começar"
 iniciarOuPausarBtIcone.setAttribute('src', './imagens/play_arrow.png')
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}` //método que é utilizado para inserir texto na tela, pode utilizar as classes também
}

mostrarTempo()