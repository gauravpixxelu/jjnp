import React from "react";
import { Link } from "react-router-dom";
import './Styles.css';

const services = [
    {
        id: 1,
        image: '/services/service3.jpg',
        title: 'Personalization',
        text: 'Emboss select bags, luggage, belts, leather accessories, and items from the pet’s collection with initials to create a truly unique piece.',
        button: 'Discover The Collection',
        link: '/category1',
    },
    {
        id: 2,
        image: '/services/service1.jpg',
        title: 'Packaging',
        text: 'Choose our online exclusive tote or add a gift message at checkout to enjoy the boutique shopping bag.',
        button: 'Explore JJNP’s Packaging',
        link: '/category2',
    },
    {
        id: 3,
        image: '/services/service2.jpg',
        title: 'Collect in store',
        text: 'Order online and collect your order from your preferred Gucci boutique.',
        button: 'Discover How',
        link: '/category3',
    }
];

const Services = () => {
    return (
        <section className="relative px-4 pt-4 pb-4 lg:px-8 lg:pt-16 lg:pb-12">
            <h2 className="text-center text-4xl font-normal mb-4 lg:mb-8">
                JJPN’s Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="relative">
                        <img className="w-full mb-4 inline-block" src={service.image} alt="category" />
                        <div className="bottom-20 w-full">
                            <h3 className="text-black text-[24px] font-normal mb-1.5">{service.title}</h3>
                            <p className="text-gray-700 text-[14px] font-light min-h-10">{service.text}</p>
                            <Link className="mt-4 inline-block text-black font-normal uppercase underline underline-offset-4 text-[14px]" to={service.link}>{service.button}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
