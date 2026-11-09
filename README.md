# 🔎 Where are my Things(WRMT)?
### Sistema Web de Achados e Perdidos

## 📌 Sobre o Projeto

O **Where are my Things** é uma aplicação web desenvolvida com o objetivo de facilitar o gerenciamento de objetos perdidos e encontrados em ambientes como universidades, escolas e instituições.

A plataforma permite que usuários registrem objetos que perderam ou encontraram, consultem os registros disponíveis e solicitem a recuperação de itens que possam lhes pertencer.

O sistema busca centralizar as informações de achados e perdidos em um único ambiente, tornando o processo de localização e devolução de objetos mais organizado, acessível e eficiente.

Este projeto foi desenvolvido como trabalho final da disciplina de **Desenvolvimento Web II – 2026**.

## 🎯 Objetivos

- Facilitar a comunicação entre pessoas que perderam e encontraram objetos.
- Centralizar os registros de objetos perdidos e encontrados.
- Permitir o acompanhamento das solicitações de recuperação.
- Organizar o processo de devolução dos objetos.
- Disponibilizar relatórios e estatísticas sobre os registros realizados.

## ⚙️ Funcionalidades

### 👤 Gerenciamento de usuários
- Cadastro de usuários.
- Consulta de usuários.
- Edição de informações.
- Exclusão de usuários.
- Autenticação no sistema.

### 📦 Gerenciamento de objetos
- Cadastro de objetos perdidos.
- Cadastro de objetos encontrados.
- Edição dos registros.
- Exclusão dos registros.
- Listagem de objetos cadastrados.
- Cadastro de informações como nome, descrição, categoria, data e local.
- Inclusão de fotografias dos objetos.

### 🔍 Pesquisa de objetos
- Pesquisa por nome.
- Filtro por categoria.
- Filtro por localização.
- Filtro por data.
- Consulta por situação do objeto.

### 📋 Solicitações de recuperação
- Solicitação de recuperação de objetos.
- Registro de justificativa pelo solicitante.
- Aprovação ou recusa de solicitações.
- Acompanhamento do status.
- Registro da devolução dos objetos.

### 📊 Relatórios
- Quantidade de objetos perdidos.
- Quantidade de objetos encontrados.
- Quantidade de objetos devolvidos.
- Categorias com maior número de registros.
- Locais com maior ocorrência de objetos perdidos.
- Histórico de solicitações.

## 🛠️ Tecnologias Utilizadas

- **Java:** linguagem de programação.
- **Spring Boot:** desenvolvimento da aplicação web.
- **Thymeleaf:** integração entre Java e páginas HTML.
- **HTML5:** estrutura das páginas.
- **CSS3:** estilização.
- **Bootstrap:** responsividade e componentes visuais.
- **PostgreSQL:** gerenciamento do banco de dados relacional.
- **Spring Data JPA:** persistência e manipulação dos dados.
- **Maven:** gerenciamento de dependências.

## 🗄️ Estrutura do Banco de Dados

O banco de dados será organizado inicialmente pelas seguintes entidades:

| Entidade | Descrição |
|---|---|
| Usuario | Armazena os dados dos usuários. |
| Objeto | Armazena as informações dos objetos. |
| Registro | Registra objetos perdidos ou encontrados. |
| Solicitacao | Armazena as solicitações de recuperação. |
| Devolucao | Registra as devoluções realizadas. |

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de executar a aplicação, é necessário possuir:

- Java JDK instalado.
- Maven instalado.
- PostgreSQL instalado e em execução.
- Uma IDE, como IntelliJ IDEA, Eclipse ou VS Code.

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Acessar a pasta do projeto

```bash
cd where-are-my-things
```

### 3. Criar o banco de dados

Acesse o PostgreSQL e execute o seguinte comando SQL:

```sql
CREATE DATABASE where_are_my_things;
```

### 4. Configurar a conexão com o banco de dados

No arquivo `application.properties`, localizado em `src/main/resources`, configure as informações de conexão:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/where_are_my_things
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Substitua `SEU_USUARIO` e `SUA_SENHA` pelas credenciais configuradas no seu PostgreSQL.

### 5. Executar a aplicação

Utilizando o Maven, execute:

```bash
mvn spring-boot:run
```

### 6. Acessar o sistema

Após iniciar a aplicação, acesse pelo navegador:

```text
http://localhost:8080
```

## 📁 Organização do Projeto

A aplicação seguirá uma estrutura organizada em camadas, separando as responsabilidades:

```text
where-are-my-my-things/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/projeto/wherearemythings/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── WhereAreMyThingsApplication.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── images/
│   │       ├── templates/
│   │       └── application.properties
│   │
│   └── test/
│
├── pom.xml
└── README.md
```

## 👥 Integrantes

- Gilmar Brum Carabajal
- Kainã Machado Griebeler Márquez

## 📚 Disciplina

**Desenvolvimento Web II – 2026**

Trabalho Final da Disciplina.

## 📅 Entrega

07/12/2026

---

*Where are my Things? — Porque todo objeto perdido merece uma segunda chance de ser encontrado.* 🔎
