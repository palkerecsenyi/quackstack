import { Navbar } from "../components/NavBar";
import { Project } from "../components/Projects";

export function Homepage() {
  const projects = ["Aloe Mate", "Carbonara", "Test"];

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex">
          {/* First column */}
          <div className="w-1/2">
            <h2 className="text-center pb-6 text-2xl text-gray-200">
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* First column */}
              <div>
                {projects.map((projectName, index) => (
                  <div key={index}>
                    {/* Render a React component for each element */}
                    <Project name={projectName} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second column */}
          <div className="w-1/2">
            <h2 className="text-center pb-6 text-2xl text-gray-200">
              Wardrobe
            </h2>
            <p>This is the content of the second column.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
