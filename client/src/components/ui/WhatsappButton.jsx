import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  // Pre-filled message
  const message = "Hello Oluwadamilare! I found your portfolio and I'd love to chat with you.";
  const phoneNumber = "2347089584607"; // Your WhatsApp number (no +, no spaces)

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-110 transition-all duration-300">
        <FaWhatsapp className="w-7 h-7" />
      </div>
    </a>
  );
}