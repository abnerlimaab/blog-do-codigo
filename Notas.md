## Função de espalhaento ou Hashing

Função utilizada para transformar uma cadeia de dados em algo aparentemente aleatório

MD5

SHA-256 (senha, salt, custo) = senha hash
    -> salt 
        - é uma string pseudo-aleatória de uso único
        - é gerada automáticamente
    -> quanto maior o custo, maior o intervalo do processamento

## Função bcrypt.hash

1 - Criar a função dentro do model para gerar a senha hash

2 - Implementar um sistema de login
    
    - Payload 
        - São todos os dados que realmente importam
    - Cabeçalho
        - Algoritimo de assinatura
        - HMAC-SHA256
        - Tipo do Token
    - Assinatura
        - HMACSH256(base64U\RL(caabeçalho) + "." + base64URL(payload), "senha secreta")
            - Autenticador de mensagem MAC
            - Apenas o servidor tem a senha secreta

    2.1 - Middlewares de autenticação
        - Instalar passport
        - instalar passport-local
        - Criação do arquivo estrategia-autenticacao.js