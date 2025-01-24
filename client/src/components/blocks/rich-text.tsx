import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export function RichText({ body }: { body: string }) {
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
      <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
    </section>
  );
}
