export default function Brands() {
    const brands = ['Microsoft', 'Google', 'Apple', 'Amazon', 'Meta'];
    
    return (
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <div key={brand} className="text-2xl font-bold text-gray-500 hover:text-white transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }