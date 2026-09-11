/**
 * "Recent Posts" sidebar card — Figma node 600:4201. These 5 links point
 * at the legacy unimrkt.com/blog/*.php site (verbatim titles/URLs off
 * the node), matching the `legacyUrl` static-content convention already
 * used for migrated Services/Industries pages — not fetched from the new
 * `blog` collection.
 */
const RECENT_POSTS = [
  {
    number: '01',
    title: 'How to Clarify and Align Your Research Goals for Maximum Impact',
    href: 'https://www.unimrkt.com/blog/how-to-clarify-and-align-your-research-goals-for-maximum-impact.php',
  },
  {
    number: '02',
    title: 'Mining Valuable Data: The Driving Force for an Effective Growth Marketing Strategy',
    href: 'https://www.unimrkt.com/blog/mining-valuable-data-the-driving-force-for-an-effective-growth-marketing-strategy.php',
  },
  {
    number: '03',
    title: 'Speaking the Customers Language: 7 Tips for Meaningful Qualitative Research',
    href: 'https://www.unimrkt.com/blog/seven-tips-for-meaningful-qualitative-research.php',
  },
  {
    number: '04',
    title: 'Creating Value for Investors: The Benefits of Primary Market Research',
    href: 'https://www.unimrkt.com/blog/creating-value-for-investors-the-benefits-of-primary-market-research.php',
  },
  {
    number: '05',
    title: 'Utilizing Closed-Ended Questions For Quantitative Market Research',
    href: 'https://www.unimrkt.com/blog/utilizing-closed-ended-questions-for-quantitative-market-research.php',
  },
] as const;

export function RecentPostsCard() {
  return (
    <div className="rounded-[24px] border border-card-border bg-white p-8 shadow-blog">
      <h3 className="font-sans text-2xl font-semibold leading-[1.34] text-ink2">Recent Posts</h3>
      <ul className="mt-4 flex flex-col">
        {RECENT_POSTS.map((post, i) => (
          <li key={post.number} className={i > 0 ? 'border-t border-[#eee] pt-5 mt-5' : ''}>
            <a href={post.href} target="_blank" rel="noopener noreferrer" className="flex gap-4 group">
              <span className="shrink-0 font-sans text-xl font-bold leading-[1.36] text-[#722a48]">{post.number}</span>
              <span className="flex flex-col gap-1">
                <span className="font-sans text-[17px] font-medium leading-[1.36] tracking-[-0.2px] text-[#0c1c36] group-hover:underline">
                  {post.title}
                </span>
                <span className="font-sans text-[15px] leading-[1.65] tracking-[-0.2px] text-[#585858]">6 min · 3.8K views</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
