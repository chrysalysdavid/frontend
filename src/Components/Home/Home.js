import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import "../Styles/Styles.scss";
import red from "../../assets/revo_Small.jpg";
import cube from "../../assets/chrylys/cube 12a.jpg";
import { useNavigate } from "react-router-dom";
import {
  getOurCollection,
  getSectionListOne,
  getSectionListtwo,
  artistByHome,
} from "../../Services/apiservice";

import img1 from "../../assets/Carousal/download (1).png";
import img2 from "../../assets/Carousal/download (2).png";
import img3 from "../../assets/Carousal/download (3).png";
import img4 from "../../assets/Carousal/download (4).png";
import img5 from "../../assets/Carousal/download (5).png";
import img6 from "../../assets/Carousal/download (6).png";
import frame from "../../assets/Frame.png";

const API_URL = "https://web-production-e9268.up.railway.app/api/v1";

export default function Home() {
  const images = [img1, img2, img3, img4, img5, img6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [ourCollection, setOurCollection] = useState([]);
  const [sectionOneList, setSectionOne] = useState([]);
  const [sectionTwoList, setSectionTwo] = useState([]);
  const [rotateSection, setrotateSection] = useState([]);
  // const []
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/arts/art_category_list/`);
        // Only take the first four categories
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching art categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   const fetchArts = async () => {
  //     try {
  //       const artData = await getArtList();
  //       console.log("Art Data:", artData); // Log the artist data
  //       setArtImages(artData); // Set artist data in state
  //     } catch (error) {
  //       console.error("Error fetching artist profiles:", error);
  //     } finally {
  //       setLoading(false); // Stop loading after data is fetched
  //     }
  //   };

  //   fetchArts();
  // }, []);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const rotateImages = await artistByHome();
        const featuredArts =
          Array.isArray(rotateImages) && rotateImages.length > 0
            ? rotateImages[0].featured_arts
            : rotateImages.featured_arts;
        console.log("Our rotate section:", rotateImages);
        setrotateSection(featuredArts || []); // Ensure featured_arts is an array // Assumes ourCollectionData has featured_arts
      } catch (error) {
        console.error("Error fetching artist profiles:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    };
    fetchArts();
  }, []);
  useEffect(() => {
    const fetchArts = async () => {
      try {
        const ourCollectionData = await getOurCollection();
        const featuredArts =
          Array.isArray(ourCollectionData) && ourCollectionData.length > 0
            ? ourCollectionData[0].category
            : ourCollectionData.category;
        console.log("Our collection:", featuredArts);
        setOurCollection(featuredArts || []); // Ensure featured_arts is an array // Assumes ourCollectionData has featured_arts
      } catch (error) {
        console.error("Error fetching artist profiles:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    };
    fetchArts();
  }, []);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const sectionOne = await getSectionListOne();
        console.log("section one list:", sectionOne);

        // Check if sectionOne is an array and has elements
        const featuredArts =
          Array.isArray(sectionOne) && sectionOne.length > 0
            ? sectionOne[0].featured_arts
            : sectionOne.featured_arts;

        console.log("featured arts:", featuredArts);
        setSectionOne(featuredArts || []); // set section data or empty array if not available
      } catch (error) {
        console.error("Error fetching artist profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, []);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const sectionTwo = await getSectionListtwo();
        console.log("section two list:", sectionTwo);

        // Check if sectionOne is an array and has elements
        const featuredArts =
          Array.isArray(sectionTwo) && sectionTwo.length > 0
            ? sectionTwo[0].featured_arts
            : sectionTwo.featured_arts;

        console.log("featured arts:", featuredArts);
        setSectionTwo(featuredArts || []);
      } catch (error) {
        console.error("Error fetching artist profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (id, e) => {
    e.preventDefault();
    console.log("Category ID:", id);
    navigate(`/categories/${id}`);
  };

  return (
    <>
      <div className="container e-con title_padd d-flex">
        <div className="SliderImgg shadow-lg">
          <div className="frame-overlay z-1"></div>
          <div className="home-carosal-container z-0">
            <div className="carosal-image overflow-hidden">
              {rotateSection.map((image, index) => (
                <img
                  key={index}
                  src={
                    image.images.find((img) => img.thumbnail === true)
                      ?.image_url || ""
                  }
                  alt={`Carousel ${index + 1}`}
                  className={` img-fluid ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-center pt-4">
          <div className="text-content w-100 w-lg-50 w-sm-100">
            <h1 className="font-fam fs-2 fw-light">ART MADE BY HUMANS...</h1>
            <p>
              Welcome to the world of Chrysalys! All art from the Chrysalys
              collections is made by humans. No artificial intelligence or
              sweeteners. No additives. No algorithms.
            </p>

            <h2 className="font-fam fs-2 fw-light">EXPLORE</h2>
            <p>
              Often labeled surreal, as curators, we see our aesthetic as less
              about adjectives and more about verbs: we explore and wonder,
              reflect and transform. We curate with a discerning eye – please
              explore the galleries below.
            </p>

            <h2 className="font-fam fs-2 fw-light">OUR COMMITMENT</h2>
            <p>
              13% of all Chrysalys art sales go to Earthtopia, our partner
              climate justice nonprofit. Together, we envision a world where
              creatives and collectors are empowered to care for the earth, each
              other, and everyone who calls our planet home.
            </p>
          </div>

          <div className="image-container rounded-3 w-100 w-lg-50 w-sm-100">
            <div className="rounded-2 overflow-hidden">
              <img
                src={cube}
                className="img-fluid rounded-3"
                alt="Chrysalys Cube"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="bgborder Home-Dot-line"></div>
      </div>
      <div className="container-fluid e-con collection mb-5">
        <div className="px-0 px-sm-0 px-md-4 px-lg-0">
          <h1 className="title2 pl-0">Our Collection</h1>

          {/* First Row */}
          <div className="d-flex justify-content-between mb-4 Home_gap mobile_screenHome">
            {ourCollection.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className={`imgCol bg${index + 1} rounded-3`}
                style={{
                  position: "relative",
                }}
                onClick={(e) => handleImageClick(item.id, e)}
              >
                <img
                  src={item?.images}
                  className="img-fluid zoomable-image"
                  alt=""
                />
                <div className="overlay">
                  <h2 className="overlay-title">{item?.name}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="d-flex justify-content-between Home_gap mobile_screenHome">
            {ourCollection.slice(2, 4).map((item, index) => (
              <div
                key={index + 2}
                className={`imgCol bg${index + 3} rounded-3`}
                style={{
                  position: "relative",
                }}
                onClick={(e) => handleImageClick(item.id, e)}
              >
                <img
                  src={item.images}
                  className="img-fluid zoomable-image"
                  alt=""
                />
                <div className="overlay">
                  <h2 className="overlay-title">{item.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex my-1 my-sm-1 my-md-4">
          <div
            className="imgCol rounded-3"
            onClick={(e) =>
              handleImageClick(
                categories.find((category) => category.name === "Open Editions")
                  ?.id,
                e
              )
            }
          >
            <img
              src={
                categories.find((category) => category.name === "Open Editions")
                  ?.images || red
              }
              className="img-fluid zoomable-image"
              alt="Red dot"
            />

            <div className="overlays">
              <h2 className="overlay-title ">Open Editions</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex my-4">
        <div className="bgborder Home-Dot-line"></div>
      </div>
    </>
  );
}
