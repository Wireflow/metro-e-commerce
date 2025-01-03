'use client';

import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { useBranch } from '@/hooks/queries/useMetro';

import { PrivacyPolicyDocument, PrivacyPolicyDocumentSchema } from '../schemas/privacy';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const PrivacyPolicyPage = () => {
  const { branch } = useBranch();

  const isValid = PrivacyPolicyDocumentSchema.safeParse(branch?.branch_settings?.privacyPolicy);

  const privacyPolicy = branch?.branch_settings?.privacyPolicy as unknown as PrivacyPolicyDocument;

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />

      <Container className="flex flex-col py-10">
        {!isValid.success ? (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-center text-yellow-700">
              Privacy Policy is currently unavailable. Please check back later.
            </p>
          </div>
        ) : (
          <>
            <h1 className="w-fit border-b border-primary text-3xl font-semibold">
              {privacyPolicy?.privacyPolicy?.title || 'Privacy Policy'}
            </h1>

            <div className="mt-6 space-y-8">
              {/* Last Updated Date */}
              <p className="text-sm text-gray-600">
                Last Updated: {privacyPolicy?.privacyPolicy?.lastUpdated}
              </p>

              {/* Introduction */}
              <p className="text-gray-700">{privacyPolicy?.privacyPolicy?.introduction}</p>

              {/* Sections */}
              <div className="space-y-8">
                {privacyPolicy?.privacyPolicy?.sections.map((section, index) => (
                  <div key={index} className="space-y-1">
                    <h2 className="text-xl font-medium text-gray-900">{section.title}</h2>
                    <div className="pl-4">
                      <p className="text-gray-700">{section.content}</p>
                      {section.items && (
                        <ul className="mt-2 list-inside list-disc space-y-2 pl-4">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.note && (
                        <p className="mt-2 text-sm italic text-gray-600">{section.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
