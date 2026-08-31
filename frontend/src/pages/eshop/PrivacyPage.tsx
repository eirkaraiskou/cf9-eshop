import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";

const PrivacyPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="prose max-w-4xl mx-auto p-6">
      <h1 className="text-center font-bold">The Tech Hub - Privacy Policy</h1>
      <br/>  
      <p>
        The Tech Hub (hereinafter "the Company") respects your privacy and is
        committed to protecting your personal data. This Privacy Policy explains
        how we collect, use, and safeguard your information when you use our website.
      </p>
      <br/>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address,
        phone number, and any other details you provide through forms on our
        website. We may also collect non-personal data such as browser type,
        device information, and usage statistics.
      </p>
      <div className="divider"></div>

      <h2>2. How We Use Your Information</h2>
      <p>
        The information we collect is used to provide and improve our services,
        respond to inquiries, process transactions, and enhance user experience.
        We may also use your information for communication, support, and
        administrative purposes.
      </p>
      <div className="divider"></div>

      <h2>3. Data Sharing</h2>
      <p>
        The Tech Hub does not sell or rent your personal data to third parties.
        We may share information with trusted partners only when necessary to
        provide our services or comply with legal obligations.
      </p>
      <div className="divider"></div>

      <h2>4. Cookies</h2>
      <p>
        Our website may use cookies to enhance your browsing experience. Cookies
        help us understand how users interact with our site and allow us to
        improve functionality and performance.
      </p>
      <div className="divider"></div>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect
        your personal data from unauthorized access, loss, or misuse. However,
        no method of transmission over the internet is completely secure.
      </p>
      <div className="divider"></div>

      <h2>6. User Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. You
        may also object to the processing of your data or request data portability,
        in accordance with applicable laws such as the GDPR.
      </p>
      <div className="divider"></div>

      <h2>7. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. The Tech Hub is not
        responsible for the privacy practices or content of those websites.
      </p>
      <div className="divider"></div>

      <h2>8. Changes to This Policy</h2>
      <p>
        The Company reserves the right to update this Privacy Policy at any time.
        Any changes will be posted on this page.
      </p>
      <div className="divider"></div>

      <h2>9. Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us at:
        <a href="mailto:thetechhub@mail.gr"> thetechhub@mail.gr</a>
      </p>
    </div>
  );
};

export default PrivacyPage;