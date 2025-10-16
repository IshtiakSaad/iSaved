import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 py-8 bg-gray-50 border-t border-gray-200 text-center">
      <p className="text-gray-700 text-sm sm:text-base">
        Developed by{" "}
        <span className="font-semibold text-gray-900">Ishtiak Saad</span>
      </p>

      <p className="text-gray-600 text-sm mt-1">
        📧{" "}
        <a
          href="mailto:imsaad.exe@gmail.com"
          className="hover:text-emerald-500 transition-colors"
        >
          imsaad.exe@gmail.com
        </a>{" "}
        | 🌐{" "}
        <a
          href="https://github.com/IshtiakSaad"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-500 transition-colors"
        >
          GitHub
        </a>
      </p>

      <p className="text-gray-400 text-xs mt-2">
        © 2025 Ishtiak Saad. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
