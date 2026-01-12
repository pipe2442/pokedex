export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Pokemon #{id}</h1>
    </div>
  );
}
