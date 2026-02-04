const API_URL = 'http://localhost:3000/usuarios';

async function listarUsuarios() {
    const resposta = await fetch(API_URL);

    const usuarios = await resposta.json();

    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = '';

    usuarios.forEach(usuario => {

        const item = document.createElement('li');

        const info = document.createElement('span');
        info.textContent = `${usuario.nome} - ${usuario.email}`;

        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = "excluir";
        btnDeletar.style.color = 'red';
        btnDeletar.style.marginLeft = '10px';

        btnDeletar.onclick = () => deletarUsuario(usuario.email);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = "Editar";
        btnEditar.style.marginLeft = '5px';

        btnEditar.onclick = () => editarUsuario(usuario.email);

        item.appendChild(info);
        item.appendChild(btnEditar);
        item.appendChild(btnDeletar);

        lista.appendChild(item);
    });
}

async function deletarUsuario(email) {
    if (confirm(`Tem certeza que quer apagar o ${email}?`)) {
        await fetch(`${API_URL}/${email}`, { method: 'DELETE'});
        listarUsuarios();
    }
}

async function editarUsuario(email) {

    const novoNome = prompt("insira o novo nome");
    if (novoNome) {
        await fetch(`${API_URL}/${email}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome })
        });
        listarUsuarios();
    }

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