const dino = document.querySelector('.dino'); /*seleciona o dino e coloca na const*/
const background = document.querySelector('.background')
let position = 0; 
// criar variavel para que não fique pulando quando nao precisa
let isJumping =  false;

/*// evento de tecla pressiona
document.addEventListener('keyup', function(){
    //console.log('pressionou uma tecla'); -- teste
});*/

// isolar função para o método não ficar muito grande
// adcc argumento event é eviado para função toda vez
// que alguém pressiona uma tecla pelo navegador
function handlekeyUp(event) {
    // keyCode é o código da tecla que foi pressionado
    // site: keyCode.info mostra o código da tecla
    if(event.keyCode === 32){
// numero 32 é o espaço
        //console.log('pressionou espaço')
        // chama a funcao jump quando pressionar o espaço
           jump();
        
       
    }

}

// funcao para pular
function jump() {
   // posição inicial, semre começa embaixo
    isJumping = true;
    // aqui ela vai movimentar o dino para cima
   // variavel para fazer a animação, intervalo para fazer coisas
                    // funcao do js setInterval serve para definir intervalos
    let upInterval = setInterval(() => {
        // se atender essa condição faz para de subir
        if(position >= 150) {
            // limpa o intervalo
            clearInterval(upInterval);

            // descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    // limpa o intervalo de descida
                    clearInterval(downInterval)
                    isJumping = false;  
                } else {
                    position -= 20; // pega valor e tira 20
                    dino.style.bottom = position + 'px';
                }
            }, 20);

        } else {

            /*Subindo*/ 
            position += 20; // pega valor da posição e adiciona 20
            // para fazer pular // bottom propriedade adcc no css
            dino.style.bottom = position + 'px';
        }
    }, 20);
        // codigo executado a cada 20 milissegundos, 
        //ai coonsegue executar o código de maneira repetida
        // fazer ele subir
}

// criando os cactos
function createCactos() {
    const cactus = document.createElement('div');
    // posição do cacto
    let cactusPosition = 1000;
    // numero aleatorio para criar novo cactu
    let randomTime = Math.random() * 6000; // aleatoridade p/ gerar novo cactu

    cactus.style.left = 1000 + 'px';
    //addc classe
    cactus.classList.add('cactus');
    // pegou o background pela querySelector e adicionou um filho
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        // fazer novos cactos surgerem
        // evita processamento desnecessário
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus); // quando chegar nessa posição remove da tela
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60 ) {
            // game over 

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';


        } else{
            cactusPosition -= 10; 
            cactus.style.left = cactusPosition + 'px';

        }
    }, 20) // velocidade que vai se mover para esquerda
    setTimeout(createCactos, randomTime);
}
// assim que o jogo começar, criar o cactus
// funcao que vai ser executada depois de determinado tempo
// funcao invocando ela msm de dentro dela / recursividade
// invocar criação de novo cactus

createCactos();
document.addEventListener('keyup', handlekeyUp);