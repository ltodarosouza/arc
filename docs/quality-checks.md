# Verificações de qualidade

Cada alteração enviada ao repositório executa automaticamente:

1. verificação de formatação;
2. análise estática das regras centrais;
3. testes das regras de domínio;
4. build de produção.

Os comandos equivalentes para desenvolvimento são:

- `npm run format -- --check`
- `npm run lint:core`
- `npm test`
- `npm run build`

O projeto ainda possui avisos do linter em componentes de base que não fazem
parte do Arc. Por enquanto, a checagem automática está limitada ao domínio de
questões e progresso; ela será ampliada conforme esses componentes forem
revisados. O repositório privado atual não permite exigir checks por proteção
de branch no plano do GitHub em uso. Por isso, o workflow registra falhas em
cada pull request e em cada envio para a main; quando a proteção estiver
disponível, este job deve ser configurado como obrigatório antes de mesclar.
