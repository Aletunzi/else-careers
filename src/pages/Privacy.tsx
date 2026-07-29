import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatCurrentDate } from "@/lib/formatDate";
import { useStickyFooterStop } from "@/hooks/useStickyFooterStop";

const Privacy = () => {
  useEffect(() => {
    document.title = "Else | Privacy policy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Read Else's privacy policy to understand how we collect, use, and protect your personal data when using our AI-powered career assistant.");
    }
    window.scrollTo(0, 0);
  }, []);

  const { stickyRef, footerRef, offset } = useStickyFooterStop();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="sticky top-0 z-40 bg-background">
        <Header />
      </div>
      <main className="flex flex-1 flex-col px-5 pt-8 sm:px-8 md:flex-row md:gap-16 md:px-16 md:pt-12 lg:gap-24 lg:px-24 2xl:px-32">
        <div className="md:w-1/3 md:sticky md:top-32 md:self-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-foreground hover:opacity-70 transition-opacity mb-12"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {formatCurrentDate()}
          </p>
        </div>

        <div className="pb-16 pt-8 md:w-2/3 md:pt-0">
          <div className="space-y-10 text-foreground/90 text-[15px] leading-relaxed text-justify">
            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">1. Introduction</h2>
              <p className="mb-4">
                Else ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered career assistant service (the "Service"). The Service is operated by Else, a European company.
              </p>
              <p className="mb-4">
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.
              </p>
              <p className="mb-4">
                This Privacy Policy applies to all users of our Service, regardless of their location. We are committed to complying with applicable data protection laws in all jurisdictions where we operate, including the General Data Protection Regulation (GDPR) for users in the European Economic Area, United Kingdom, and Switzerland, and the California Consumer Privacy Act (CCPA) for users in California.
              </p>
              <p className="font-medium">
                IMPORTANT: Any disputes, claims, or legal matters arising from this Privacy Policy or our data processing activities will be governed exclusively by European legislation and resolved in European courts, regardless of your location.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">2. Data controller</h2>
              <p className="mb-4">
                Else is the data controller responsible for your personal data. For any questions or concerns regarding this Privacy Policy or our data practices, you can contact us at:
              </p>
              <p>Email: info@tryelse.xyz</p>
              <p>Website: https://tryelse.xyz</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">3. Information we collect</h2>
              <p className="mb-4 font-medium">3.1 Information you provide to us</p>
              <p className="mb-3">We collect information that you provide directly to us, including:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Account Information:</span> When you create an account, we collect your name, email address, password, and professional information.</li>
                <li><span className="font-medium">Billing Information:</span> Since our Service is subscription-based, we collect billing details including company name, billing address, and tax identification numbers where applicable. Payment card information is collected and processed by our third-party payment processors and is not stored on our servers.</li>
                <li><span className="font-medium">User Content:</span> Information you submit through the Service, including career queries, preferences, resumes, and other inputs you provide to our AI agent.</li>
                <li><span className="font-medium">Communications:</span> When you contact us for support or provide feedback, we collect the information you provide in those communications.</li>
              </ul>
              <p className="mb-3 mt-6 font-medium">3.2 Information collected automatically</p>
              <p className="mb-3">When you access or use our Service, we automatically collect certain information, including:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Usage Information:</span> Information about your interactions with the Service, including features used, queries submitted, and response patterns.</li>
                <li><span className="font-medium">Device Information:</span> Information about the device you use to access the Service, including hardware model, operating system, browser type, IP address, and device identifiers.</li>
                <li><span className="font-medium">Log Data:</span> Server logs that include IP address, access times, pages viewed, and the page you visited before navigating to our Service.</li>
                <li><span className="font-medium">Cookies and Similar Technologies:</span> We use cookies, web beacons, and similar tracking technologies to collect information and improve our Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">4. How we use your information</h2>
              <p className="mb-3">We use the information we collect for the following purposes:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Service Delivery:</span> To provide, maintain, and improve the Service, including processing your queries through our AI agent and managing your subscription.</li>
                <li><span className="font-medium">Billing and Payment:</span> To process payments, send invoices, and manage your subscription.</li>
                <li><span className="font-medium">Personalization:</span> To customize your experience and provide recommendations based on your career goals and usage patterns.</li>
                <li><span className="font-medium">Communication:</span> To send you technical notices, updates, security alerts, billing notifications, and administrative messages.</li>
                <li><span className="font-medium">Customer Support:</span> To respond to your inquiries and provide customer support.</li>
                <li><span className="font-medium">Analytics and Improvement:</span> To understand how users interact with our Service and to improve functionality, performance, and user experience.</li>
                <li><span className="font-medium">Security:</span> To detect, prevent, and address technical issues, fraud, and security vulnerabilities.</li>
                <li><span className="font-medium">Legal Compliance:</span> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">5. Legal basis for processing</h2>
              <p className="mb-3 font-medium">5.1 For users in the European Economic Area, United Kingdom, and Switzerland</p>
              <p className="mb-3">If you are located in the EEA, UK, or Switzerland, we process your personal data based on the following legal grounds:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Contract Performance:</span> Processing is necessary to perform our contract with you and provide the Service you have subscribed to.</li>
                <li><span className="font-medium">Legitimate Interests:</span> We process your data for our legitimate business interests, such as improving our Service, ensuring security, and conducting analytics, provided these interests do not override your data protection rights.</li>
                <li><span className="font-medium">Consent:</span> Where required by law, we process your data based on your explicit consent, which you can withdraw at any time.</li>
                <li><span className="font-medium">Legal Obligation:</span> We process your data to comply with legal obligations to which we are subject.</li>
              </ul>
              <p className="mb-3 mt-6 font-medium">5.2 For users in other jurisdictions</p>
              <p className="mb-3">For users outside the EEA, UK, and Switzerland, we process your personal data based on:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Contractual necessity to provide the Service you have purchased.</li>
                <li>Our legitimate business interests in operating and improving the Service.</li>
                <li>Your consent where required by applicable law.</li>
                <li>Compliance with applicable legal obligations in your jurisdiction.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">6. AI processing and third-party service providers</h2>
              <p className="mb-4">Our Service utilizes artificial intelligence and machine learning technologies to provide intelligent career assistance. Your queries and inputs may be processed by third-party AI service providers that power our AI agent.</p>
              <p className="mb-3">Important information about AI processing:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>We use enterprise-grade AI APIs that do not train on your submitted data.</li>
                <li>Your data is processed solely to provide responses to your specific queries.</li>
                <li>We implement contractual safeguards with our AI providers to ensure they handle your data in compliance with applicable privacy laws.</li>
                <li>Your proprietary career information, preferences, and decisions remain confidential and are not shared with other users.</li>
                <li>AI providers may retain your data for a limited period (typically 30 days or less) for abuse prevention and service improvement, after which it is deleted.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">7. Data sharing and disclosure</h2>
              <p className="mb-3">We do not sell your personal data. We may share your information in the following circumstances:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Service Providers:</span> We share information with third-party service providers who perform services on our behalf, including AI processing, hosting, analytics, payment processing, and customer support.</li>
                <li><span className="font-medium">Business Transfers:</span> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
                <li><span className="font-medium">Legal Requirements:</span> When we believe disclosure is necessary to comply with applicable law, regulation, legal process, or governmental request.</li>
                <li><span className="font-medium">Protection of Rights:</span> To protect the rights, property, or safety of Else, our users, or others.</li>
                <li><span className="font-medium">With Your Consent:</span> When you explicitly consent to the sharing of your information.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">8. International data transfers</h2>
              <p className="mb-4">Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.</p>
              <p className="mb-3 font-medium">8.1 For users in the European Economic Area, United Kingdom, and Switzerland</p>
              <p className="mb-3">When we transfer personal data from the EEA, UK, or Switzerland to other countries, we implement appropriate safeguards, including:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Standard Contractual Clauses approved by the European Commission.</li>
                <li>Adequacy decisions recognizing certain countries as providing adequate data protection.</li>
                <li>Other lawful transfer mechanisms as applicable.</li>
              </ul>
              <p className="mb-3 mt-6 font-medium">8.2 For users in other jurisdictions</p>
              <p>We take appropriate measures to ensure that your personal data remains protected in accordance with this Privacy Policy when transferred internationally.</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">9. Data retention</h2>
              <p className="mb-3">We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Account Information:</span> Retained for the duration of your active subscription and for up to 90 days after subscription termination.</li>
                <li><span className="font-medium">User Content:</span> Retained as long as you maintain your subscription. Upon termination, retained for 30 days to allow for data export, then permanently deleted.</li>
                <li><span className="font-medium">Billing Records:</span> Retained for the period required by applicable tax and accounting laws (typically 7\u201310 years).</li>
                <li><span className="font-medium">Usage and Log Data:</span> Typically retained for up to 12 months for analytics and security purposes.</li>
              </ul>
              <p className="mt-3">When personal data is no longer needed, we will securely delete or anonymize it.</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">10. Your rights and choices</h2>
              <p className="mb-3 font-medium">10.1 Rights under GDPR (EEA, UK, Switzerland)</p>
              <p className="mb-3">If you are located in the EEA, UK, or Switzerland, you have the following rights:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Right of Access:</span> Request access to your personal data.</li>
                <li><span className="font-medium">Right to Rectification:</span> Request correction of inaccurate personal data.</li>
                <li><span className="font-medium">Right to Erasure:</span> Request deletion of your personal data ("right to be forgotten").</li>
                <li><span className="font-medium">Right to Restriction:</span> Request restriction of processing your personal data.</li>
                <li><span className="font-medium">Right to Data Portability:</span> Request a copy of your data in a structured, machine-readable format.</li>
                <li><span className="font-medium">Right to Object:</span> Object to processing of your personal data based on legitimate interests.</li>
                <li><span className="font-medium">Right to Withdraw Consent:</span> Withdraw your consent at any time where processing is based on consent.</li>
                <li><span className="font-medium">Right to Lodge a Complaint:</span> File a complaint with your local data protection authority.</li>
              </ul>
              <p className="mb-3 mt-6 font-medium">10.2 Rights under CCPA (California residents)</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Right to Know:</span> Request information about the categories and specific pieces of personal information we have collected.</li>
                <li><span className="font-medium">Right to Delete:</span> Request deletion of your personal information, subject to certain exceptions.</li>
                <li><span className="font-medium">Right to Opt-Out:</span> Opt-out of the sale of your personal information (note: we do not sell personal information).</li>
                <li><span className="font-medium">Right to Non-Discrimination:</span> Not be discriminated against for exercising your privacy rights.</li>
              </ul>
              <p className="mb-3 mt-6 font-medium">10.3 How to exercise your rights</p>
              <p>To exercise any of these rights, please contact us at info@tryelse.xyz. We will respond within the timeframe required by applicable law.</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">11. Security</h2>
              <p className="mb-3">We implement appropriate technical and organizational measures to protect your personal data, including:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Encryption of data in transit using TLS 1.2 or higher.</li>
                <li>Encryption of data at rest using industry-standard encryption (AES-256).</li>
                <li>Access controls and authentication mechanisms.</li>
                <li>Regular security assessments and monitoring.</li>
                <li>Secure data centers with physical security controls.</li>
              </ul>
              <p className="mt-3">However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">12. Data breach notification</h2>
              <p className="mb-3">In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify you and the relevant supervisory authority as required by applicable law:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>For EEA, UK, and Switzerland users: within 72 hours of becoming aware of the breach, as required by GDPR.</li>
                <li>For users in other jurisdictions: in accordance with applicable local data breach notification laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">13. Children\u2019s privacy</h2>
              <p>Our Service is not intended for individuals under the age of 16. We do not knowingly collect personal data from children under 16. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at info@tryelse.xyz, and we will delete such information.</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">14. Cookies and tracking technologies</h2>
              <p className="mb-3">We use cookies and similar tracking technologies to collect and track information about your use of our Service. Types of cookies we use:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium">Essential Cookies:</span> Required for the Service to function properly.</li>
                <li><span className="font-medium">Analytics Cookies:</span> Help us understand how users interact with the Service.</li>
                <li><span className="font-medium">Preference Cookies:</span> Remember your settings and preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">15. Changes to this privacy policy</h2>
              <p className="mb-3">We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Posting the updated Privacy Policy on our website.</li>
                <li>Updating the "Last updated" date at the top of this Privacy Policy.</li>
                <li>Sending you an email notification for significant changes.</li>
              </ul>
              <p className="mt-3">Your continued use of the Service after such modifications constitutes your acceptance of the updated Privacy Policy.</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">16. Contact us</h2>
              <p className="mb-3">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
              <p>Else</p>
              <p>Email: info@tryelse.xyz</p>
              <p>Website: https://tryelse.xyz</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-normal text-foreground">17. Supervisory authority</h2>
              <p className="mb-4">If you are located in the EEA, UK, or Switzerland, you have the right to lodge a complaint with your local data protection supervisory authority.</p>
              <p>Regardless of your location, any disputes or legal matters arising from our data processing activities will be governed exclusively by European data protection legislation.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
