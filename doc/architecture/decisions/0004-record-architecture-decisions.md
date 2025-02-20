# 4. Uso do Vite.js como Ferramenta de Build

Data: 20-02-2025

## Status

Aceito

## Contexto

Precisamos escolher uma ferramenta para empacotamento e build do projeto frontend. Algumas opções consideradas foram:

- **Webpack**: Muito popular e altamente configurável, mas pode ser lento e complexo.
- **Parcel**: Zero-config e rápido, mas menos flexível para grandes projetos.
- **Vite.js**: Extremamente rápido e moderno, com suporte nativo ao ES Modules e Hot Module Replacement (HMR).

Dado o nosso foco em desenvolvimento rápido e desempenho, escolhemos o Vite.js.

## Decisão

Utilizaremos Vite.js como ferramenta de build e servidor de desenvolvimento pelos seguintes motivos:

1. **Velocidade**: Vite usa ESBuild para transpilar JavaScript, tornando o build inicial e o HMR muito rápidos.
2. **Experiência de Desenvolvimento Melhorada**: A atualização do código no navegador é instantânea, sem recarregar a página.
3. **Configuração Simples**: Menos configuração em comparação com Webpack, sem necessidade de loaders complexos.
4. **Suporte Nativo a ES Modules**: Aproveita melhor as capacidades dos navegadores modernos.
5. **Compatibilidade com Frameworks Modernos**: Suporte direto para React.

## Consequências

- **Positivas**:

  - Tempo de desenvolvimento reduzido devido à velocidade do HMR.
  - Menos complexidade na configuração inicial do projeto.
  - Melhor experiência para desenvolvedores.

- **Negativas**:
  - Algumas bibliotecas mais antigas podem não ser compatíveis sem ajustes.
  - Pode exigir um aprendizado inicial para quem está acostumado com Webpack.

## Alternativas Consideradas

- **Webpack**: Muito flexível e amplamente utilizado, mas pode ser lento e exigir muitas configurações.
- **Parcel**: Boa opção zero-config, mas menos performático que Vite para grandes projetos.

Dado nosso cenário e a necessidade de um ambiente rápido e produtivo, Vite.js é a melhor escolha.
