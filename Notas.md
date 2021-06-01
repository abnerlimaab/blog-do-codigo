## Função de espalhaento ou Hashing

- Função utilizada para transformar uma cadeia de dados em algo aparentemente aleatório
- SHA-256 (senha, salt, custo) = senha hash
    - salt 
        - é uma string pseudo-aleatória de uso único
        - é gerada automáticamente
    - quanto maior o custo, maior o intervalo do processamento

## Função bcrypt.hash

- Criar a função dentro do model para gerar a senha hash
- Implementar um sistema de login    
    - Payload 
        - São todos os dados que realmente importam
    - Cabeçalho
        - Algoritimo de assinatura
        - HMAC-SHA256
        - Tipo do Token
    - Assinatura
        - HMACSH256(base64URL(caabeçalho) + "." + base64URL(payload), "senha secreta")
            - Autenticador de mensagem MAC
            - Apenas o servidor tem a senha secreta
    - Middlewares de autenticação
        - Instalar passport
        - instalar passport-local
        - Criar o arquivo estrategia-autenticacao.js

## Gerando Tokens

- Utilizar o Json Web Token para gerar os tokens
- Criar a função criaTokenJWT no Controller de Usuário
    - A função recebe o usuário como parãmetro
    - Criar o payload
    - Gerar o token com o método sign() do jwt passando o payload e a senha secreta
    - Retornar o token
    - Adicionar o token na função do login
    - Enviar o token no cabeçalho Authorization da resposta

## Gerando Senhas Seguras

- Utilizar o método randomBytes da bibliotecca crypto
- Converter o número gerado para string no format BASE64
    - node -e "console.log( require('crypto').randomBytes(256).toString('base64'))"
- Guardar a senha gerada em uma variável de ambiente para evitar sua publicação no código

## Utilizando variáveis de ambiente

- Instalar dotenv para ler a variável de ambiente
- Importar dotenv dentro do server.js
- Invocar o método .config() do dotenv que configura as variáveis de ambiente.
- A chave é compartilhada por todo o programa
- Utilizar a variável process.env.NOME_DA_CHAVE para ler a variável