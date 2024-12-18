// Definizioni delle colonne per ogni tipo di tabella
export const FATTURE_EMESSE_COLUMNS = [
  'Tipo fattura',
  'Tipo documento',
  'Numero fattura / Documento',
  'Data emissione',
  'Data trasmissione',
  'Codice fiscale fornitore',
  'Partita IVA fornitore',
  'Codice fiscale cliente estero',
  'Paese cliente estero',
  'Partita IVA cliente estero',
  'Denominazione cliente estero',
  'Denominazione fornitore',
  'Codice fiscale cliente',
  'Partita IVA cliente',
  'Denominazione cliente',
  'Imponibile/Importo',
  'Imposta',
  'Trasmessa da',
  'Stato',
  'Sdi/file',
  'Fatture consegnate',
  'Data consegna',
  'Bollo virtuale'
];

export const FATTURE_RICEVUTE_COLUMNS = [
  'Tipo fattura',
  'Tipo documento',
  'Numero fattura / Documento',
  'Data emissione',
  'Data trasmissione',
  'Data registrazione fattura',
  'Codice fiscale fornitore',
  'Partita IVA fornitore',
  'Denominazione fornitore',
  'Codice fiscale fornitore estero',
  'Paese fornitore estero',
  'Partita IVA fornitore estero',
  'Denominazione fornitore estero',
  'Codice fiscale cliente',
  'Partita IVA cliente',
  'Denominazione cliente',
  'Imponibile/Importo',
  'Imposta',
  'Sdi/file',
  'Fatture consegnate',
  'Data ricezione',
  'Bollo virtuale',
  'Stato'
];

export const CORRISPETTIVI_COLUMNS = [
  'Id invio',
  'Matricola dispositivo',
  'Data e ora rilevazione',
  'Data e ora trasmissione',
  'Ammontare delle vendite',
  'Imponibile vendite',
  'Imposta vendite',
  'Periodo di inattivita\' da',
  'Periodo di inattivita\' a'
];