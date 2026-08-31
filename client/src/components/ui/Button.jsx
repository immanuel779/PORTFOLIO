import { Link } from 'react-router-dom';

export default function Button({ 
  children, 
  variant = 'primary', 
  to = null, 
  href = null, 
  onClick, 
  className = '', 
  type = 'button' 
}) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-premium",
    secondary: "bg-transparent border-2 border-primary-500 text-primary-500 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500",
    outline: "bg-transparent border-2 border-dark-300 dark:border-dark-600 text-dark-700 dark:text-light-100 hover:border-primary-500 hover:text-primary-500"
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{children}</a>;
  }

  return <button type={type} onClick={onClick} className={classes}>{children}</button>;
}