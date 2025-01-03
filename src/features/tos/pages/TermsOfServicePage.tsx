'use client';

import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { useBranch } from '@/hooks/queries/useMetro';
import { formatPhoneNumber } from '@/utils/utils';

import { TermsOfServiceDocument, TermsOfServiceDocumentSchema } from '../schemas/tos';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Terms of Service', href: '/tos' },
];

const TermsOfServicePage = () => {
  const { branch } = useBranch();

  const isValid = TermsOfServiceDocumentSchema.safeParse(branch?.branch_settings?.termsOfService);

  const termsOfService = branch?.branch_settings
    ?.termsOfService as unknown as TermsOfServiceDocument;

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />

      <Container className="flex flex-col py-10">
        {!isValid.success ? (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-center text-yellow-700">
              Terms of Service is currently unavailable. Please check back later.
            </p>
          </div>
        ) : (
          <>
            <h1 className="w-fit border-b border-primary text-3xl font-semibold">
              {termsOfService?.termsOfService?.title || 'Terms of Service'}
            </h1>

            <div className="mt-6 space-y-8">
              {/* Last Updated Date */}
              <p className="text-sm text-gray-600">
                Last Updated: {termsOfService?.termsOfService?.lastUpdated}
              </p>

              {/* Introduction */}
              <p className="text-gray-700">{termsOfService?.termsOfService?.introduction}</p>

              {/* Sections */}
              <div className="space-y-8">
                {termsOfService?.termsOfService?.sections.map(section => (
                  <div key={section.id} className="space-y-1">
                    <h2 className="text-xl font-medium text-gray-900">
                      {section.id}. {section.title}
                    </h2>
                    <div className="pl-4">
                      <div className="space-y-2">
                        {section.subsections.map(subsection => (
                          <div key={subsection.id}>
                            <p className="flex flex-row items-center gap-1.5 text-gray-700">
                              <span className="text-xl">•</span> {subsection.content}
                            </p>
                            {subsection.contactDetails && (
                              <div className="mt-2 rounded bg-gray-50 p-4 text-sm text-gray-600">
                                <p>{branch?.name}</p>
                                <p>{branch?.address}</p>
                                <p>{formatPhoneNumber(branch?.phone)}</p>
                                <p>{branch?.email}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
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

export default TermsOfServicePage;
