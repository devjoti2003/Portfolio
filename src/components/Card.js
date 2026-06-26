import Link from 'next/link';

export default function Card({ children, className = '', href, onClick, accentBorder = false, ...props }) {
  const combinedClassName = `app-card ${accentBorder ? 'accent-border' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <div className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
