import React from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    feedback: "BharatBuy has transformed my shopping experience! Great service and quality products.",
    location: "Mumbai, India"
  },
  {
    name: "Sneha Verma",
    feedback: "Excellent customer support and super-fast delivery. Highly recommended!",
    location: "Delhi, India"
  },
  {
    name: "Amit Patel",
    feedback: "Best eCommerce platform with amazing deals and offers. Love it!",
    location: "Ahmedabad, India"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 bg-transparent text-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white text-black p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <p className="text-lg font-semibold">"{testimonial.feedback}"</p>
              <h4 className="mt-4 font-bold">- {testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
