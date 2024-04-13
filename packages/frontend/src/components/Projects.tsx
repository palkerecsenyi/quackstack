const Project = ({ name }: { name: string }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-sm bg-white m-5">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
      </div>
    </div>
  );
};

export default Project;