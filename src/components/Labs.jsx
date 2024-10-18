import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

// Lab data with location, address, and cost
const labData = [
  {
    img: "/src/assets/img/lab1.jpg",
    name: "DNA Labs India",
    address: "101, 1st Floor, Shiv Sagar Estate, Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018",
    cost: "₹8400 - Whole Exome Sequencing (WES)",
    location: [18.9945, 72.8151], // Map coordinates
  },
  {
    img: "/src/assets/img/lab2.jpg",
    name: "Lifecare Diagnostics",
    address: "1st Floor, Nirman Kendra, Famous Studio Lane, Dr. E Moses Road, Mahalaxmi, Mumbai, Maharashtra 400011",
    cost: "₹8299 - Health Genomics",
    location: [18.9933, 72.8225],
  },
  {
    img: "/src/assets/img/lab3.jpg",
    name: "MedGenome",
    address: "A-102, Phoenix House, Phoenix Mills Compound, Lower Parel, Mumbai, Maharashtra 400013",
    cost: "₹8200 - Whole Exome Sequencing (WES)",
    location: [18.9935, 72.8295],
  },
  {
    img: "/src/assets/img/lab4.jpg",
    name: "BAUFICI Genetics Laboratory",
    address: "4th Floor, East Wing, Lotus Corporate Park, Goregaon East, Mumbai, Maharashtra 400063",
    cost: "₹8399 - Preimplantation Genetic Testing (PGT)",
    location: [19.1642, 72.8495],
  },
  {
    img: "/src/assets/img/lab5.jpg",
    name: "Scigenomics",
    address: "A-1902, 19th Floor, Lodha Bellissimo, N M Joshi Marg, Mahalaxmi, Mumbai, Maharashtra 400011",
    cost: "₹8999 - Whole Genome Testing",
    location: [18.9878, 72.8323],
  },
];

const Labs = () => {
  const slider = useRef(null);
  const [hoveredLab, setHoveredLab] = useState(null); // Track hovered lab

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Labs
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Find trusted diagnostic labs near you. Hover over each lab to see its location on the map.
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <Slider ref={slider} {...settings}>
          {labData.map((lab, index) => (
            <div
              key={index}
              className="h-[450px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer relative"
              onMouseEnter={() => setHoveredLab(index)}
              onMouseLeave={() => setHoveredLab(null)}
            >
              <div className="h-56 relative transition-opacity duration-500">
                {hoveredLab === index ? (
                  <div className="opacity-0 transition-opacity duration-500 hover:opacity-100">
                    <MapContainer
                      center={lab.location}
                      zoom={13}
                      scrollWheelZoom={false}
                      className="h-56 rounded-t-xl"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={lab.location}>
                        <Popup>{lab.name}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                ) : (
                  <img
                    src={lab.img}
                    alt="lab"
                    className="h-full w-full object-cover rounded-t-xl transition-opacity duration-500 hover:opacity-50"
                  />
                )}
              </div>
              <div className="p-4 flex flex-col justify-center items-center">
                <h1 className="font-semibold text-xl">{lab.name}</h1>
                <p className="text-sm text-gray-600">{lab.address}</p>
                <p className="text-sm text-gray-600 mb-4">{lab.cost}</p>
                <button className="bg-[#00b894] text-white px-4 py-2 rounded-lg">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Labs;
