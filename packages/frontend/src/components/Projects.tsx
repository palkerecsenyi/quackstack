export function Project({ name }: { name: string }) {
  return (
    <div className="border border-gray-600 h-15 w-full rounded overflow-hidden hover:scale-105 bg-lighterGray hover:bg-gray-400 text-white m-5">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 ">{name}</div>
        <button className="bg-purple text-white text-bold p-2 border-radius-5">
          Open
        </button>
      </div>
    </div>
  );
}
