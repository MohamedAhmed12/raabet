"use server";

import { getFontClass } from "@/lib/fonts";
import { getLocale } from "next-intl/server";
import Head from "next/head";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "شروط الخدمة - رابط" : "Terms of Service - Rabet Link",
    description:
      locale === "ar"
        ? "شروط الخدمة لرابط لينك - تعرف على الشروط و الاحكام لاستخدام خدماتنا"
        : "Terms of Service for Rabet Link - Learn about the rules and conditions for using our services",
    openGraph: {
      title: locale === "ar" ? "شروط الخدمة - رابط" : "Terms of Service - Rabet Link",
      description:
        locale === "ar"
          ? "شروط الخدمة لرابط لينك - تعرف على الشروط و الاحكام لاستخدام خدماتنا"
          : "Terms of Service for Rabet Link - Learn about the rules and conditions for using our services",
      url: `${baseUrl}/${locale}/terms`,
      siteName: "Rabet Link",
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: {
        en: `${baseUrl}/en/terms`,
        ar: `${baseUrl}/ar/terms`,
        "x-default": `${baseUrl}/en/terms`,
      },
    },
  };
}

export default async function TermsPage() {
  const fontClass = await getFontClass();
  const locale = await getLocale();

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/terms`} />
      </Head>
      <div
        className={`bg-gray-200 py-15 flex items-center justify-center ${fontClass}`}
      >
      <div className="bg-white py-10 px-20 flex flex-col items-start max-w-4xl rounded-sm gap-4">
        <div>
          <div className="text-2xl mb-4"> Terms Of Service</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Please read these Terms and Conditions (&quot;Terms&quot;,
              &quot;Terms and Conditions&quot;) carefully before using the
              rabetlink.com website (the &quot;Service&quot;) operated by Rabet,
              LLC (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
            </span>
            <span>
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users and others who access or use the Service.
              You warrant that you are at least 18-years-old and you are legally
              capable of entering into binding contracts. If you are under
              18-years-old, you warrant that you have obtained consent from your
              parent or guardian and they agree to be bound by these Terms on
              your behalf.
            </span>
            <span>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms then you may not
              access the Service.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">1. Content</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, videos, or
              other material (&quot;Content&quot;). You are responsible for the
              Content that you post to the Service, including its legality,
              reliability, and appropriateness.
            </span>
            <span>
              By posting Content to the Service, you grant us the right and
              license to use, modify, publicly perform, publicly display,
              reproduce, and distribute such Content on and through the Service.
              You retain any and all of your rights to any Content you submit,
              post or display on or through the Service and you are responsible
              for protecting those rights. You agree that this license includes
              the right for us to make your Content available to other users of
              the Service, who may also use your Content subject to these Terms.
            </span>
            <span>
              You represent and warrant that: (i) the Content is yours (you own
              it) or you have the right to use it and grant us the rights and
              license as provided in these Terms, and (ii) the posting of your
              Content on or through the Service does not violate the privacy
              rights, publicity rights, copyrights, contract rights or any other
              rights of any person. Further, you warrant that: (i) the Content
              will not cause you or us to breach any law, regulation, rule, code
              or other legal obligation; (ii) the Content will not or could not
              be reasonably considered to be obscene, inappropriate, defamatory,
              disparaging, indecent, seditious, offensive, pornographic,
              threatening, abusive, liable to incite racial hatred,
              discriminatory, blasphemous, in breach of confidence or in breach
              of privacy; (iii) the Content will not be unsolicited, undisclosed
              or unauthorized advertising; (iv) the Content does not exist with
              the sole purpose of manipulating or influencing search engine
              indexing; (v) the Content does not contain software viruses or any
              other computer code, files, or programs designed to interrupt,
              destroy, or limit the functionality of any computer software,
              hardware or telecommunications equipment; and (vi): the Content
              does not bring us or the Service into disrepute.
            </span>
            <span>
              You agree to keep all records necessary to establish that your
              Content does not violate any of the requirements this clause and
              make such records available upon our reasonable request.
            </span>
            <span>
              We are under no obligation to regularly monitor the accuracy or
              reliability of your Content incorporated into the Service. We
              reserve the right to modify or remove any Content at any time.
            </span>
            <span>
              You acknowledge and agree that all Content you provide on the
              Service will be publicly available information and you bear the
              risks involved with such public disclosures.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">2. Accounts</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              When you create an account with us, you must provide us
              information that is accurate, complete, and current at all times.
              Failure to do so constitutes a breach of the Terms, which may
              result in immediate termination of your account on our Service.
            </span>
            <span>
              You are responsible for safeguarding the password that you use to
              access the Service and for any activities or actions under your
              password, whether your password is with our Service or a
              third-party service.
            </span>
            <span>
              You agree not to disclose your password to any third party. You
              agree to be fully responsible for activities that relate to your
              account or your password. You must notify us immediately upon
              becoming aware of any breach of security or unauthorized use of
              your account.
            </span>
            <span>
              You may not use as a username the name of another person or entity
              or that is not lawfully available for use, a name or trade mark
              that is subject to any rights of another person or entity other
              than you without appropriate authorization, or a name that is
              otherwise offensive, vulgar or obscene. You may not register a
              username with the purpose of selling it, or in any other way
              &quot;squat&quot; or &quot;park&quot; a username. Failure to
              comply may result in your account being suspended.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">3. Access & Membership</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              The Service and its original content (excluding Content provided
              by users), features and functionality are and will remain the
              exclusive property of Rabet, LLC and its licensors. Nothing in
              these Terms constitutes a transfer of any Intellectual Property
              rights from us to you.
            </span>
            <span>
              You are permitted to use the Service only as authorized by us. As
              a user, you are granted a limited, non-exclusive, revocable,
              non-transferable right to use the Service to create, display, use,
              play, and download Content subject to these Terms.
            </span>
            <span>
              Our Intellectual Property must not be used in connection with a
              product or service that is not affiliated with us or in any way
              brings us in disrepute.
            </span>
            <span>
              You must not modify the physical or digital copies of any Content
              you print off or download in any way, and you must not use any
              illustrations, photographs, video or audio, or any graphics
              separately from any accompanying text.
            </span>
            <span>
              Any opinions, advice, statements, services, offers, or other
              information or content expressed or made available by any other
              users are those of the respective authors or distributors and not
              of us.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">4. Access & Membership</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Our Service may contain links to third-party web sites or services
              that are not owned or controlled by Rabet, LLC.
            </span>
            <span>
              Rabet, LLC has no control over, and assumes no responsibility for,
              the content, privacy policies, or practices of any third party web
              sites or services. You further acknowledge and agree that Rabet,
              LLC shall not be responsible or liable, directly or indirectly,
              for any damage or loss caused or alleged to be caused by or in
              connection with use of or reliance on any such content, goods or
              services available on or through any such web sites or services.
            </span>
            <span>
              We only provide links to external websites as a convenience, and
              the inclusion of such a link to external websites do not imply our
              endorsement of those websites. You acknowledge and agree that when
              you access other websites on the Internet, you do so at your own
              risk.
            </span>
            <span>
              We strongly advise you to read the terms and conditions and
              privacy policies of any third-party web sites or services that you
              visit.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">5. Access & Membership</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms.
            </span>
            <span>
              Upon termination, your right to use the Service will immediately
              cease. If you wish to terminate your account, you may simply
              discontinue using the Service.
            </span>
            <span>
              All provisions of the Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity
              and limitations of liability.
            </span>
            <span>
              We shall not be liable to you or any third party for any claims or
              damages arising out of any termination or suspension or any other
              actions taken by us in connection therewith.
            </span>
            <span>
              If applicable law requires us to provide notice of termination or
              cancellation, we may give prior or subsequent notice by posting it
              on the Service or by sending a communication to any address (email
              or otherwise) that we have for you in our records.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">6. Access & Membership</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              As a condition of your access to and use of the Service, you agree
              to indemnify us and our successors and assigns for all damages,
              costs, expenses and other liabilities, including but not limited
              to legal fees and expenses, relating to any claim arising out of
              or related to your access to and use of the Service or your breach
              of these Terms and any applicable law or the rights of another
              person or party.
            </span>
            <span>
              This indemnification section survives the expiration of your
              registration, and applies to claims arising both before and after
              the registration ends.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">7. Limitation Of Liability</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              You agree that we shall not be liable for any damages suffered as
              a result of using the Service, copying, distributing, or
              downloading Content from the Service.
            </span>
            <span>
              In no event shall we be liable for any indirect, punitive,
              special, incidental or consequential damage (including loss of
              business, revenue, profits, use, privacy, data, goodwill or other
              economic advantage) however it arises, whether for breach of
              contract or in tort, even if it has been previously advised of the
              possibility of such damage.
            </span>
            <span>
              You have sole responsibility for adequate security protection and
              backup of data and/or equipment used in connection with your usage
              of the Service and will not make a claim against for lost data,
              re-run time, inaccurate instruction, work delays or lost profits
              resulting from the use of the Service. You must not assign or
              otherwise dispose of your account to any other person.
            </span>
            <span>
              Without limiting the foregoing, in no event will our aggregate
              liability to you exceed, in total, the amounts paid by you to us.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">8. Disclaimer</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Your use of the Service is at your sole risk. The Service is
              provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              basis. The Service is provided without warranties of any kind,
              whether express or implied, including, but not limited to, implied
              warranties of merchantability, fitness for a particular purpose,
              non-infringement or course of performance.
            </span>
            <span>
              Rabet, LLC its subsidiaries, affiliates, and its licensors do not
              warrant that a) the Service will function uninterrupted, secure or
              available at any particular time or location; b) any errors or
              defects will be corrected; c) the Service is free of viruses or
              other harmful components; or d) the results of using the Service
              will meet your requirements.
            </span>
            <span>
              We make no representations or warranties of any kind, express or
              implied, about the completeness, accuracy, reliability,
              suitability or availability with respect to the content contained
              on the Service for any purpose. Any reliance you place on such
              information is therefore strictly at your own risk. We disclaim
              any express or implied warranty representation or guarantee as to
              the effectiveness or profitability of the Service or that the
              operation of our Service will be uninterrupted or error-free. We
              are not liable for the consequences of any interruptions or error
              in the Service.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">9. Exclusions</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Some jurisdictions do not allow the exclusion of certain
              warranties or the exclusion or limitation of liability for
              consequential or incidental damages, so the limitations above may
              not apply to you.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">10. Governing Law</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              These Terms shall be governed and construed in accordance with the
              laws of NY State, USA, without regard to its conflict of law
              provisions.
            </span>
            <span>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect. These
              Terms constitute the entire agreement between us regarding our
              Service, and supersede and replace any prior agreements we might
              have between us regarding the Service.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">11. Changes</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 15 days notice prior to any new terms taking
              effect.
            </span>
            <span>
              It is your sole responsibility to periodically check these Terms
              for any changes. If you do not agree with any of the changes to
              these Terms, it is your sole responsibility to stop using the
              Service. Your continued use of the Service will be deemed as your
              acceptance thereof.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">12. Customer Data</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              The Customer owns the rights to its data as data controller, and
              the service acts as data processor on the Customer&apos;s behalf.
              All processing by the service of the personal data and other data
              provided by the Customer shall be in accordance with the
              applicable laws. The service&apos;s processing of personal data on
              behalf of the Customer shall therefore only be done in order to
              provide the Product and shall be subject to the Customer&apos;s
              written instructions. The Customer is obligated to keep user
              logins and passwords to the Product secret from any unauthorized
              users or third parties. The Customer is obligated to ensure that
              the personal data provided by the Customer and used in the Product
              is processed by the Customer in accordance with all applicable
              laws. The Customer is obligated to ensure that the Customer&apos;s
              data provided in the Product, including personal data, do not
              violate any third party intellectual property rights and/or any
              applicable legislation. The service is entitled to delete any data
              that in the sole discretion of the service constitutes a breach of
              the aforesaid undertaking by the Customer, and the Customer will
              not be entitled to any compensation in that respect.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">13. Data Location</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              You agree that by using this service, all data held as outlined in
              the privacy policy and here within, as necessary for the product
              to function is stored and processed in The United States of
              America and is not stored within the European Union.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">14. Subscriptions</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Some parts of the Service are billed on a subscription basis
              (&quot;Subscription(s)&quot;). You will be billed in advance on a
              recurring and periodic basis (&quot;Billing Cycle&quot;). Billing
              cycles are set on a monthly basis
            </span>
            <span>
              At the end of each Billing Cycle, your Subscription will
              automatically renew under the exact same conditions unless you
              cancel it or Rabet, LLC cancels it. You may cancel your
              Subscription renewal either through your online account management
              page or by contacting Rabet, LLC customer support team.
            </span>
            <span>
              A valid payment method, including credit card, is required to
              process the payment for your Subscription. You shall provide
              Rabet, LLC with accurate and complete billing information. By
              submitting such payment information, you automatically authorize
              Rabet, LLC to charge all Subscription fees incurred through your
              account to any such payment instruments.
            </span>
            <span>
              Should automatic billing fail to occur for any reason, Rabet, LLC
              will issue an electronic invoice indicating that you must proceed
              manually, within a certain deadline date, with the full payment
              corresponding to the billing period as indicated on the invoice.
            </span>
            <span>
              Should automatic billing fail to occur for any reason, Rabet, LLC
              will issue an electronic invoice indicating that you must proceed
              manually, within a certain deadline date, with the full payment
              corresponding to the billing period as indicated on the invoice.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">15. Subscriptions</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Rabet, LLC, in its sole discretion and at any time, may modify the
              Subscription fees for the Subscriptions. Any Subscription fee
              change will become effective at the end of the then-current
              Billing Cycle.
            </span>
            <span>
              Rabet, LLC will provide you with a reasonable prior notice of any
              change in Subscription fees to give you an opportunity to
              terminate your Subscription before such change becomes effective.
            </span>
            <span>
              Your continued use of the Service after the Subscription fee
              change comes into effect constitutes your agreement to pay the
              modified Subscription fee amount.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">16. Refunds</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              Except when required by law, paid Subscription fees are
              non-refundable.
            </span>
          </div>
        </div>

        <div>
          <div className="text-2xl mb-4">17. Contact Us</div>
          <div className="text-sm flex flex-col gap-4">
            <span>
              If you have any questions about these Terms, please contact us by
              email at support@rabet-link.com
            </span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
