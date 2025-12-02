import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "information-collection", title: "Information Collection, Use, and Disclosure" },
    { id: "how-we-collect", title: "How We Collect Information" },
    { id: "de-identified", title: "De-identified Information" },
    { id: "childrens-privacy", title: "Children's Privacy" },
    { id: "disclosure-third-parties", title: "Disclosure to Third Parties" },
    { id: "links-other-websites", title: "Links to Other Websites" },
    { id: "data-security", title: "Data Security" },
    { id: "data-retention", title: "Data Retention" },
    { id: "your-rights", title: "Your Rights and Choices" },
    { id: "state-specific", title: "State-Specific Privacy Rights" },
    { id: "changes", title: "Changes to Our Privacy Policy" },
    { id: "contact", title: "Contact Information" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Your child's privacy is extremely important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-2">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="prose prose-slate max-w-none">
              {/* Overview Section */}
              <section id="overview" className="mb-12 scroll-mt-24">
                <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-6">
                  <p className="text-foreground font-bold text-sm leading-relaxed">
                    THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
                  </p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The Health Insurance Portability and Accountability Act of 1996 (HIPAA) imposes certain requirements on health care providers concerning the use and disclosure of individual health information. This information, known as Protected Health Information (PHI), includes virtually all individually identifiable health information held by a health care provider who electronically transmits PHI in connection with certain transactions. PHI may include medical, financial, demographic and other information about you or your dependents. This notice describes the privacy practices of EndoMD Health ("Covered Entity") and its providers. The providers covered by this notice may share health information with each other to carry out Treatment, Payment, or Health Care Operations. The providers also may share PHI with your insurer for purposes of Treatment, Payment and Health Care Operations. For examples of each of these terms, see below.
                </p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Covered Entity is required by law to maintain the privacy of PHI, to provide you with notice of its legal duties and privacy practices, and to notify affected individuals following a breach of unsecured PHI. Covered Entity will follow the terms of this notice while it is in effect.
                </p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Covered Entity reserves the right to change its privacy practices and the terms of this notice at any time, provided such changes are permitted by applicable law. Any change in the terms of this notice will be effective for all PHI that Covered Entity is maintaining at that time. If a change is made to this notice, Covered Entity will provide a copy of the revised notice to all patients of the provider at that time.
                </p>
              </section>

              {/* Permitted Uses and Disclosures Section */}
              <section id="information-collection" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Permitted Uses and Disclosures of Your Health Information
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Within the limits of the law, Covered Entity may use and disclose your health information without your permission (known as an authorization) for purposes of health care Treatment, Payment activities, and Health Care Operations. Examples of the uses and disclosures that Covered Entity may make under each section are listed below:
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Treatment
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Covered Entity may use or disclose your health information to a physician or other health care provider to allow him to provide treatment to you or so Covered Entity can coordinate or manage your care.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Payment
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Your PHI may be used or disclosed for all activities of a health plan or a federal health program to ensure providers are paid for services rendered to you. This can include disclosures to process claims, to facilitate payment for services that you receive, or to obtain reimbursement.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Health Care Operations
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Health Care Operations refers to the basic business functions necessary to operate a health care facility. Covered Entity may use and disclose your health information for quality assessment and improvement activities; conducting or arranging for medical reviews, audits, or legal reviews; business planning and development; and general administrative activities.
                    </p>
                  </div>
                </div>
              </section>

              {/* Other Uses and Disclosures Section */}
              <section id="how-we-collect" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Other Uses and Disclosures Allowed Without Authorization
                </h2>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  In certain cases, your health information can be disclosed without your authorization to a family member or other person you identify who is involved in your care or payment for your care. Your health information may also be disclosed without authorization to your legal representative, if applicable. In those cases, Covered Entity is permitted to disclose the information to only those recipients who need to know about your care or payment for your care.
                </p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Covered Entity may also use or disclose your health information without your written authorization for uses and disclosures required by law, for public health activities, and other specified situations, such as: Disclosures to Workers' Compensation or similar legal programs, as authorized by and necessary to comply with applicable laws.
                </p>
                
                <ul className="space-y-3 text-muted-foreground ml-6">
                  <li className="leading-relaxed">• Disclosures made in response to a court order, subpoena or other lawful processes.</li>
                  <li className="leading-relaxed">• Disclosures related to situations involving threats to personal or public health or safety.</li>
                  <li className="leading-relaxed">• Disclosures related to situations involving judicial proceedings or law enforcement activities.</li>
                  <li className="leading-relaxed">• Disclosures to a coroner, medical examiner or funeral director.</li>
                  <li className="leading-relaxed">• Certain disclosures related to health oversight activities, specialized government or military functions and Health and Human Service HIPAA compliance investigations.</li>
                  <li className="leading-relaxed">• Disclosures related to organ, eye or tissue donation and transplantation after death.</li>
                  <li className="leading-relaxed">• Disclosures related to certain essential government functions, such as conducting intelligence and national security activities authorized by law.</li>
                </ul>
              </section>

              {/* Authorization and Individual Rights Section */}
              <section id="de-identified" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Other Uses and Disclosures Requiring Your Authorization and Your Individual Rights
                </h2>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Other uses and disclosures of your PHI will be made only upon receiving your written authorization. You may revoke an authorization at any time by providing written notice to Covered Entity that you wish to revoke an authorization. Covered Entity will honor a request to revoke as of the day it is received and to the extent that Covered Entity has not already used or disclosed your PHI in good faith with the authorization.
                </p>
                
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Covered Entity will not use your PHI to:
                </p>
                
                <ol className="space-y-2 text-muted-foreground ml-6 mb-4 list-decimal">
                  <li className="leading-relaxed">Conduct a criminal, civil, or administrative investigation into any person for the mere act of seeking, obtaining, providing, or facilitating reproductive health care,</li>
                  <li className="leading-relaxed">Impose criminal, civil, or administrative liability on any person for the mere act of seeking, obtaining, providing, or facilitating reproductive health care, or</li>
                  <li className="leading-relaxed">Identify any person described in items 1 or 2.</li>
                </ol>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  For example, if your medical record includes information about reproductive care, including a past abortion, we will not disclose your identity to a state law enforcement official for purposes of conducting a criminal, civil, or administrative investigation related to such past treatment.
                </p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Covered Entity will not use or disclose your PHI related to reproductive health care for audits, criminal investigations, judicial/administrative proceedings, or law enforcement purposes without an attestation from the person requesting such use/disclosure, in compliance with HIPAA.
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  There is a potential for any information disclosed pursuant to this authorization to be subject to re-disclosure by the recipient and, therefore, no longer protected to the same extent.
                </p>
                
                <h2 className="text-3xl font-bold text-foreground mb-6 mt-8">
                  Your Individual Rights in Relation to Your PHI
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Request Restrictions on Uses and Disclosures
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• You may request that Covered Entity limit uses/disclosures of PHI related to treatment, payment, and operations, except as required by law.</li>
                      <li className="leading-relaxed">• Requests must be in writing to the Privacy Contact listed in this Notice.</li>
                      <li className="leading-relaxed">• Covered Entity is not required to agree except when disclosure is for payment/operations and not otherwise required by law.</li>
                      <li className="leading-relaxed">• Federal law allows refusing insurance sharing if you pay in full for services.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Receive Confidential Communications
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• You may request communications at alternative locations or via alternative means if normal disclosure could endanger you.</li>
                      <li className="leading-relaxed">• Requests must be submitted in writing to the Privacy Contact.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Access Your PHI
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• You may inspect and copy PHI in a designated record set while Covered Entity maintains it.</li>
                      <li className="leading-relaxed">• Electronic copies provided if available; psychotherapy notes and certain legal records excluded.</li>
                      <li className="leading-relaxed">• Denials explained in writing; appeals possible.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Request Release of PHI
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• You may authorize PHI disclosures to family or others by providing Name, Relationship, and Contact Information to the Privacy Contact.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Amend PHI
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• Requests to amend PHI in the designated record set may be submitted in writing.</li>
                      <li className="leading-relaxed">• Covered Entity may deny if PHI wasn't created by them, isn't in the record set, isn't inspectable, or is accurate and complete.</li>
                      <li className="leading-relaxed">• Denials allow statements of disagreement; rebuttals may be added.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Receive an Accounting of Disclosures
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• You may request an accounting of disclosures (excluding treatment, payment, operations, or disclosures to you/your representative) for up to 6 years prior.</li>
                      <li className="leading-relaxed">• Requests must be submitted in writing to the Privacy Contact.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Receive a Paper Copy of This Notice
                    </h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li className="leading-relaxed">• Even if received electronically, you may request a paper copy in writing to the Privacy Contact.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Complaints and Privacy Officer Section */}
              <section id="childrens-privacy" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Complaints
                </h2>
                <ul className="space-y-2 text-muted-foreground ml-6 mb-8">
                  <li className="leading-relaxed">• File complaints with Covered Entity or the Secretary of HHS in writing to the Privacy Contact.</li>
                  <li className="leading-relaxed">• No retaliation will occur for filing a complaint.</li>
                </ul>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Privacy Officer
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Direct questions, requests, comments, or complaints to the Privacy Contact.
                </p>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Privacy Officer Contact Information</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="font-medium">Privacy Officer</p>
                    <p>EndoMD Health LLC.</p>
                    <p>1717 East Cary Street</p>
                    <p>Richmond, VA 23233</p>
                    <p>Email: <a href="mailto:info@endomdhealth.com" className="text-primary hover:underline">info@endomdhealth.com</a></p>
                    <p>Phone: <a href="tel:571-480-6053" className="text-primary hover:underline">(571) 480-6053</a></p>
                  </div>
                </div>
              </section>

              {/* Placeholder sections for table of contents */}
              <section id="disclosure-third-parties" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  How We Collect Information About Your Child
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about collection methods]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Information You Provide
                </h3>
                <p className="text-muted-foreground mb-4">
                  [Details about forms, registrations, correspondence]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Automatic Information Collection
                </h3>
                <p className="text-muted-foreground mb-4">
                  [Details about cookies, Google Analytics, tracking technologies]
                </p>
              </section>

              {/* De-identified Information */}
              <section id="de-identified" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  De-identified Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about de-identified data usage]
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="childrens-privacy" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Children's Privacy
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about pediatric practice, parental consent requirements]
                </p>
                <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg my-6">
                  <h4 className="font-semibold text-foreground mb-3">
                    How We Use Your Personal Information
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• [Purpose 1]</li>
                    <li>• [Purpose 2]</li>
                    <li>• [Purpose 3]</li>
                    <li>• [Additional purposes]</li>
                  </ul>
                </div>
              </section>

              {/* Disclosure to Third Parties */}
              <section id="disclosure-third-parties" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Disclosure to Third Parties
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about not selling data and circumstances of disclosure]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  We May Disclose Personal Data:
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• [To contractors and service providers]</li>
                  <li>• [To subsidiaries and affiliates]</li>
                  <li>• [In business transfers]</li>
                  <li>• [For legal compliance]</li>
                  <li>• [With your consent]</li>
                </ul>
              </section>

              {/* Links to Other Websites */}
              <section id="links-other-websites" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Links to Other Websites
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about third-party links and disclaimer]
                </p>
              </section>

              {/* Data Security */}
              <section id="data-security" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Data Security
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about security measures and limitations]
                </p>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Data Retention
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about how long data is retained]
                </p>
              </section>

              {/* Your Rights and Choices */}
              <section id="your-rights" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your Rights and Choices
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about user rights regarding their data]
                </p>
              </section>

              {/* State-Specific Privacy Rights */}
              <section id="state-specific" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  State-Specific Privacy Rights
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about California, Virginia, and other state-specific rights]
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section id="changes" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Changes to Our Privacy Policy
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about how policy updates are communicated]
                </p>
              </section>

              {/* Contact Information */}
              <section id="contact" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-card border border-border rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-foreground mb-4">EndoMD Health LLC</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Phone: <a href="tel:571-480-6053" className="text-primary hover:underline">(571) 480-6053</a></p>
                    <p>Email: <a href="mailto:info@endomdhealth.com" className="text-primary hover:underline">info@endomdhealth.com</a></p>
                    <p>Website: <a href="https://www.endomdhealth.com" className="text-primary hover:underline">www.endomdhealth.com</a></p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-8 text-center mt-12">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Questions About Our Privacy Practices?
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're here to help. Contact us anytime with questions or concerns.
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
