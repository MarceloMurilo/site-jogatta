// js/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerResult = document.getElementById('registerResult');
  
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Pega valores dos campos
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const tt = document.getElementById('tt').value.trim();
      let altura = document.getElementById('altura').value.trim();
  
      // Valida altura (opcional, como no app)
      if (altura) {
        const numericAltura = parseFloat(altura.replace(',', '.'));
        // Se usuário digitou vírgula, converte pra ponto
        if (numericAltura > 2.51) {
          alert('Você é tão alto assim? A altura máxima permitida é 2.51m.');
          return;
        }
        // Padroniza a altura para string
        altura = numericAltura.toString();
      }
  
      // Monta objeto para enviar
      const payload = {
        nome: name,
        email: email,
        senha: password,
        tt: tt,
        altura: altura, // pode ser string ou number
      };
  
      // Chama o backend (AJUSTE A URL para seu backend real)
      const urlBackend = 'https://backendjogatta.onrender.com/api/auth/register';
  
      try {
        // Exibe loading ou algo similar
        registerResult.innerHTML = '<p>Enviando dados...</p>';
  
        const response = await fetch(urlBackend, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          // Se a API retornar status != 200, 201, etc.
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao cadastrar');
        }
  
        const data = await response.json();
        console.log('Cadastro bem-sucedido:', data);
  
        registerResult.innerHTML = `
          <p style="color: green; font-weight: bold;">
            Cadastro realizado com sucesso!<br/>
            Agora baixe o APK e faça login no aplicativo.
          </p>
        `;
  
        // Opcional: limpar campos do formulário
        registerForm.reset();
      } catch (error) {
        console.error('Erro ao registrar:', error);
        registerResult.innerHTML = `
          <p style="color: red; font-weight: bold;">
            Falha no cadastro: ${error.message}
          </p>
        `;
      }
    });
  });
  