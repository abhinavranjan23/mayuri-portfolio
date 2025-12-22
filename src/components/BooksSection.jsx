import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BooksSection.css';

// Import Book Covers
import book1 from '../assets/Book/She-Swiped-Right-Into-My-Heart-Sudeep-Nagarkar-Buy-Online-Bookbins-.png';
import book2 from '../assets/Book/our-impossible-love.jpg';
import book3 from '../assets/Book/the-palace-of-illusions.jpg';
import book4 from '../assets/Book/theKiteRunner.jpg';

gsap.registerPlugin(ScrollTrigger);

const books = [
  {
    id: 1,
    title: "She Swiped Right into My Heart",
    author: "Sudeep Nagarkar",
    cover: book1,
    color: "#f9f3f3ff" // Fallback/Spine color
  },
  {
    id: 2,
    title: "Our Impossible Love",
    author: "Durjoy Datta",
    cover: book2,
    color: "#d1210de6"
  },
  {
    id: 3,
    title: "The Palace of Illusions",
    author: "Chitra Banerjee Divakaruni",
    cover: book3,
    color: "#469047ff"
  },
  {
    id: 4,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    cover: book4,
    color: "#89c4ebff"
  }
];

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
        {books.map((book) => (
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
