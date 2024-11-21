import { beneifts } from '@/data/branding';

import Container from '../layout/Container';

const Benefits = () => {
  return (
    <Container>
      <div className="border border-border px-2 py-4">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {beneifts.map((item, index) => (
            <div
              key={index}
              className={`relative flex ${index % 2 === 0 ? 'sm:border-r sm:border-border' : ''} ${
                index < beneifts.length - 2 ? 'lg:border-r lg:border-border' : ''
              }`}
            >
              <div className="flex flex-1 items-center justify-start gap-4 p-4">
                <item.icon className="h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="text-md font-bold md:text-sm">{item.title}</h3>
                  <p className="text-sm font-light text-gray-600 md:text-xs">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Benefits;
