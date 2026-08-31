export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-950';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-glow hover:scale-105 focus:ring-primary-500',
    secondary: 'border-2 border-slate-300 dark:border-slate-600 hover:border-primary-500 text-slate-700 dark:text-slate-200 hover:scale-105 focus:ring-primary-500',
    ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 focus:ring-primary-500',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}