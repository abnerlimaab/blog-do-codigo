# Blog do código
> Um blog simples em Node.js

# Documentações

Json Web Token
https://www.npmjs.com/package/jsonwebtoken

# Notas

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

## Estratégia BEARER

- Instalar passport-http-bearer
- Importar bearerStrategy em estrategias-autenticacao.js
- Passar uma arrow function com o token como parâmetro da função
- Invocar o método verify de jwt passando o token da requisição e a chave secreta
    - Caso o token seja válido, será retornado o payload
    - Com o payload retornado, identificar o usuário no banco com o método responsável
- Enviar o usuario autenticado para o próximo middleware

## Implementar a estratégia na rota

- Importar o passport no arquivo da rota
- Utilizar o middleware de passport na rota
    - Parâmetros
        - nome da estratégia
        - objeto com modificadores

## Criando middlewares personalizados com a regra de negócio

- Implementar uma nova função de callback no terceiro parâmetro de passport.authenticate
    - Parâmetros
        - erro
        - requisição
        - objeto com informações
- Encapsular o passport.authenticate dentro de um novo middleware para ter acesso aos seus atributos

## Inserindo tempo de expiração no token

- Incluir um terceriro parâmetro no método jwt.sign que define o tempo de validade do token

~~~javascript
jwt.sign(payload, process.env.CHAVE_JWT, {expiresIn: '15m'})
~~~

- Incluir o tratamento do erro no middleware de autenticação.

~~~javascript
if (erro && erro.name === 'TokenExpiredError') {
    return res.status(401).json({
        erro: erro.message,
        expiradoEm: erro.expiredAt
    })
}
~~~

## BLACKLIST Implementando lista de tokens inválidos por logout 

- Instalar o módulo do Redis
- Criar o arquivo blacklist.js na pasta do redis
- Importar o módulo redis e criar um Client

 ~~~javascript
 const redis = require('redis')
module.exports = redis.createClient({prefix: 'blacklist:'})
~~~

- Instânciar o redis no server.js

 ~~~javascript
require('./redis/blacklist')
~~~