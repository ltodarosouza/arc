import Link from 'next/link';
export default function DeletedPage() {
  return (
    <main className="mx-auto max-w-lg px-5 py-12">
      <h1 className="arc-title text-3xl">Conta excluída</h1>
      <p className="mt-4">
        Seu perfil, disciplinas selecionadas, tentativas e itens para refazer
        foram removidos. Sua sessão foi encerrada.
      </p>
      <Link href="/account/sign-in" className="mt-6 inline-block underline">
        Voltar para a entrada
      </Link>
    </main>
  );
}
