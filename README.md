# Conversor de Moedas

Conversor de moedas em tempo real desenvolvido com **Angular 15**, **Angular Material** e **Bootstrap 5**.

## Funcionalidades

- **Conversão em tempo real** entre 160+ moedas
- **Pré-validação de pares** — evita chamadas desnecessárias à API
- **Inversão rápida** de moedas com um clique (ícone ⇄)
- **Histórico** de conversões com ordenação, filtro e exclusão
- **Lista completa** de moedas disponíveis com busca
- **Fallback amigável** — mensagens de erro contextualizadas, spinner de carregamento e botão "Tentar novamente"
- **Timeout de 15s** nas chamadas HTTP para não travar a interface
- **Resultado em USD** calculado automaticamente

## API

[Cotações em tempo real via **AwesomeAPI**](https://docs.awesomeapi.com.br/api-de-moedas)

Endpoints utilizados:

- `GET /json/available/uniq` — lista de moedas disponíveis
- `GET /json/available` — pares de moedas com cotação
- `GET /json/last/{moeda}-{moeda}` — cotação atual do par

## Como executar

```bash
npm install
ng serve
```

Acesse `http://localhost:4200/`.

## Build

```bash
ng build
```

A build será gerada em `dist/`.

## Testes

```bash
ng test
```

31 testes unitários (Karma + Jasmine).

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | 15.x |
| Angular Material | 15.x |
| Bootstrap | 5.x |
| Ng-Bootstrap | 14.x |
| RxJS | 7.x |
| TypeScript | 4.9.x |

## Licença

MIT
