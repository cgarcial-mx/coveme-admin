import { getConnectors } from './actions/connectors.server';
import ConnectorCard from '../_components/ConnectorCard';
export default async function Page() {
  const connectors = await getConnectors();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Connectors</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {connectors.map((c) => (
          <ConnectorCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
