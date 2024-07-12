const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>"This app has transformed my cooking! Highly recommended."</p>
            <h3 className="text-xl font-semibold mt-4">- Niki</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>
              "I love discovering new recipes every day. The instructions are so
              easy to follow."
            </p>
            <h3 className="text-xl font-semibold mt-4">- Jan</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>
              "A must-have app for anyone who loves cooking. Great variety of
              meals."
            </p>
            <h3 className="text-xl font-semibold mt-4">- Mave</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
