import { Navbar } from "../components/NavBar";
import { Project } from "../components/Projects";
import { Acc } from "../components/accessories";

export function Homepage() {
  const projects = ["Aloe Mate", "Carbonara", "Test"];
  const accessories = ["hat.png", "sunglasses.png"];

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex">
          {/* First column */}
          <div className="w-1/2 p-3">
            <h2 className="text-center pb-6 text-2xl text-gray-200">
              Projects
            </h2>
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

          <div className="w-1/2 p-3">
            <h2 className="text-center pb-6 text-2xl text-gray-200">
              Wardrobe
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* First column */}
              <div>
                {accessories.map((access, index) => (
                  <div key={index}>
                    {/* Render a React component for each element */}
                    <Acc imgSrc={access} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
