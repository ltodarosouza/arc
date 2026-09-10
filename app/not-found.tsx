import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="arc-page arc-page--reading">
      <div className="animate-enter max-w-lg">
        <p className="arc-caption">Erro 404</p>
        <h1 className="arc-title mt-2">Esta página não existe</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O endereço pode ter mudado ou a página foi removida.
        </p>
        <Link className="arc-action mt-6" href="/">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
