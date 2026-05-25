/** Mapa de moedas retornado por /json/available/uniq */
export interface MoedasDisponiveis {
  [code: string]: string;
}

/** Cotação de um par de moedas */
export interface CotacaoPar {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

/** Resposta de /json/last/{par} */
export interface CotacaoResponse {
  [key: string]: CotacaoPar;
}
