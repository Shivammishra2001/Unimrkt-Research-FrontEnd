/**
 * Static /services page copy. This used to live in the `services-page`
 * Strapi singleType (removed — a separate CMS entry for one listing page
 * wasn't worth a sidebar slot). Snapshot of its last published content, in
 * the same raw shape so normalizeServicesPageSettings() is unchanged.
 * Media URLs still point at Strapi's upload provider.
 */
import type { StrapiServicesPageResponse } from '@/models/servicesPage';

export const SERVICES_PAGE_CONTENT = {
  "data": {
    "introEyebrow": "ABOUT OUR SERVICES",
    "introHeading": "Comprehensive Research Solutions For Smarter Business Decisions",
    "introParagraph1": "At Unimrkt Research, we provide end-to-end market research services that empower businesses with accurate data, actionable insights, and strategic intelligence. From primary data collection and qualitative research to quantitative studies, business research, and research support functions, our tailored solutions help organizations understand markets, customers, and emerging opportunities.",
    "introParagraph2": "Backed by experienced researchers, advanced methodologies, and global capabilities, we deliver reliable research solutions across diverse industries. Whether you're launching a new product, evaluating market opportunities, or strengthening your competitive position, Unimrkt Research provides the insights you need to make confident, data-driven decisions and achieve sustainable growth.",
    "valuePropsHeading": "Why Choose Unimrkt?",
    "valuePropsBody": "With 16+ years of expertise, global research capabilities, advanced methodologies, and trusted data quality, Unimrkt delivers accurate insights that empower smarter business decisions and sustainable growth.",
    "valuePropsBackground": {
      "id": 39,
      "documentId": "n59cans511ba1c7r6g12ylkl",
      "name": "industry-cityscape.jpg",
      "alternativeText": null,
      "caption": null,
      "focalPoint": null,
      "width": 1742,
      "height": 657,
      "formats": {
        "thumbnail": {
          "name": "thumbnail_industry-cityscape.jpg",
          "hash": "thumbnail_industry_cityscape_4dbcb4ce21",
          "ext": ".jpg",
          "mime": "image/jpeg",
          "path": null,
          "width": 245,
          "height": 92,
          "size": 4.18,
          "sizeInBytes": 4177,
          "url": "/uploads/thumbnail_industry_cityscape_4dbcb4ce21.jpg"
        },
        "large": {
          "name": "large_industry-cityscape.jpg",
          "hash": "large_industry_cityscape_4dbcb4ce21",
          "ext": ".jpg",
          "mime": "image/jpeg",
          "path": null,
          "width": 1000,
          "height": 377,
          "size": 45.94,
          "sizeInBytes": 45940,
          "url": "/uploads/large_industry_cityscape_4dbcb4ce21.jpg"
        },
        "medium": {
          "name": "medium_industry-cityscape.jpg",
          "hash": "medium_industry_cityscape_4dbcb4ce21",
          "ext": ".jpg",
          "mime": "image/jpeg",
          "path": null,
          "width": 750,
          "height": 283,
          "size": 28.64,
          "sizeInBytes": 28637,
          "url": "/uploads/medium_industry_cityscape_4dbcb4ce21.jpg"
        },
        "small": {
          "name": "small_industry-cityscape.jpg",
          "hash": "small_industry_cityscape_4dbcb4ce21",
          "ext": ".jpg",
          "mime": "image/jpeg",
          "path": null,
          "width": 500,
          "height": 188,
          "size": 14.15,
          "sizeInBytes": 14148,
          "url": "/uploads/small_industry_cityscape_4dbcb4ce21.jpg"
        }
      },
      "hash": "industry_cityscape_4dbcb4ce21",
      "ext": ".jpg",
      "mime": "image/jpeg",
      "size": 96.52,
      "url": "/uploads/industry_cityscape_4dbcb4ce21.jpg",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "createdAt": "2026-09-08T05:45:19.388Z",
      "updatedAt": "2026-09-08T05:45:19.388Z",
      "publishedAt": "2026-09-08T05:45:19.388Z"
    },
    "hero": {
      "id": 550,
      "eyebrow": "OUR SERVICES",
      "heading": "Research Solutions That Drive Business Growth",
      "subheading": "Helping organizations transform data into actionable insights through comprehensive market research and business intelligence.",
      "mediaAlignment": "background",
      "headingSize": "display",
      "theme": "light",
      "anchorId": null,
      "statValue": null,
      "statLabel": null,
      "media": {
        "id": 31,
        "documentId": "k3dikv8qzm97o6xqibejefg3",
        "name": "hero-photo.jpg",
        "alternativeText": null,
        "caption": null,
        "focalPoint": null,
        "width": 1900,
        "height": 1005,
        "formats": {
          "thumbnail": {
            "name": "thumbnail_hero-photo.jpg",
            "hash": "thumbnail_hero_photo_9f0cdda1b2",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 245,
            "height": 129,
            "size": 2.86,
            "sizeInBytes": 2859,
            "url": "/uploads/thumbnail_hero_photo_9f0cdda1b2.jpg"
          },
          "medium": {
            "name": "medium_hero-photo.jpg",
            "hash": "medium_hero_photo_9f0cdda1b2",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 750,
            "height": 397,
            "size": 18.4,
            "sizeInBytes": 18401,
            "url": "/uploads/medium_hero_photo_9f0cdda1b2.jpg"
          },
          "large": {
            "name": "large_hero-photo.jpg",
            "hash": "large_hero_photo_9f0cdda1b2",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 1000,
            "height": 529,
            "size": 29.85,
            "sizeInBytes": 29851,
            "url": "/uploads/large_hero_photo_9f0cdda1b2.jpg"
          },
          "small": {
            "name": "small_hero-photo.jpg",
            "hash": "small_hero_photo_9f0cdda1b2",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 500,
            "height": 264,
            "size": 9.07,
            "sizeInBytes": 9072,
            "url": "/uploads/small_hero_photo_9f0cdda1b2.jpg"
          }
        },
        "hash": "hero_photo_9f0cdda1b2",
        "ext": ".jpg",
        "mime": "image/jpeg",
        "size": 66.64,
        "url": "/uploads/hero_photo_9f0cdda1b2.jpg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "createdAt": "2026-09-08T05:45:16.054Z",
        "updatedAt": "2026-09-08T05:45:16.054Z",
        "publishedAt": "2026-09-08T05:45:16.055Z"
      },
      "actions": [
        {
          "id": 7674,
          "label": "Get a Free Quote",
          "href": "/contact",
          "isExternal": false,
          "variant": "primary"
        },
        {
          "id": 7675,
          "label": "Talk to Our Experts",
          "href": "/contact",
          "isExternal": false,
          "variant": "secondary"
        }
      ]
    },
    "valueProps": [
      {
        "order": 0,
        "id": 3503,
        "title": "Research Excellence",
        "description": "",
        "iconIdentifier": "trophy",
        "statValue": "16+ Years",
        "statLabel": "of Research Excellence",
        "icon": null
      },
      {
        "order": 1,
        "id": 3504,
        "title": "Countries Covered",
        "description": "",
        "iconIdentifier": "global",
        "statValue": "90+ Countries",
        "statLabel": "Covered",
        "icon": null
      },
      {
        "order": 2,
        "id": 3505,
        "title": "Languages Supported",
        "description": "",
        "iconIdentifier": "languages",
        "statValue": "22+ Languages",
        "statLabel": "Supported",
        "icon": null
      },
      {
        "order": 3,
        "id": 3506,
        "title": "Research Professionals",
        "description": "",
        "iconIdentifier": "users",
        "statValue": "Experienced",
        "statLabel": "Research Professionals",
        "icon": null
      },
      {
        "order": 4,
        "id": 3507,
        "title": "Research Solutions",
        "description": "",
        "iconIdentifier": "box",
        "statValue": "Customized",
        "statLabel": "Research Solutions",
        "icon": null
      },
      {
        "order": 5,
        "id": 3508,
        "title": "Actionable Insights",
        "description": "",
        "iconIdentifier": "shield-check",
        "statValue": "Accurate",
        "statLabel": "& Actionable Insights",
        "icon": null
      }
    ],
    "faq": {
      "id": 127,
      "heading": "Frequently Asked Questions",
      "anchorId": null,
      "background": {
        "id": 61,
        "documentId": "eb5splqyzjux54ep9emqe1pd",
        "name": "worldmap-mask.svg",
        "alternativeText": null,
        "caption": null,
        "focalPoint": null,
        "width": 1900,
        "height": 719,
        "formats": null,
        "hash": "worldmap_mask_0343012d7e",
        "ext": ".svg",
        "mime": "image/svg+xml",
        "size": 0.24,
        "url": "/uploads/worldmap_mask_0343012d7e.svg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "createdAt": "2026-09-10T10:48:51.338Z",
        "updatedAt": "2026-09-10T10:48:51.338Z",
        "publishedAt": "2026-09-10T10:48:51.338Z"
      },
      "items": [
        {
          "id": 10396,
          "question": "What services does Unimrkt Research provide?",
          "answer": "Unimrkt Research provides comprehensive qualitative and quantitative research, secondary research, CATI, CAWI, and online global panel services across B2B and B2C sectors."
        },
        {
          "id": 10397,
          "question": "How do I choose the right research service for my project?",
          "answer": "Our team collaborates directly with you to understand your objectives, timelines, and budget, designing a bespoke methodology tailored to your market."
        },
        {
          "id": 10398,
          "question": "Can Unimrkt Research handle global and multi-country research projects?",
          "answer": "Yes, we possess on-the-ground reach and vetted panel infrastructure across 110+ markets in North America, Europe, APAC, LATAM, and the Middle East."
        },
        {
          "id": 10399,
          "question": "Which industries do you serve?",
          "answer": "We serve Healthcare & Life Sciences, Technology, BFSI, Automotive, Consumer Goods (FMCG), and Industrial Manufacturing."
        },
        {
          "id": 10400,
          "question": "Why choose Unimrkt Research as your research partner?",
          "answer": "With 16+ years of operational excellence, ISO-compliant quality checks, and proprietary panel verification, we ensure clean, decision-ready data."
        }
      ]
    },
    "cta": {
      "id": 1419,
      "heading": "Start Your Research Journey",
      "body": "Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.",
      "theme": "accent",
      "anchorId": null,
      "backgroundColor": null,
      "actions": [
        {
          "id": 7676,
          "label": "Talk to Our Experts",
          "href": "/contact",
          "isExternal": false,
          "variant": "secondary"
        }
      ],
      "background": {
        "id": 40,
        "documentId": "oide2exfzele2gznveygtlsz",
        "name": "blog-photo.jpg",
        "alternativeText": null,
        "caption": null,
        "focalPoint": null,
        "width": 2000,
        "height": 1333,
        "formats": {
          "thumbnail": {
            "name": "thumbnail_blog-photo.jpg",
            "hash": "thumbnail_blog_photo_5afe1d894b",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 234,
            "height": 156,
            "size": 9.32,
            "sizeInBytes": 9315,
            "url": "/uploads/thumbnail_blog_photo_5afe1d894b.jpg"
          },
          "large": {
            "name": "large_blog-photo.jpg",
            "hash": "large_blog_photo_5afe1d894b",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 1000,
            "height": 667,
            "size": 76.44,
            "sizeInBytes": 76439,
            "url": "/uploads/large_blog_photo_5afe1d894b.jpg"
          },
          "medium": {
            "name": "medium_blog-photo.jpg",
            "hash": "medium_blog_photo_5afe1d894b",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 750,
            "height": 500,
            "size": 50.43,
            "sizeInBytes": 50434,
            "url": "/uploads/medium_blog_photo_5afe1d894b.jpg"
          },
          "small": {
            "name": "small_blog-photo.jpg",
            "hash": "small_blog_photo_5afe1d894b",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "path": null,
            "width": 500,
            "height": 333,
            "size": 28.09,
            "sizeInBytes": 28087,
            "url": "/uploads/small_blog_photo_5afe1d894b.jpg"
          }
        },
        "hash": "blog_photo_5afe1d894b",
        "ext": ".jpg",
        "mime": "image/jpeg",
        "size": 202.82,
        "url": "/uploads/blog_photo_5afe1d894b.jpg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "createdAt": "2026-09-08T05:45:19.894Z",
        "updatedAt": "2026-09-08T05:45:19.894Z",
        "publishedAt": "2026-09-08T05:45:19.894Z"
      }
    },
    "workflow": {
      "id": 98,
      "eyebrow": "WORKFLOW",
      "heading": "Research Process",
      "subheading": "Our proven research process combines strategic planning, precise data collection, rigorous analysis, and actionable reporting to deliver reliable insights that support confident business decisions and measurable growth.",
      "theme": "light",
      "anchorId": null,
      "steps": [
        {
          "order": 0,
          "id": 389,
          "stepNumber": "01",
          "title": "Discover Your Objectives",
          "description": "Aligning research goals, target audience, and business context to establish clear project milestones.",
          "iconIdentifier": "inspection",
          "icon": {
            "id": 62,
            "documentId": "ux1i9n9kio1jdy6bpkq4275u",
            "name": "process-clipboard-tick.svg",
            "alternativeText": null,
            "caption": null,
            "focalPoint": null,
            "width": 24,
            "height": 24,
            "formats": null,
            "hash": "process_clipboard_tick_163f70e35c",
            "ext": ".svg",
            "mime": "image/svg+xml",
            "size": 0.81,
            "url": "/uploads/process_clipboard_tick_163f70e35c.svg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2026-09-10T10:48:51.419Z",
            "updatedAt": "2026-09-10T10:48:51.419Z",
            "publishedAt": "2026-09-10T10:48:51.419Z"
          }
        },
        {
          "order": 1,
          "id": 390,
          "stepNumber": "02",
          "title": "Design the Research",
          "description": "Carefully designing research methodologies to deliver reliable, actionable, and impactful results.",
          "iconIdentifier": "discovery",
          "icon": {
            "id": 63,
            "documentId": "ibguou827p55neupcuulieak",
            "name": "process-brush.svg",
            "alternativeText": null,
            "caption": null,
            "focalPoint": null,
            "width": 70,
            "height": 70,
            "formats": null,
            "hash": "process_brush_4eb7a168ba",
            "ext": ".svg",
            "mime": "image/svg+xml",
            "size": 1.96,
            "url": "/uploads/process_brush_4eb7a168ba.svg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2026-09-10T10:48:51.481Z",
            "updatedAt": "2026-09-10T10:48:51.481Z",
            "publishedAt": "2026-09-10T10:48:51.482Z"
          }
        },
        {
          "order": 2,
          "id": 391,
          "stepNumber": "03",
          "title": "Collect Quality Data",
          "description": "Gathering accurate, reliable data from trusted sources for meaningful business insights.",
          "iconIdentifier": "decode",
          "icon": {
            "id": 64,
            "documentId": "pi2gfirllvszev77vm6ip4bp",
            "name": "process-presentation-chart.svg",
            "alternativeText": null,
            "caption": null,
            "focalPoint": null,
            "width": 70,
            "height": 70,
            "formats": null,
            "hash": "process_presentation_chart_a7b1453e99",
            "ext": ".svg",
            "mime": "image/svg+xml",
            "size": 1.27,
            "url": "/uploads/process_presentation_chart_a7b1453e99.svg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2026-09-10T10:48:51.541Z",
            "updatedAt": "2026-09-10T10:48:51.541Z",
            "publishedAt": "2026-09-10T10:48:51.542Z"
          }
        },
        {
          "order": 3,
          "id": 392,
          "stepNumber": "04",
          "title": "Analyze & Validate",
          "description": "Transforming raw data into accurate, validated insights for confident business decisions.",
          "iconIdentifier": "timing",
          "icon": {
            "id": 65,
            "documentId": "sf7m926fjdbcbdfkn64cujye",
            "name": "process-chart.svg",
            "alternativeText": null,
            "caption": null,
            "focalPoint": null,
            "width": 70,
            "height": 70,
            "formats": null,
            "hash": "process_chart_2696286093",
            "ext": ".svg",
            "mime": "image/svg+xml",
            "size": 1.11,
            "url": "/uploads/process_chart_2696286093.svg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2026-09-10T10:48:51.605Z",
            "updatedAt": "2026-09-10T10:48:51.605Z",
            "publishedAt": "2026-09-10T10:48:51.605Z"
          }
        }
      ]
    }
  },
  "meta": {}
} as unknown as StrapiServicesPageResponse;
