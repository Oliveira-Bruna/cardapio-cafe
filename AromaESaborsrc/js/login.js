document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log(`teste`)

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('email:', email);
    console.log('password:', password);

    try {
        const apiUrl = 'http://localhost:8000/api/users/login';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }

        console.log('Resposta da API:', data);

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            // window.location.href = '/dashboard.html';
        }
        if(data.nivel_acesso == 2){
            window.location.href = '/Projeto_5_Semestre/AromaESabor/src/html/adm/produtos.html';
        }
        else{
            window.location.href = '/Projeto_5_Semestre/AromaESabor/src/html/cardapio.html';
        }

    } catch (error) {
        console.error('Erro:', error);
        alert(error)
    }
});