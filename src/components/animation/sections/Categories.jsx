import React from "react";
import { Link } from "react-router-dom";
import './Styles.css';

const categories = [
    {
        id: 1,
        image: '/category/category1.png',
        link: '/category1',
    },
    {
        id: 2,
        image: '/category/category2.jpg',
        link: '/category2',
    },
    {
        id: 3,
        image: '/category/category3.png',
        link: '/category4',
    },
    {
        id: 4,
        image: '/category/category4.png',
        link: '/category4',
    }
];

const Categories = () => {
    return (
        <section className="relative lg:p-8 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-4">
                {categories.map((category, index) => (
                    <div key={index} className="relative">
                        <img className="w-full" src={category.image} alt="category" />
                        <div className="absolute bottom-8 text-center w-full lg:bottom-20">
                            {/* <h3 className="text-white text-[28px] font-bold">{category.title}</h3> */}
                            <Link className="mt-4 inline-block bg-white text-black font-normal px-8 py-2 uppercase text-[14px] lg:px-8 lg:py-4 lg:text-[14px]" to={category.link}>Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
