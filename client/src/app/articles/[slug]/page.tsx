import React from "react";
import qs from "qs";

import { draftMode } from "next/headers";
import { Metadata } from "next";
import { formatDate, getStrapiURL } from "@/lib/utils";
import { StrapiImage } from "@/components/strapi-image";
import { notFound } from "next/navigation";
import { RichText } from "@/components/blocks/rich-text";
import { Block } from "@/types";

async function loader(slug: string, status?: string) {
  const { fetchData } = await import("@/lib/fetch");
  const path = "/api/articles";
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      cover: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["name"],
      },
      blocks: {
        on: {
          "shared.rich-text": {
            fields: ["body"],
          },
        },
      },
    },
    filters: {
      slug: { $eq: slug },
    },
    status: status,
  });

  const data = await fetchData(url.href);
  console.dir(data, { depth: null });
  return data;
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";
  const slug = resolvedParams.slug;

  const data = await loader(slug, status as string);
  const post = data?.data[0];

  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
  };
}

function BlockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "shared.rich-text":
      return <RichText key={index} {...block} />;
    default:
      return null;
  }
}

export default async function SinglePost(props: Props) {
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";

  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const data = await loader(slug, status as string);
  const post = data?.data[0];
  const blocks = post?.blocks;

  if (!post) return notFound();

  return (
    <article>
      <div>
        <header className="container mx-auto my-10">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-5xl mb-4">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on {formatDate(post.publishedAt)} - {post.category.text}
          </p>
          <StrapiImage
            src={post.cover.url}
            alt={post.cover.alternativeText}
            width={800}
            height={600}
            priority
            className="w-full rounded-lg mt-8"
          />
        </header>
      </div>

      <div className="container mx-auto max-w-4xl text-base leading-7">
        <RichText body={post.description} />
      </div>
      <div className="container mx-auto max-w-4xl text-base leading-7">
        {blocks ? blocks.map((block: any, index: number) => BlockRenderer(block, index)) : null}
      </div>
    </article>
  );
}
