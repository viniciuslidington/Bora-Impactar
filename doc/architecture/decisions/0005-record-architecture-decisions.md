# 5. Uso do Prisma como ORM

Data: 20-02-2025

## Status

Aceito

## Contexto

Precisamos definir um ORM (Object-Relational Mapping) para gerenciar a interação com o banco de dados de forma eficiente. Algumas opções consideradas:

- **Sequelize**: Popular e maduro, mas com uma API verbosa.
- **TypeORM**: Melhor integração com TypeScript, mas pode ser complexo e lento em alguns cenários.
- **Prisma**: Moderno, intuitivo e com excelente suporte a JavaScript.

Dado que queremos uma ferramenta moderna e produtiva, escolhemos o Prisma.

## Decisão

Utilizaremos **Prisma** como ORM pelos seguintes motivos:

1. **Query Builder Intuitivo**: Garante maior segurança e facilidade de uso.
2. **Facilidade de Uso**: A sintaxe declarativa facilita a modelagem do banco de dados.
3. **Gerenciamento de Migrações**: Possui um sistema intuitivo de migrações.
4. **Desempenho Otimizado**: Suporte a lazy loading e caching eficiente.
5. **Compatibilidade com Diversos Bancos de Dados**: Funciona com PostgreSQL, MySQL, SQLite, entre outros.

## Consequências

- **Positivas**:

  - Redução de código boilerplate e queries mais organizadas.
  - Facilidade na manutenção e evolução do banco de dados.

- **Negativas**:
  - Pode ser menos flexível que SQL puro em alguns casos específicos.
  - Dependência de um runtime extra em comparação a ORMs mais simples.

## Alternativas Consideradas

- **Sequelize**: Boa adoção no mercado, mas API menos intuitiva.
- **TypeORM**: Integração melhor com TypeScript, mas problemas de performance e manutenção complexa.

Dado nosso objetivo de produtividade, Prisma é a melhor escolha para o projeto.
