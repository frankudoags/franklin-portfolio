import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';

export function generateMetadata() {
  return metadata({
    title: "Franklin Udoagwa's Portfolio",
    description: 'Software Engineer specializing in Frontend, Backend, and Security Research',
    url: `${baseUrl}`,
  });
}

export default function Page() {
  return (
    <section>
      <div className='p-6'>
        <h1 className='mb-6 text-2xl font-semibold tracking-tighter text-black dark:text-white'>
          Franklin Udoagwa.
        </h1>

        <div className='space-y-4 text-black dark:text-white mb-8'>
          <p>
            I'm a Software Engineer specializing in JavaScript, TypeScript, and Rust,
            passionate about building scalable applications and conducting security research.
          </p>

          <p>
            From frontend engineering with React and Next.js to backend development with Node.js and Rust,
            I architect robust solutions for complex problems. I contribute to open-source Ethereum projects
            and have extensive experience building products from MVP to production scale.
          </p>

          <p>
            Currently Product Engineer at Oyster Skin Technologies, previously Frontend Engineer at Konga,
            and Software Engineer at Afrihealth. I'm also an active open-source contributor to Reth,
            Alloy, Viem, and REVM — core Ethereum infrastructure projects.
          </p>

          <p className='font-semibold'>
            Have a look at my Resume{' '}
            <a
              href='/Resume_Udoagwa_Franklin.pdf'
              className='underline hover:text-gray-600 dark:hover:text-gray-400 px-1 transition-all duration-200 ease-out transform hover:scale-105'
              target='_blank'
              rel='noopener'
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
