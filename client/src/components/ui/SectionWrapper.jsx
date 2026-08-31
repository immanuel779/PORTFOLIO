export default function SectionWrapper({ children, className = '', id = '' }) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container-premium">
        {children}
      </div>
    </section>
  );
}