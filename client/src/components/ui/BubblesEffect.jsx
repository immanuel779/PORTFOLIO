export default function BubblesEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0); opacity: 0.8; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        .bubble {
          position: absolute;
          bottom: -100px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          animation: floatUp linear infinite;
        }
      `}</style>
      
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${(i * 8.5) % 100}%`,
            width: `${20 + (i % 5) * 15}px`,
            height: `${20 + (i % 5) * 15}px`,
            animationDuration: `${8 + (i % 7) * 2}s`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}