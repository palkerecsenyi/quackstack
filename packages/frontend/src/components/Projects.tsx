export function Project({ name }: { name: string }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-600 hover:bg-gray-400 text-white m-5">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 ">{name}</div>
      </div>
    </div>
  );
}
