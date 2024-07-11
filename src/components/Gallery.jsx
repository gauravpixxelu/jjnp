import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const data = [
    {
      label: "NEW ARRIVALS",
      value: "new_arrivals",
      images: [
        {
          imageLink:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHByb2R1Y3RzJTIwbHV4dXJ5fGVufDB8fDB8fHww",
          tag: "New Arrival",
          description: "New Arrived T shirt denim blah blah blah",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1613852348851-df1739db8201?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dCUyMHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D",
          tag: "New Arrival",
          description:
            "Men's T-shirts - Buy T-shirts for men online in India. Choose from a wide range of polo, round, V neck & more Men's T-shirts in various designs at Myntra",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1502389614483-e475fc34407e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
          tag: "New Arrival",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1593726891090-b4c6bc09c819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
          tag: "New Arrival",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFja2V0c3xlbnwwfHwwfHx8MA%3D%3D",
          tag: "New Arrival",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1605022600390-071c6f969b32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGphY2tldHN8ZW58MHx8MHx8fDA%3D",
          tag: "New Arrival",
        },
      ],
    },
    {
      label: "CATEGORIES",
      value: "categories",
      images: [
        {
          imageLink:
            "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRzaGlydHN8ZW58MHx8MHx8fDA%3D",
          tag: "T-Shirts",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
          tag: "Men",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
          tag: "Women",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
          tag: "Jeans",
        },
      ],
    },

    {
      label: "COLLECTION",
      value: "collection",
      images: [
        {
          imageLink:
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
        },
        {
          imageLink:
            "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
        },
        {
          imageLink:
            "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
        },
        {
          imageLink:
            "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
        },
      ],
    },
  ];

  return (
    <div>
      <Tabs value="new_arrivals">
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="text-sm lg:text-lg">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className={`grid grid-cols-1 md:gap-1`}>
          {data.map(({ value, images }) => (
            <TabPanel
              className="grid grid-cols-2 gap-1 md:grid-cols-3"
              key={value}
              value={value}
            >
              {images?.map(({ imageLink, tag, description }, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden hover:scale-90 duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <a href="/productList">
                    <img
                      className="w-full object-cover object-center"
                      src={imageLink}
                      alt={`gallery-photo-${index}`}
                    />
                  </a>
                  {tag && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black text-white p-2 opacity-75">
                      {tag}
                    </p>
                  )}
                  {hoveredIndex === index && (
                    <div className=" 	 absolute h-full left-0 right-0 bg-black opacity-90 "></div>
                  )}
                </div>
              ))}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
