import type { Block } from "@/types";

import { Hero } from "@/components/blocks/hero";
import { SectionHeading } from "@/components/blocks/section-heading";
import { ContentWithImage } from "@/components/blocks/content-with-image";
import { Pricing } from "@/components/blocks/pricing";
import { CardCarousel } from "@/components/blocks/card-carousel";

async function loader() {
  // TODO: you can fetch data from strapi here
  return mockHomeData;
}

function BlockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} {...block} />;
    case "layout.card-grid":
      return <CardCarousel key={index} {...block} />;
    case "layout.section-heading":
      return <SectionHeading key={index} {...block} />;
    case "layout.content-with-image":
      return <ContentWithImage key={index} {...block} />;
    case "layout.price-grid":
      return <Pricing key={index} {...block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const data = await loader();
  const blocks = data?.data?.blocks;
  if (!blocks) return null;
  return (
    <div>
      {blocks ? blocks.map((block: any, index: number) => BlockRenderer(block, index)) : null}
    </div>
  );
}

const mockHomeData = {
  data: {
    id: 8,
    documentId: "l6etcff49lp5c1v21lpv3vwd",
    title: "Landing Page",
    description: "This is the main landing page.",
    createdAt: "2024-06-26T21:20:11.954Z",
    updatedAt: "2024-08-20T15:23:35.634Z",
    publishedAt: "2024-08-20T15:23:35.648Z",
    blocks: [
      {
        __component: "layout.hero",
        id: 14,
        heading: "Next.js 15 and Strapi 5 Starter Project",
        text: "Give Strapi 5 and Next.js a spin with this starter project.  Feel free to clone the repo and use it for any of your needs.",
        image: {
          id: 17,
          documentId: "sg6vq9j5il16fl8y38dob4c8",
          url: "/uploads/coffee_beans_204b6e4e5a.jpeg",
          alternativeText: null,
          name: "strapi-dashboard.png",
        },
        buttonLink: [
          {
            id: 106,
            href: "https://strapi.io/five",
            text: "Strapi 5",
            isExternal: true,
            isPrimary: false,
          },
          {
            id: 107,
            href: "https://docs-next.strapi.io/dev-docs/whats-new",
            text: "Strapi 5 Docs",
            isExternal: true,
            isPrimary: true,
          },
        ],
        topLink: {
          id: 105,
          href: "https://github.com/PaulBratslavsky/strapi-5-next-js-starter-project",
          text: "GitHub Project Repo",
          isExternal: true,
          isPrimary: false,
        },
      },
      {
        __component: "layout.section-heading",
        id: 15,
        subHeading: "Strapi 5 Features",
        heading: "Build fast and stay flexible",
        text: "Strapi 5 brings many new features and improvements.\n",
      },
      {
        __component: "layout.card-grid",
        id: 14,
        cardItems: [
          {
            id: 40,
            icon: "Frame",
            heading: "DRAFT & PUBLISH",
            text: "Reduce the risk of publishing errors and streamline collaboration.",
          },
          {
            id: 41,
            icon: "Download",
            heading: "CONTENT HISTORY",
            text: "Overcome the risks of data loss, inefficiency, and workflow disruption.",
          },
          {
            id: 42,
            icon: "Globe",
            heading: "100% TYPESCRIPT",
            text: "Easier bug detection, and a smoother collaborative environment.",
          },
        ],
      },
      {
        __component: "layout.content-with-image",
        id: 15,
        heading: "Designed to build fast",
        subHeading: "BUILD FAST",
        text: "Strapi is designed to be highly customizable out of the box, allowing you to build and manage content APIs quickly without having to start from scratch. ",
        reverse: true,
        image: {
          id: 17,
          documentId: "sg6vq9j5il16fl8y38dob4c8",
          url: "/uploads/coffee_beans_204b6e4e5a.jpeg",
          alternativeText: null,
          name: "strapi-dashboard.png",
        },
      },
      {
        __component: "layout.content-with-image",
        id: 16,
        heading: "Easy Deployment",
        subHeading: "Strapi Cloud",
        text: "Strapi Cloud takes the hassle out of deploying and yout projects. It provides a managed hosting environment specifically optimized for Strapi, allowing you to deploy easily and quickly. ",
        reverse: false,
        image: {
          id: 16,
          documentId: "snfaonozn0smii9nl04dd1hg",
          url: "/uploads/coffee_beans_204b6e4e5a.jpeg",
          alternativeText: null,
          name: "strapi-cloud.png",
        },
      },
      {
        __component: "layout.section-heading",
        id: 16,
        subHeading: "PRICING",
        heading: "Simple pricing",
        text: "Pricing that fits your needs and helps you scale.",
      },
      {
        __component: "layout.price-grid",
        id: 8,
        priceCard: [
          {
            id: 22,
            selected: false,
            heading: "Developer",
            description: "Perfect for getting started",
            price: "29",
            feature: [
              { id: 155, description: "1 seat" },
              { id: 156, description: "1000 CMS Entries" },
              { id: 157, description: "Built-in Email provider" },
              { id: 158, description: "Database and File Storage" },
              { id: 159, description: "Real-time logs" },
              { id: 160, description: "Email / In App Notifications" },
              { id: 161, description: "Free Trial (14 days)" },
            ],
            link: {
              id: 108,
              href: "https://strapi.io/cloud",
              text: "Get started",
              isExternal: true,
              isPrimary: true,
            },
          },
          {
            id: 23,
            selected: true,
            heading: "Pro",
            description: "For startups and small to medium businesses\n\n",
            price: "99",
            feature: [
              {
                id: 162,
                description: "Everything in Developer, plus...",
              },
              { id: 163, description: "5 Seats" },
              { id: 164, description: "100,000 CMS Entries" },
              {
                id: 165,
                description: "Higher storage & bandwidth limits",
              },
              { id: 166, description: "Automatic Backups" },
              { id: 167, description: "Free Trial (14 days)" },
            ],
            link: {
              id: 109,
              href: "https://strapi.io/cloud",
              text: "Get started",
              isExternal: true,
              isPrimary: true,
            },
          },
          {
            id: 24,
            selected: false,
            heading: "Teams",
            description: "For large businesses and enetrprises.\n\n",
            price: "499",
            feature: [
              { id: 168, description: "Everything in Pro, plus…" },
              { id: 169, description: "10 Seats" },
              { id: 170, description: "1,000,000 CMS Entries" },
              {
                id: 171,
                description: "Higher storage & bandwidth limits",
              },
              { id: 172, description: "Audit logs (7 days retention)" },
              { id: 173, description: "Review Workflows" },
              { id: 174, description: "Uptime SLA (99.9%)" },
              { id: 175, description: "Releases" },
              { id: 176, description: "Free Trial (14 days)" },
            ],
            link: {
              id: 110,
              href: "https://strapi.io/cloud",
              text: "Get started",
              isExternal: true,
              isPrimary: true,
            },
          },
        ],
      },
    ],
  },
  meta: {},
};
