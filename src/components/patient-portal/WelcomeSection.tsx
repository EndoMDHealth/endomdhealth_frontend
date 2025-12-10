interface WelcomeSectionProps {
  firstName: string;
}

const WelcomeSection = ({ firstName }: WelcomeSectionProps) => {
  return (
    <section className="py-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        Welcome, <span className="text-patient-teal">{firstName}</span>!
      </h1>
      <p className="text-lg text-muted-foreground">
        What would you like to do today?
      </p>
    </section>
  );
};

export default WelcomeSection;
