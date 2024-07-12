const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Discover New Meals</h3>
            <p>Explore a wide variety of meals from different cuisines.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Detailed Recipes</h3>
            <p>Get step-by-step instructions and ingredient lists.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Save Your Favorites</h3>
            <p>Bookmark your favorite meals for easy access later.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
