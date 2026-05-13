console.log(document.querySelector('#cadastroUsuario'))
document.querySelector('#cadastroUsuario').addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o recarregamento da página
    console.log("a")
    const formData = new FormData(this);

    // Exibir os dados no console (para depuração)
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    // Enviar os dados via fetch para um backend (exemplo)
    const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        body: formData, // Enviando direto
        headers:{
            "Accept": "application/json",
        }
    });

    const result = await response.json();
    console.log("Resposta do servidor:", result);

    if (response.status == 201){
        alert('Usuario criado')
        window.location.href = '/Projeto_5_Semestre/AromaESabor/src/html/login.html';
    }
    else{
        alert(result.erro)
    }
})