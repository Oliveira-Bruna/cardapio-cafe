const tabelaProdutos = document.getElementById('tabela-produtos');
let idParaExcluir = null;

function abrirModalEditar(produto) {
    document.getElementById('modal-editar').classList.remove('hidden');
    document.getElementById('editar-id').value = produto.id;
    document.getElementById('editar-nome').value = produto.name;
    document.getElementById('editar-descricao').value = produto.description;
    document.getElementById('editar-preco').value = produto.price;
    document.getElementById('editar-categoria').value = produto.type ?? '';
    document.getElementById('editar-size').value = produto.size;
}

function fecharModalEditar() {
    document.getElementById('modal-editar').classList.add('hidden');
}

function abrirModalExcluir(id) {
    idParaExcluir = id;
    document.getElementById('modal-excluir').classList.remove('hidden');
}

function fecharModalExcluir() {
    idParaExcluir = null;
    document.getElementById('modal-excluir').classList.add('hidden');
}

async function buscarProdutos() {
    try {
        const response = await fetch('http://localhost:8000/api/products');
        const result = await response.json();

        const produtos = Array.isArray(result) ? result : result.data;
        tabelaProdutos.innerHTML = '';

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.className = "border-b hover:bg-gray-50";

            tr.innerHTML = `
                        <td class="px-4 py-3">
                            <img src="http://127.0.0.1:8000${produto.image ?? './img/produto-padrao.png'}" alt="${produto.name}"
                                class="w-16 h-16 object-cover rounded">
                        </td>
                        <td class="px-4 py-3">${produto.name}</td>
                        <td class="px-4 py-3">${produto.description}</td>
                        <td class="px-4 py-3">${parseFloat(produto.price).toFixed(2)}</td>
                        <td class="px-4 py-3">${produto.type ?? 'Sem categoria'}</td>
                        <td class="px-4 py-3">${produto.size ?? 'Normal'}</td>
                        <td class="px-4 py-3 text-center">
                            <button class="p-2 hover:bg-blue-100 rounded">
                                <img src="./img/edit-button.png" alt="Editar" class="w-6 h-6 mx-auto">
                            </button>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <button class="p-2 hover:bg-red-100 rounded">
                                <img src="./img/deletar-button.png" alt="Excluir" class="w-6 h-6 mx-auto">
                            </button>
                        </td>
                    `;

            tr.querySelector('td:nth-child(7) button')
                .addEventListener('click', () => abrirModalEditar(produto));

            tr.querySelector('td:nth-child(8) button')
                .addEventListener('click', () => abrirModalExcluir(produto.id));

            tabelaProdutos.appendChild(tr);
        });

    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

document.getElementById('form-editar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editar-id').value;
    const dados = {
        name: document.getElementById('editar-nome').value,
        description: document.getElementById('editar-descricao').value,
        price: parseFloat(document.getElementById('editar-preco').value),
        type: document.getElementById('editar-categoria').value,
        size: document.getElementById('editar-size').value
    };

    try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro na API:', errorData);
            alert('Erro ao editar produto!');
            return;
        }

        fecharModalEditar();
        buscarProdutos();
    } catch (error) {
        console.error('Erro ao editar:', error);
    }
});

async function confirmarExclusao() {
    if (!idParaExcluir) return;

    try {
        const response = await fetch(`http://localhost:8000/api/products/${idParaExcluir}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro na API:', errorData);
            alert('Erro ao excluir produto!');
            return;
        }

        fecharModalExcluir();
        buscarProdutos();
    } catch (error) {
        console.error('Erro ao excluir:', error);
    }
}

document.addEventListener('DOMContentLoaded', buscarProdutos);