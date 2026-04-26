# Configuração do Sistema de Email para o Formulário de Contato

## 📋 Pré-requisitos

Para que o formulário de contato funcione e envie emails para `kauaneres.dev@gmail.com`, você precisa configurar o EmailJS.

## 🚀 Passo a Passo

### 1. Criar uma Conta no EmailJS
- Acesse: https://www.emailjs.com/
- Clique em "Sign Up" e crie uma conta (você pode usar sua conta do Gmail)

### 2. Obter sua Chave Pública
- Após fazer login, vá para **Dashboard**
- Procure por "Public Key" (normalmente em Account > API Keys)
- Copie sua chave pública

### 3. Conectar Gmail
- No Dashboard, vá para **Email Services**
- Clique em "Add Service"
- Selecione **Gmail**
- Clique em "Connect Account"
- Autorize o EmailJS a acessar sua conta Gmail
- Copie o **Service ID** (exemplo: `service_xxxxxxxx`)

### 4. Criar um Template de Email
- No Dashboard, vá para **Email Templates**
- Clique em "Create New Template"
- Use as seguintes configurações:

**Template Settings:**
- **Name:** `Contact Form Template` (ou qualquer nome)
- **Template ID:** `template_contact` (IMPORTANTE - use exatamente este ID)

**Email Content:**
- **To Email:** `{{to_email}}`
- **Subject:** `Nova Mensagem de Contato de {{user_name}}`

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
        .header { border-bottom: 2px solid #3b82f6; padding-bottom: 15px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nova Mensagem de Contato</h2>
        </div>
        
        <div class="field">
            <div class="label">Nome:</div>
            <div class="value">{{user_name}}</div>
        </div>
        
        <div class="field">
            <div class="label">Email:</div>
            <div class="value">{{user_email}}</div>
        </div>
        
        <div class="field">
            <div class="label">Mensagem:</div>
            <div class="value" style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-left: 3px solid #3b82f6;">{{message}}</div>
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Esta é uma mensagem automática do seu formulário de contato.
        </p>
    </div>
</body>
</html>
```

### 5. Atualizar o script.js
- Abra o arquivo `script.js`
- Procure por esta linha: `emailjs.init('OjHi5dYz8sIRm6cDZ');`
- Substitua `'OjHi5dYz8sIRm6cDZ'` por sua **Public Key** do EmailJS
- Procure por: `await emailjs.send('service_contact_portfolio', 'template_contact'`
- Substitua `'service_contact_portfolio'` por seu **Service ID**

## ✅ Testar o Formulário

1. Abra seu portfolio no navegador
2. Vá até a seção de contato
3. Preencha o formulário com dados válidos:
   - Nome: mínimo 2 caracteres, apenas letras
   - Email: formato válido de email
   - Mensagem: mínimo 10 caracteres
4. Clique em "Send Message"
5. Você deve ver uma mensagem de sucesso

## 🔍 Variáveis do Template

O template usa as seguintes variáveis que são automaticamente preenchidas:
- `{{to_email}}` - Email de destino (kauaneres.dev@gmail.com)
- `{{user_name}}` - Nome do remetente
- `{{user_email}}` - Email do remetente
- `{{message}}` - Mensagem enviada

## 🐛 Troubleshooting

### "Failed to send email"
- Verifique se sua Public Key está correta no script.js
- Verifique se o Service ID está correto
- Certifique-se de que o Template ID é `template_contact`

### Emails não chegam no Gmail
- Verifique se o serviço Gmail está conectado e ativo no EmailJS
- Verifique a pasta de spam
- Confira se a autorização do Gmail foi concedida

### Validação não funciona
- Abra o console do navegador (F12)
- Procure por erros
- Verifique se o EmailJS está carregando corretamente

## 💡 Dicas de Segurança

- Nunca cometa sua Secret Key do EmailJS (apenas use Public Key)
- A Public Key é segura de compartilhar publicamente
- Considere adicionar reCAPTCHA para prevenir spam no futuro

## 📞 Suporte

Para mais informações sobre EmailJS, visite: https://www.emailjs.com/docs/
