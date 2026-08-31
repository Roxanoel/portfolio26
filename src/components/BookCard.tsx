import { useState, useEffect } from "react";
import styles from "./BookCard.module.css";

interface Book {
  title: string;
  subtitle: string | null;
  author: string | null;
  coverUrl: string;
}

interface BookCardProps {
  isbn: string;
  label?: string;
}

export function BookCard({ isbn, label = "Currently Reading" }: BookCardProps) {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const opts = { signal: controller.signal };

    Promise.all([
      fetch(`https://openlibrary.org/isbn/${isbn}.json`, opts).then((r) =>
        r.json(),
      ),
      fetch(
        `https://openlibrary.org/search.json?isbn=${isbn}&fields=author_name`,
        opts,
      ).then((r) => r.json()),
    ])
      .then(([edition, search]) => {
        setBook({
          title: edition.title,
          subtitle: edition.subtitle ?? null,
          author: search.docs?.[0]?.author_name?.[0] ?? null,
          coverUrl: edition.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${edition.covers[0]}-M.jpg`
            : `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError")
          console.error("BookCard fetch failed:", err);
      });

    return () => controller.abort();
  }, [isbn]);

  return (
    <>
      <b>{label}</b>
      {book && (
        <div className={styles.book}>
          <img
            src={book.coverUrl}
            alt={book.title}
            className={styles.cover}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.info}>
            <span className={styles.title}>{book.title}</span>
            {book.subtitle && (
              <span className={styles.subtitle}>{book.subtitle}</span>
            )}
            {book.author && (
              <span className={styles.author}>{book.author}</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
