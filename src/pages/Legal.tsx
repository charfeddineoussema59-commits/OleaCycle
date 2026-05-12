export const LegalPage = ({ title }: { title: string }) => {
  return (
    <div className="bg-cream min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl bg-white p-12 rounded-3xl shadow-soft">
        <h1 className="text-4xl font-serif text-olive-dark mb-8">{title}</h1>
        <div className="space-y-6 text-charcoal-light">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <h2 className="text-2xl font-serif text-charcoal mb-4">1. Introduction</h2>
          <p>
            Welcome to OleaCycle. This document constitutes the {title.toLowerCase()} governing the use of our services, website, and products.
          </p>
          <h2 className="text-2xl font-serif text-charcoal mb-4">2. Operations and Compliance</h2>
          <p>
            OleaCycle operates under Tunisian law and adheres to European Union data and environmental compliance frameworks due to our operational reach. 
          </p>
          <p>
            For further details, please reach out to our legal department at oleacycle1@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
};
