import { useState, useEffect } from "react";
import styles from "./BookCard.module.css";

export function BookCard({ isbn, label = "Currently Reading" }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
      { signal: controller.signal },
    )
      .then((r) => r.json())
      .then((data) => {
        const entry = data[`ISBN:${isbn}`];
        if (entry) setBook(entry);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("BookCard fetch failed:", err);
      });

    return () => controller.abort();
  }, [isbn]);

  return (
    <>
      <b>{label}</b>
      {book && (
        <div className={styles.book}>
          <img
            src={book.cover?.medium}
            alt={book.title}
            className={styles.cover}
          />
          <div className={styles.info}>
            <span className={styles.title}>{book.title}</span>
            {book.subtitle && (
              <span className={styles.subtitle}>{book.subtitle}</span>
            )}
            <span className={styles.author}>{book.authors?.[0]?.name}</span>
          </div>
        </div>
      )}
    </>
  );
}
