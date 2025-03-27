# 7. Mudança de Banco de Dados de SQLite3 para PostgreSQL

Data: 21-03-2025

## Status

Aceito

## Contexto

Inicialmente, utilizamos** ****SQLite3** como banco de dados devido à sua facilidade de configuração e manutenção. No entanto, com o crescimento do projeto e a necessidade de suporte a um ambiente multiusuário, percebemos limitações que exigiram uma migração para um banco de dados mais robusto.

## Decisão

Optamos por migrar para** ****PostgreSQL** como nosso banco de dados pelos seguintes motivos:

1. **Suporte a Conexões Simultâneas** : PostgreSQL permite conexões concorrentes de maneira eficiente, diferentemente do SQLite, que é mais adequado para aplicações com um único usuário.
2. **Maior Escalabilidade** : O PostgreSQL suporta cargas de trabalho mais pesadas e pode ser distribuído em vários servidores se necessário.
3. **Recursos Avançados** : Oferece suporte a transações ACID, replicacão, triggers e funções armazenadas, o que melhora a confiabilidade e segurança.
4. **Melhor Gerenciamento de Dados** : Suporte nativo a JSON, indexing avançado e consultas mais otimizadas para grandes volumes de dados.

## Consequências

* **Positivas** :
* Melhor desempenho e suporte a escalabilidade.
* Possibilidade de maior integração com ferramentas de BI e análise de dados.
* Suporte a ambientes multiusuários sem comprometimento da performance.
* **Negativas** :
* A necessidade de um servidor dedicado para o banco de dados pode aumentar os custos de infraestrutura.
* A configuração inicial é mais complexa do que o SQLite3, exigindo mais tempo para ajustes e otimizações.

## Alternativas Consideradas

Durante o processo de análise, consideramos outras opções para substituição do SQLite3:

* **MySQL** : Alternativa popular e de alto desempenho, mas o PostgreSQL oferece melhores recursos para integração com sistemas modernos e maior conformidade com padrões SQL.
* **MongoDB** : Excelente para aplicações baseadas em documentos, mas não se encaixa tão bem no nosso modelo relacional de dados.

A escolha pelo** ****PostgreSQL** foi baseada na necessidade de um banco de dados relacional robusto, escalável e com ampla aceitação no mercado.
