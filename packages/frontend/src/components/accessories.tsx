export function Acc({ imgSrc }: { imgSrc: string }) {
  return (
    <div className="w-50 h-50 border border-gray-600 shadow-color-white max-w-sm rounded overflow-hidden hover:scale-105 shadow-lg bg-lighterGray hover:bg-gray-400 text-white m-5">
      <div className="px-6 py-4">
        <img src={`../../images/${imgSrc}`} />
      </div>
    </div>
  );
}
