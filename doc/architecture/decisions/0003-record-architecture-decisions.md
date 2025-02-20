# 3. Uso de SQLite como Banco de Dados

Data: 20-02-2025

## Status

Aceito

## Contexto

Precisamos escolher um banco de dados adequado para o projeto. Consideramos as seguintes opções:

- **PostgreSQL:** Robusto e escalável, mas requer configuração e manutenção.
- **MySQL:** Ampla adoção, mas pode ser mais complexo de gerenciar para nosso caso.
- **SQLite:** Leve, fácil de configurar e adequado para desenvolvimento local e aplicações de pequeno porte.

Dado o escopo do projeto e a necessidade de simplicidade, escolhemos SQLite.

## Decisão

Utilizaremos **SQLite** como banco de dados principal devido às seguintes razões:

1. **Simplicidade:** Não requer configuração de servidor.
2. **Portabilidade:** O banco de dados é um único arquivo, facilitando a migração e backup.
3. **Desempenho para Pequenos Projetos:** Para cargas leves, SQLite é altamente eficiente.
4. **Facilidade de Desenvolvimento:** Facilita testes e desenvolvimento local sem necessidade de um banco externo.

## Consequências

- **Positivas:**

  - Redução da complexidade da infraestrutura.
  - Desenvolvimento local mais rápido e fácil.
  - Independência de um servidor de banco de dados.

- **Negativas:**
  - Menos adequado para aplicações de alta concorrência.
  - Pode exigir migração para um banco mais robusto no futuro caso o projeto cresça significativamente.

## Alternativas Consideradas

- **PostgreSQL:** Excelente para produção, mas adicionaria complexidade desnecessária no momento.
- **MySQL:** Similar ao PostgreSQL em complexidade, sem necessidade para nosso uso atual.

Dado o cenário atual do projeto, SQLite é a melhor escolha para atender às necessidades de curto prazo com a possibilidade de migração futura, se necessário.
