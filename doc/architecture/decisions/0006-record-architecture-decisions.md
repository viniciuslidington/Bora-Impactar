# 6. Uso do Node.js como Plataforma Backend

Data: 20-02-2025

## Status

Aceito

## Contexto

Precisávamos definir a plataforma backend para nosso projeto, levando em consideração fatores como performance, escalabilidade, facilidade de desenvolvimento e suporte da comunidade. Analisamos várias opções e suas características para tomar uma decisão informada.

## Decisão

Utilizaremos **Node.js** como backend pelos seguintes motivos:

1. **Ecossistema Rico**: A vasta quantidade de pacotes npm acelera o desenvolvimento.
2. **Facilidade de Desenvolvimento**: Uso de JavaScript/TypeScript tanto no frontend quanto no backend.
3. **Comunidade Forte**: Grande suporte da comunidade e contínua evolução da plataforma.

## Consequências

- **Positivas**:

  - Redução de curva de aprendizado ao unificar frontend e backend com JavaScript/TypeScript.
  - Melhor escalabilidade para aplicações web modernas.
  - Grande quantidade de bibliotecas e ferramentas disponíveis.

- **Negativas**:
  - O modelo single-threaded pode ser um gargalo para workloads computacionais intensivos.
  - Manutenção do ecossistema pode ser difícil devido à grande quantidade de pacotes de terceiros.

## Alternativas Consideradas

Precisamos escolher a tecnologia principal para o backend do projeto. Algumas opções consideradas:

- **Django (Python)**: Ótimo para projetos baseados em dados, mas menos performático para APIs de alto tráfego.
- **Spring Boot (Java)**: Robusto e seguro, mas com um ecossistema mais pesado para nosso caso.

Como queremos alta performance, escalabilidade e um ecossistema rico, escolhemos Node.js.
