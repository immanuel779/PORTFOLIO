export default function SectionHeading({ title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}