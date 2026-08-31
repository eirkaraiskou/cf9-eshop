import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";

const AboutPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="hero min-h-[50vh] bg-base-200" 
        style={{ backgroundImage: "url('/banners/banner3.jpg')", backgroundSize: "cover", backgroundPosition: "center",}}>
        <div className="hero-content text-center text-amber-100">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">About The Tech Hub</h1>
            <p className="py-6 text-lg opacity-80">
              Your one-stop destination for cutting-edge technology, smart devices,
              and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed opacity-80">
          At The Tech Hub, our mission is simple: make technology accessible,
          reliable, and exciting for everyone. We carefully select products that
          combine innovation, quality, and value so you can shop with confidence.
        </p>
      </section>

      {/* FEATURES / VALUES */}
      <section className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="card bg-base-100 shadow-md">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">⚡ Innovation</h3>
              <p>
                We stay ahead of trends to bring you the latest and most advanced
                tech products.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">🔒 Reliability</h3>
              <p>
                Every product is selected with quality and performance in mind,
                ensuring long-term satisfaction.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">💡 Simplicity</h3>
              <p>
                We make tech easy to understand and accessible to everyone,
                from beginners to enthusiasts.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <p className="text-lg leading-relaxed opacity-80 text-center">
          The Tech Hub was created with a passion for technology and a vision
          to build a space where people can discover, explore, and trust the
          products they buy. We believe that technology should improve everyday
          life — and we’re here to make that happen.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-base-200 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to explore the future?
        </h2>
        <p className="mb-6 opacity-80">
          Discover the latest tech products today.
        </p>
        <a href="/" className="btn btn-primary">
          Shop Now
        </a>
      </section>

    </div>
  );
};

export default AboutPage;