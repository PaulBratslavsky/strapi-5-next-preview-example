import qs from "qs";
import Link from "next/link";
import { StrapiImage } from "@/components/strapi-image";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "@/components/search";
import { PaginationComponent } from "@/components/pagination";
import { getStrapiURL, formatDate } from "@/lib/utils";
import { CategorySelect } from "@/components/category-select";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
    category?: string;
  };
}

interface PostProps {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  cover: {
    url: string;
    alternativeText: string;
    name: string;
  };
  category: {
    name: string;
  };
}

async function loader(page: number, queryString: string, category: string) {
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
    },
    filters: {
      category: category.length !== 0 ? { name: { $eq: category } } : {},
      $or: [
        { title: { $containsi: queryString } },
        { description: { $containsi: queryString } },
      ],
    },

    pagination: {
      pageSize: 9,
      page: page,
    },
  });
  const data = await fetchData(url.href);
  return data;
}

export default async function BlogRoute({ searchParams }: SearchParamsProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const query = resolvedSearchParams?.query ?? "";
  const category = resolvedSearchParams?.category ?? "";
  const data = await loader(currentPage, query, category);  
  const total = data?.meta.pagination.pageCount;
  const posts = data?.data;
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Articles</span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">Our Blog</h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        Checkout some of our cool articles. We write about the latest trends in tech, design and much more.
      </p>
      <CategorySelect />
      <Search />
      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((item: PostProps) => (
          <Link href={"/articles/" + item.slug} key={item.documentId}>
            <Card className="h-full shadow-lg border-none">
              <CardContent className="flex h-full flex-col items-start gap-5 px-0">
                <div className="relative h-52 w-full">
                  <StrapiImage
                    alt={item.cover.alternativeText}
                    src={item.cover.url}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 px-5">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="mb-auto text-muted-foreground">{item.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full outline outline-1 outline-primary text-primary px-3 py-0.5 text-sm">
                      {item.category.name}
                    </span>
                    <span className="text-sm text-muted-foreground">{formatDate(item.publishedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <PaginationComponent pageCount={total} />
    </section>
  );
}
