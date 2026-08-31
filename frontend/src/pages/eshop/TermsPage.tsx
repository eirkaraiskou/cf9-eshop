import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";

const TermsPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="prose max-w-4xl mx-auto p-6">
      <h1 className="text-center font-bold">The Tech Hub - Terms of Use</h1>
      <br/>
      <p>
        The Tech Hub (hereinafter "the Company") provides the services of this website
        in accordance with these terms of use, which the user is requested to read
        carefully and may only use the website's services if they fully accept and
        consent to these terms.
      </p>
      <br/>

      <h2>1. Description of Services</h2>
      <p>
        Through the website, visitors are informed about the Company's products and/or
        services. By filling out the contact form, users can communicate directly with the
        Company.
      </p>
      <div className="divider"></div>

      <h2>2. External Links</h2>
      <p>
        The website may contain hyperlinks to other websites operated by third parties.
        The Tech Hub is not responsible for their content or privacy practices, nor for
        any financial or other damage users may experience from visiting those sites.
        The Company does not guarantee the accuracy or quality of external content, nor
        is it necessarily in agreement with it.
      </p>
      <div className="divider"></div>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on the website is the intellectual property of The Tech Hub, unless
        explicitly stated otherwise. Users are not permitted to copy, distribute,
        modify, or reproduce content protected by copyright, trademarks, or patents
        without prior written consent from the rights holder. For concerns regarding
        intellectual property, please contact us at: <a href="mailto:thetechhub@mail.gr">thetechhub@mail.gr</a>.
      </p>
      <div className="divider"></div>

      <h2>4. Liability and Compensation</h2>
      <p>
        Users are responsible for any damage or loss caused by illegal or harmful use of
        the website or its services in ways that violate these terms.
      </p>
      <div className="divider"></div>

      <h2>5. Service Availability</h2>
      <p>
        The Company reserves the right to modify or temporarily/permanently suspend
        part or all of the website services with or without prior notice.
      </p>
      <div className="divider"></div>

      <h2>6. Limitation of Liability</h2>
      <p>
        Given the nature of the internet, the website is not responsible for any
        damages users may incur through the use of its services. This includes direct,
        indirect, incidental, or consequential damages resulting from errors, omissions,
        interruptions, defects, delays, or system failures.
      </p>
      <div className="divider"></div>

      <h2>7. No Warranty</h2>
      <p>
        The Tech Hub does not guarantee uninterrupted service, error-free operation, or
        that any mistakes will be corrected. Temporary service interruptions do not
        constitute a defect. The Company is not responsible for malware or harmful
        software from external websites linked on the platform.
      </p>
      <div className="divider"></div>

      <h2>8. Applicable Law</h2>
      <p>
        These terms of use, including any amendments, are governed by Greek law,
        European Union law, and relevant international treaties. Any provision that
        conflicts with the law is automatically invalid. The Company reserves the
        right to update these terms and will inform users of any changes. These terms
        constitute the entire agreement between The Tech Hub and its users.
      </p>
      <p className="text-center">
        <br/>
        If a user does not agree with these terms, they should not use the services of
        the website.
      </p>
    </div>
  );
};

export default TermsPage;