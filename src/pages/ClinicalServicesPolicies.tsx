import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

const ClinicalServicesPolicies = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "general-information", title: "General Information" },
    { id: "services-technology", title: "Our Services and Technology" },
    { id: "emergencies", title: "Emergencies" },
    { id: "supplemental-privacy", title: "Supplemental Privacy Practices Information" },
    { id: "text-email", title: "Text and Email Communications" },
    { id: "coppa", title: "Children's Online Privacy Protection Act" },
    { id: "information-use", title: "Information Use and Disclosure" },
    { id: "parental-attestation", title: "Parental & Guardianship Attestation" },
    { id: "complaint-policy", title: "Complaint Policy" },
    { id: "agreement-consent", title: "Agreement and Consent" },
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Clinical Services & Practice Policies
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Important information about our telehealth services, clinical practices, and policies for patients and
              families.
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
              {/* General Information Section */}
              <section id="general-information" className="mb-12 scroll-mt-24">
                <p className="text-muted-foreground mb-4 leading-relaxed font-medium">
                  Effective date: September 20, 2024
                </p>
                <h2 className="text-3xl font-bold text-foreground mb-6">General Information</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  EndoMD Health provides pediatric telehealth services for children through its engaged clinicians and
                  sub-clinical specialists (the "Clinical Care Team") and non-clinical support. This Clinical Services
                  and Practices Policies Agreement describes EndoMD Health's services and clinical programs. It is
                  important for You to read this document and discuss any questions You might have with an EndoMD Health
                  representative.
                </p>
              </section>

              {/* Our Services and Technology Section */}
              <section id="services-technology" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Services and Technology</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  When Your Child becomes a patient of EndoMD Health, You will be given access to the online platform of
                  EndoMD Health (the "EndoMD Health Platform") and Our Clinical Care Team. The EndoMD Health Platform
                  1.) provides personalized content and interactive resources for You, 2. Provides billing information,
                  3.) serves as Your hub of information, including Your Child's medical records, and 4.) connects You
                  and/or Your Child to the Clinical Care Team.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Telehealth care is a flexible and convenient way to get healthcare, but it may not be right for
                  treating certain problems or illnesses that need an in-person doctor or urgent care visit. The
                  Clinical Care Team may therefore determine telehealth is not appropriate for Your Child's treatment
                  and may direct You to Your Child's primary care physician. EndoMD Health does not provide emergency
                  care or handle medical emergencies.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The Clinical Care Team will be with You and Your Child every step of the way and work collaboratively
                  to support standard, effective care, via telehealth using asynchronous messaging services and
                  store-and-forward technology (the "Telehealth Services"). Telehealth Services do not involve
                  videotaping.
                </p>
              </section>

              {/* Emergencies Section */}
              <section id="emergencies" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">EMERGENCIES</h2>
                <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-6">
                  <p className="text-foreground font-medium leading-relaxed">
                    Please note that Endo MD Health is not equipped or designed to handle medical emergencies. If You or
                    Your Child has a medical emergency, or You think either of You or Your Child MIGHT have a medical
                    emergency, please call 911, or go immediately to the nearest emergency room. If You or Your Child
                    experience a mental health crisis or need to speak to someone, please call Suicide Prevent Lifeline
                    at 800-273-TALK (8255) at any time.
                  </p>
                </div>
              </section>

              {/* Supplemental Privacy Practices Information Section */}
              <section id="supplemental-privacy" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">SUPPLEMENTAL PRIVACY PRACTICES INFORMATION</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our privacy practices are described in detail in our Notice of Privacy Practices and in our Privacy
                  Policy. Please read those documents, as well as this one, and contact us with any questions you may
                  have.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Because We treat children (see Children's Online Privacy Protection Act , below) and do so via
                  telemedicine, and because We permit text and email communications (see Text and Email Communications ,
                  below ), We provide below some supplemental information here to help you better understand how We
                  handle confidential information you entrust to us.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  In accordance with applicable law, EndoMD Health uses standard physical, electronic, and business
                  security methods to help prevent access to Your Child's health information by people who should not
                  see it. Nevertheless, We cannot promise that data sent over the Internet, text, or through a data
                  storage facility will be secure. Thus, EndoMD Health cannot guarantee the security of any information
                  You or Your Child provides to us.
                </p>
              </section>

              {/* Text and Email Communications Section */}
              <section id="text-email" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">Text and Email Communications</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The Clinical Care Team will primarily communicate with You and Your Child, including for clinical,
                  clinical triage, and treatment purposes, via video calls, text messages, and emails. Video calls, text
                  messages, and emails are not always secure because they travel over unencrypted networks that we do
                  not control.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  By providing us Your cell phone number and email address, You agree to permit us to communicate with
                  You by text message and email. You may ask to stop such communication by contacting Your Clinical Care
                  Team.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  By signing this document, You acknowledge that You may have to pay data costs to receive text messages
                  that We send to Your mobile phone and that You are solely responsible for any such costs, and that
                  such messages may not always be secure.
                </p>
              </section>

              {/* Children's Online Privacy Protection Act Section */}
              <section id="coppa" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">Children's Online Privacy Protection Act</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  As part of the Telehealth Services, EndoMD Health will collect the personal information of Your Child.
                  Your consent is required for the collection, use, and disclosure of Your Child's information. EndoMD
                  Health will not collect Your Child's personal information unless You consent. However, if You do not
                  give Your consent, Your Child may not use the Telehealth Services.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The types of personal information We collect directly from Your Child includes:
                </p>
                <ul className="space-y-3 text-muted-foreground ml-6">
                  <li className="leading-relaxed">
                    • any information Your Child provides to us during a telehealth appointment, including health
                    related information, or while logged into the account You created for the EndoMD Health Platform if
                    You provide Your Child with Your credentials (We do not currently allow children under age 18 to
                    register directly with us);
                  </li>
                  <li className="leading-relaxed">
                    • information about Your Child's use of the Telehealth Services and EndoMD Health Platform,
                    including information sent by the mobile device or computer used by You or Your Child (e.g., IP
                    address, unique device identifiers, website usage information, etc.) and information sent by the
                    mobile device(s), and location information.
                  </li>
                </ul>
              </section>

              {/* Information Use and Disclosure Section */}
              <section id="information-use" className="mb-12 scroll-mt-24">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We use and disclose that personal information:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                  <li className="leading-relaxed">- to provide Our services;</li>
                  <li className="leading-relaxed">- for business analytics purposes;</li>
                  <li className="leading-relaxed">- for Our own marketing purposes;</li>
                  <li className="leading-relaxed">- to provide customer support to You;</li>
                  <li className="leading-relaxed">- for account and network security purposes;</li>
                  <li className="leading-relaxed">- to maintain legal and regulatory compliance; and</li>
                  <li className="leading-relaxed">- to enforce compliance with Our agreements and policies.</li>
                </ul>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You consent to the collection, use, and disclosure of You or Your Child's information, as described in
                  this Clinical Services and Practice Policies Agreement, Our Privacy Policy, and Our Notice of Privacy
                  Practices. You may revoke this consent at any time. However, once Your consent is revoked, Your Child
                  may not use Our Telehealth Services or the EndoMD Health Platform again unless a new Clinical Services
                  and Practice Policies Agreement is signed by You.
                </p>
              </section>

              {/* Parental & Guardianship Attestation Section */}
              <section id="parental-attestation" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">Parental & Guardianship Attestation</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  To authorize health services for Your Child, You must be his or her parent or legal guardian. If You
                  are separated or divorced (or become separated or divorced) from the other parent or legal guardian of
                  Your Child, You agree to immediately notify the other parent or legal guardian that EndoMD Health is
                  providing Telehealth Services to Your Child. If requested, You also agree to provide a copy of the
                  most recent custody decree that establishes Your custody rights or otherwise demonstrates that You
                  have the right to authorize treatment for Your Child. You understand that it is Your responsibility to
                  promptly notify EndoMD Health of any changes concerning You as the parent or legal guardian of Your
                  Child.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  One risk of pediatric endocrinology care involves disagreement among parents and/or disagreement
                  between parents and the child's clinician regarding the child's treatment. You agree to notify EndoMD
                  Health immediately if such a disagreement occurs. If such disagreements occur, EndoMD Health will
                  strive to listen carefully so that We can understand Your perspectives and fully explain Our
                  perspective. If either parent or legal guardian decides that the Telehealth Services should end,
                  EndoMD Health will endeavor to honor that decision, unless there are extraordinary circumstances.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  During the treatment, EndoMD Health may meet with Your Child's parents or legal guardians either
                  separately or together. Please be aware that EndoMD Health's patient is Your Child – not You, the
                  other parent or legal guardian, or any siblings or other family members of the child. Furthermore, any
                  communication by a parent or legal guardian may be disclosed by EndoMD Health to the other parent or
                  legal guardian. Therefore, a parent or legal guardian should NOT share any information which he or she
                  is not willing to have disclosed to the other parent or legal guardian.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You hereby certify that You have legal authority to authorize EndoMD Health to provide the Telehealth
                  Services to Your Child. You further certify that You are not a party to or otherwise the subject of
                  any agreement or court order that requires the written approval of Your Child's other parent or any
                  third party to authorize medical treatment or services for Your Child.
                </p>
              </section>

              {/* Complaint Policy Section */}
              <section id="complaint-policy" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">Complaint Policy</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You and Your Child have the right to communicate grievances regarding care. Should You wish to make a
                  formal complaint about anyone at EndoMD Health, please submit Your concerns in writing to EndoMD
                  Health at info@endomdhealth.com
                </p>
              </section>

              {/* Agreement and Consent Section */}
              <section id="agreement-consent" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-6">Agreement and Consent</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  If You have questions about any of the contents of this Clinical Services and Practice Policies
                  Agreement, Our procedures, or Your role in this process, please discuss them with the Critical Care
                  Team. Please remember that the best way to ensure quality treatment is to keep communication open and
                  direct with Your Child's clinicians.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You consent to be bound to the terms of this Clinical Services and Practice Policies Agreement, and
                  acknowledge that You understand them. You further certify that if You are signing as a personal
                  representative of Your Child You have legal authority to provide consent for the treatment of Your
                  Child.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClinicalServicesPolicies;
