import type { FunctionComponent } from "react";
import Link from "next/link";

type Props = {
  author: { id: number; name?: string | null | undefined };
  content?: string | null | undefined;
  id: number;
  title: string;
};

const Post: FunctionComponent<Props> = ({ id, author, content, title }) => (
  <Link href="/post/[id]" as={`/post/${id}`}>
    <a>
      <h2>{title}</h2>
      {author && <small>By {author?.name}</small>}
      <p>{content}</p>
      <style jsx>{`
        a {
          text-decoration: none;
          color: inherit;
          padding: 2rem;
          display: block;
        }
      `}</style>
    </a>
  </Link>
);

export default Post;
