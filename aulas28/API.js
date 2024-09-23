// Array para armazenar as postagens
let twitter = [];

// Captura os elementos da página
const botaoPub = document.getElementById('botaoPub');
const inputNome = document.getElementById('nomeUsuario');
const ul = document.getElementById('lista-nao-ordenada');
const textoPub = document.getElementById('textoPub');

// Função para ajustar a altura do textarea conforme o conteúdo cresce
function ajustarAltura() {
    this.style.height = 'auto'; // Reseta a altura inicial
    this.style.height = this.scrollHeight + 'px'; // Ajusta para a altura do conteúdo
}

// Adiciona o evento de input ao textarea para que a altura se ajuste dinamicamente
textoPub.addEventListener('input', ajustarAltura);

// Evento de clique no botão de publicar
botaoPub.addEventListener('click', async () => {
    // Verifica se o campo de nome não está vazio
    if (inputNome.value.trim()) {
        // Verifica se o campo de texto da postagem não está vazio
        if (textoPub.value.trim()) {
            // Carrega a imagem de gato antes de postar
            const linkGato = await carregaGato(); 
            // Adiciona um novo post ao início do array com os dados do usuário
            twitter.unshift({
                tweet: textoPub.value, // Texto do post
                Nome: inputNome.value, // Nome do usuário
                gatoImg: linkGato,     // URL da imagem do gato
                likes: 0               // Inicializa com zero likes
            });
            textoPub.value = ''; // Limpa o campo de texto após a postagem
            atualizarlista();    // Atualiza a lista de postagens
        } else {
            alert("Por favor, escreva o tweet.");
        }
    } else {
        alert("Por favor, escreva o Seu Nome abaixo da foto de perfil.");
    }
});

// Função assíncrona para buscar a imagem do gato usando a API
async function carregaGato() {
    try {
        // Faz requisição à API para obter uma imagem de gato
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const devGato = await response.json();
        const imageUrl = devGato[0].url; // Pega a URL da imagem
        return imageUrl; // Retorna a URL para ser usada no post
    } catch (error) {
        console.error('Erro ao carregar a imagem do gato:', error);
    }
}

// Função para atualizar a lista de postagens no HTML
const atualizarlista = () => {
    ul.innerHTML = ''; // Limpa a lista para evitar duplicatas
    for (let post of twitter) {
        // Cria os elementos HTML para cada post
        const imgs = document.createElement('img'); // Imagem do avatar fixo
        const imgGato = document.createElement('img'); // Imagem do gato
        const li = document.createElement('li'); // Elemento de lista (post)
        const botaoCurtir = document.createElement('button'); // Botão de curtir
        const contadorLikes = document.createElement('span'); // Contador de likes
        const likeContainer = document.createElement('div'); // Contêiner de likes

        // Cria os elementos de texto do nome e post
        const pNome = document.createElement('p');
        pNome.innerText = post.Nome; // Exibe o nome do usuário
        const ptwit = document.createElement('p');
        ptwit.innerText = post.tweet; // Exibe o texto do post

        // Atribui as imagens ao avatar e ao gato
        imgGato.src = post.gatoImg;
        imgGato.className = 'img-gato'; // Classe CSS para estilizar
        imgs.src = 'https://i.redd.it/qflfcveitxq51.png'; // Avatar fixo
        imgs.className = 'img-post'; 

        // Configura o botão de curtir e contador de likes
        botaoCurtir.className = 'botaoCurtir';
        botaoCurtir.innerHTML = '<i class="fa fa-thumbs-up"></i> Curtir'; // Ícone do botão
        contadorLikes.innerText = `Likes: ${post.likes}`; // Mostra o número de likes
        contadorLikes.className = 'curtidasContador';

        // Adiciona funcionalidade de curtir
        botaoCurtir.addEventListener('click', () => {
            post.likes++; // Incrementa o contador de likes
            contadorLikes.innerText = `Likes: ${post.likes}`; // Atualiza visualmente
        });

        // Organiza o contêiner do botão de curtir e o contador
        likeContainer.className = 'like-container';
        likeContainer.appendChild(botaoCurtir);
        likeContainer.appendChild(contadorLikes);

        // Adiciona os elementos criados à lista
        li.appendChild(imgs);
        li.appendChild(pNome);
        li.appendChild(ptwit);
        li.appendChild(imgGato);
        li.appendChild(likeContainer); // Adiciona o contêiner de likes
        ul.appendChild(li);

        // Adiciona uma linha de separação entre os posts
        const linhaSeparacao = document.createElement('hr');
        ul.appendChild(linhaSeparacao);
    }
};
