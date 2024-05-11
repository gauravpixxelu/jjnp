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
        image: '/category/category2.png',
        link: '/category2',
    },
    {
        id: 3,        
        image: '/category/category3.png',
        link: '/category3',
    },
    {
        id: 4,
        image: '/category/category4.png',
        link: '/category4',
    }
];

const Categories = () => {
    return (
        <section className="relative m-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {categories.map((category, index) => (
                    <div key={index} className="relative">
                        <img className="w-full" src={category.image} alt="category" />
                        <div className="absolute bottom-20 text-center w-full">
                            {/* <h3 className="text-white text-[28px] font-bold">{category.title}</h3> */}
                            <Link className="mt-4 inline-block bg-white text-black font-normal px-8 py-4 uppercase text-[14px]" to={category.link}>Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
