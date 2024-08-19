import Footer from "./Footer";

export default function About() {
  return (
    <>
      <div className="container mx-auto p-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p>
          This is a simple meal app using the Themealdb API. My 2nd project
          after the RoutineApp. let me cook!
        </p>
      </div>
      <Footer></Footer>
    </>
  );
}
