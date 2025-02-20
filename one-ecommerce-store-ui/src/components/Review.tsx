const Review = () => (
    <section className="bg-gray-100 py-16" id="reviews">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900">What Our Customers Say</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 italic">"This product changed my life! Highly recommend."</p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
              <div className="mt-2 text-gray-600">John Doe</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 italic">"Worth every penny. The quality is top-notch."</p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
              <div className="mt-2 text-gray-600">Jane Smith</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 italic">"I’ve never been more satisfied with a product!"</p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
              <div className="mt-2 text-gray-600">Emily Johnson</div>
            </div>
          </div>
        </div>
      </section>
);

export default Review;