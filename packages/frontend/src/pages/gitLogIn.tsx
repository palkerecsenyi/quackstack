import { Navbar } from "../components/NavBar";
export function GitLogIn() {
  // make button
  function redirectToGit() {
    window.location.href="http://localhost:8080/auth/start"
  }
  return (
    <div>
      <Navbar />
      <div className="flex">
        <img
          src="../../images/duck.svg"
          className="absolute bottom-0 right-10 w-28"
        />
      </div>
      <div className="flex justify-center items-center pt-40">
        <button onClick={redirectToGit} className="bg-transparent hover:bg-darkGreen text-lightGreen font-semibold hover:text-cream py-2 px-4 border border-darkGreen hover:border-transparent rounded">
          Sign in With Github
        </button>
      </div>

    </div>
  );
}
