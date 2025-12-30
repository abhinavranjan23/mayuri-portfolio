import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BooksSection.css';



gsap.registerPlugin(ScrollTrigger);

import { BOOKS_DATA } from '../utils/Constant';

const BooksSection = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".book-container", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 40%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "expoScale"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <div className="books-section" ref={sectionRef}>
      <h2 className="books-title">Books That Shaped My Thinking</h2>
      
      <div className="books-grid">
        {BOOKS_DATA.map((book) => (
          <div key={book.id} className="book-container">
            <div className="book">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
              </div>
              <div className="book-spine" style={{ backgroundColor: book.color }}></div>
              <div className="book-page">
                 <h4>{book.title}</h4>
                 <p>{book.author}</p>
              </div>
              <div className="book-back"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksSection;
