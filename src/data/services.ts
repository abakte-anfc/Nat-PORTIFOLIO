// Acrescente título e descrição aprovados para ativar o segundo cartão.
export type Service = { title: string; description: string };
export const additionalService: Service | null = null;
export const primaryService: Service = {
  title: 'Psicoterapia individual online',
  description: 'Os atendimentos são individuais e realizados online, mediante agendamento.',
};
