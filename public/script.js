const API_URL = 'http://localhost:3000/usuarios';

async function listarUsuarios() {
    const resposta = await fetch(API_URL);

    const usuarios = await resposta.json();

    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = '';

    usuarios.forEach(usuario => {
        const item = document.createElement('li');
        item.textContent = `${usuario.nome} - ${usuario.email}`;
        lista.appendChild(item);
    });
}

async function cadastrarUsuario() {
    
    const nome = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;

    const dados = { nome, email };

    const resposta = await fetch(API_URL, { 
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (resposta.ok) {
        alert("Usuário cadastrado com sucesso!");

        document.getElementById('input-name').value = '';
        document.getElementById('input-email').value = '';
        listarUsuarios();
    } else {
        const erro = await resposta.json();
        alert(erro.erro);
    }
}

document.getElementById('input-button').addEventListener('click', cadastrarUsuario);
listarUsuarios();