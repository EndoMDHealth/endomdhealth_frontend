const WaitTimeSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            The average pediatric endocrinology appointment takes between 3 and 6 months to schedule. 
            <span className="text-accent"> We're here to change that.</span>
          </h2>
          
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              We know your time is important, and your child's care is critical.
            </p>
            <p className="text-lg md:text-xl font-semibold text-accent">
              Here's how we can help:
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitTimeSection;