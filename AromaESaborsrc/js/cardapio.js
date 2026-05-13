async function carregarProduto() {
    try {
        const response = await fetch('http://localhost:8000/api/products');
        const result = await response.json();
        console.log(result);

        const produtos = Array.isArray(result) ? result : result.data;

        if (!produtos || !Array.isArray(produtos)) {
            throw new Error('Formato de dados inesperado');
        }

        const container = document.getElementById('menu');
        if (!container) {
            console.error("Elemento 'menu' não encontrado.");
            return;
        }
        container.innerHTML = '';

        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'p-4 relative border rounded-xl bg-white shadow-md flex flex-col items-center';

            card.innerHTML = `
                <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                    ${produto.type ?? 'Sem Categoria'}
                </div>
                <img class="w-full h-40 object-cover rounded"
                    src="http://127.0.0.1:8000${produto.image}" alt="${produto.name}">
                <h3 class="text-lg font-semibold mt-2">${produto.name}</h3>
                <p class="text-lg text-green-600">R$ ${parseFloat(produto.price).toFixed(2)}</p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarProduto);