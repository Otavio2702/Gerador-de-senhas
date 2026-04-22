// script.js - Lógica do Gerador de Senhas

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioSenha');
    const resultDiv = document.getElementById('resultado');
    const passwordSpan = document.getElementById('senha');
    const copyBtn = document.getElementById('botaoCopiar');
    const regenerateBtn = document.getElementById('botaoRegenerar');
    const lengthInput = document.getElementById('comprimento');
    const lengthValue = document.getElementById('valorComprimento');
    const strengthFill = document.getElementById('preenchimentoForca');
    const strengthText = document.getElementById('textoForca');

    // Atualizar valor do comprimento em tempo real
    lengthInput.addEventListener('input', () => {
        lengthValue.textContent = lengthInput.value;
    });

    // Gerar senha ao submeter formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generatePassword();
    });

    // Regenerar senha
    regenerateBtn.addEventListener('click', generatePassword);

    // Copiar senha
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordSpan.textContent).then(() => {
            copyBtn.textContent = '✅';
            setTimeout(() => copyBtn.textContent = '📋', 2000);
        });
    });

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        const uppercase = document.getElementById('maiusculas').checked;
        const lowercase = document.getElementById('minusculas').checked;
        const numbers = document.getElementById('numeros').checked;
        const symbols = document.getElementById('simbolos').checked;

        let charset = '';
        if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) charset += '0123456789';
        if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            alert('Selecione pelo menos uma opção!');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        passwordSpan.textContent = password;
        resultDiv.classList.remove('oculto');

        // Calcular força da senha
        const strength = calculateStrength(password);
        updateStrengthIndicator(strength);
    }

    function calculateStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }

    function updateStrengthIndicator(score) {
        const levels = [
            { width: '20%', color: '#dc3545', text: 'Muito Fraca' },
            { width: '40%', color: '#ffc107', text: 'Fraca' },
            { width: '60%', color: '#fd7e14', text: 'Média' },
            { width: '80%', color: '#28a745', text: 'Forte' },
            { width: '100%', color: '#20c997', text: 'Muito Forte' }
        ];
        const level = levels[Math.min(score, 4)];
        strengthFill.style.width = level.width;
        strengthFill.style.background = level.color;
        strengthText.textContent = level.text;
    }
});