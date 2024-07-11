import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Styles.css';

const categories = [
    {
        id: 1,
        image: '/category/category1.png',
    },
    {
        id: 2,
        image: '/category/category2.png',
    },
    {
        id: 3,
        image: '/category/category3.png',
    },
    {
        id: 4,
        image: '/category/category4.png',
    }
];

const Categories = () => {
    const categoryRefs = useRef([]);

    useEffect(() => {
        const options = {
            threshold: 0.5,
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-to-100');
                    observer.unobserve(entry.target);  // Stop observing after the animation
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        categoryRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            categoryRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <section className="relative lg:p-8 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden category-item"
                        ref={el => (categoryRefs.current[index] = el)}
                    >
                        <img className="w-full category-image" src={category.image} alt="category" />
                        <div className="absolute bottom-8 text-center w-full lg:bottom-20 z-10">
                            {/* <Link className="custom-button" to={category.link}>Shop Now</Link> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
