import React, { useEffect, useState, useCallback } from "react";
import "../ArtStyle/Art.scss";
import "../Styles/Styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import './AboveBelow.scss'; // Import the CSS file for the loader

import red from "../../assets/revo_Small.jpg";
import { Link } from "react-router-dom";
import { fetchCategoryById } from "../../Services/apiservice";
import { useParams } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.png";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function AboveBelow() {
  const { categoryID } = useParams();
  const [categoryById, setCategoryById] = useState([]);
  const [error, setError] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryID) {
      // Fetch category by ID
      setIsLoading(true);
      fetchCategoryById(categoryID)
        .then((response) => {
          setCategoryById(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          setError("Error fetching category");
          setIsLoading(false);
        });
    }
  }, [categoryID]);

  // Function to fetch filtered data based on price and sort
  const fetchFilteredData = () => {
    const url = `https://web-production-e9268.up.railway.app/api/v1/arts/art/get_all_arts_list/?min_price=${minPrice}&max_price=${maxPrice}&sort_by=${sortBy}&art_category=${categoryID}`;
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
        setIsLoading(false);
      });
  };

  // Debounced function to fetch filtered data
  const debouncedFetchFilteredData = useCallback(
    debounce(() => {
      fetchFilteredData();
    }, 500), // Adjust the delay as needed
    [minPrice, maxPrice, sortBy, categoryID]
  );

  // Call the debounced function when minPrice, maxPrice, or sortBy changes
  useEffect(() => {
    debouncedFetchFilteredData();
  }, [minPrice, maxPrice, sortBy]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ); // Circular loader
  }

  if (!categoryID) {
    return <div>Error: Category not found</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {categoryID == 1 && (
        <div className="e-con-innerArt">
          <div className="d-flex">
            <div className="w50">
              <h3 className="font-fam titleSize">ABOVE & BELOW</h3>
              <p className="text-left mb-4">
                This series celebrates the natural world. The ethereal earth and
                jewel tones that dominate prints in this series breathe vitality
                and whimsy into the spaces that surround them.
              </p>
            </div>
          </div>
        </div>
      )}
      {categoryID == 2 && (
        <div className="e-con-innerArt">
          <div className="d-flex">
            <div className="w50">
              <h3 className="font-fam titleSize">THE ART OF INSOMNIUS</h3>
              <p className="text-left mb-4">
                Climate crisis themes surface in the post-apocalyptic wastelands
                that characterize this series. Look to its layered landscapes
                for a unique set of on-ramps to introspection and contemplation.
                Insomnius asks viewers to question what they see, what they
                don't see, and why.
              </p>
            </div>
          </div>
        </div>
      )}
      {categoryID == 3 && (
        <div className="e-con-innerArt">
          <div className="d-flex">
            <div className="w50">
              <h3 className="font-fam titleSize">Abstract</h3>
              <p className="text-left mb-4">
                Make a bold statement with color, form, and texture. Available
                in a variety of palettes and moods, a print from our Abstract
                series brings new and dynamic energy to your space.
              </p>
            </div>
          </div>
        </div>
      )}
      {categoryID == 4 && (
        <div className="e-con-innerArt">
          <div className="d-flex">
            <div className="w50">
              <h3 className="font-fam titleSize">Exclusive Works</h3>
            </div>
          </div>
        </div>
      )}
      {categoryID == 5 && (
        <div className="e-con-innerArt">
          <div className="d-flex">
            <div className="w50">
              <h3 className="font-fam titleSize">Open Editions</h3>
              <p className="text-left mb-4">
                Rather than limited editions where there is a limited supply,
                these works are offered at a lower price as we do not limit
                production.
              </p>
            </div>
          </div>
        </div>
      )}
      {categoryID == 6 && (
        <div className="e-con-innerArt">
          <div className="d-flex">
            <div className="w50">
              <h3 className="font-fam titleSize">Forma Gym</h3>
              <p className="text-left mb-4">
                This series celebrates the natural world. The ethereal earth and
                jewel tones that dominate prints in this series breathe vitality
                and whimsy into the spaces that surround them.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex">
        <div className="bgborder Art-Dot-line"></div>
      </div>
      <div className="containerArt">
        <div className="filters-sidebar w-sm-100 w-md-25 pe-md-3 px-3 px-md-0">
          <div className="shadow-sm border p-3 rounded">
            {/* Collapsible Header */}
            <div
              className="d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <h4 className="font-fam mb-0">Filters</h4>
              <div style={{ cursor: "pointer" }}>
                {isCollapsed ? (
                  <FiChevronDown size={24} />
                ) : (
                  <FiChevronUp size={24} />
                )}
              </div>
            </div>

            {/* Collapsible Content */}
            <div
              className={`mt-4 collapse-content ${!isCollapsed ? "show" : ""}`}
              id="filtersCollapse"
              style={{
                maxHeight: isCollapsed ? "0px" : "500px", // Change this max-height as needed
                opacity: isCollapsed ? "0" : "1",
                transition:
                  "max-height 0.7s ease-in-out, opacity 0.5s ease-in-out",
                overflow: "hidden",
              }}
            >
              {/* Sort Options */}
              <div className="mb-4">
                <h5 className="mb-3">Sort By</h5>
                <select 
                  className="form-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="highest_price">Price: High to Low</option>
                  <option value="lowest_price">Price: Low to High</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <h5 className="mb-3">Price Range</h5>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="vr"></div>
        <div className="d-flex justify-content-center w-100 w-sm-100 w-lg-75">
          <div className="row m-0 p-0 w-100">
            {data.map((item, index) => (
              <div className="col-6 col-lg-6 mb-4" key={index}>
                <Link
                  to={`/productDetail`}
                  onClick={() =>
                    localStorage.setItem("selectedImageId", item.id)
                  }
                >
                  <div className="gallery-item">
                    <div className="prodimg">
                      <img
                        src={
                          item.images.find((img) => img.thumbnail === true)
                            ?.image_url || placeholderImage
                        }
                        alt={item.title || "Product image"}
                        className="img-fluid"
                      />
                    </div>
                    <div className="item-details">
                      <div className="author">
                        by{" "}
                        <span className="text-primarygreen text-uppercase">
                          {item.created_by.username}
                        </span>
                      </div>
                      <div className="title3 mt-3">{item.title}</div>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={regularStar}
                            className="Star"
                            size="1x"
                          />
                        ))}
                      </div>
                      <div className="price mt-1">$567.00 - $670.00</div>
                      <button className="select-options btn btn-dark">
                        SELECT OPTIONS
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex my-4">
        <div className="bgborder Art-Dot-line"></div>
      </div>
      <div className="d-flex my-4">
        <img src={red} className="Red" alt="Red dot" />
      </div>
      <div className="d-flex my-4">
        <div className="bgborder Art-Dot-line"></div>
      </div>
    </>
  );
}

// import { useParams } from "react-router-dom";

// const AboveBelow = () => {
//   const { categoryId } = useParams();

//   // Use categoryId as needed
//   return (
//     <div>
//       <h1>Category ID: {categoryId}</h1>
//       {/* Other content */}
//     </div>
//   );
// };

// export default AboveBelow;
