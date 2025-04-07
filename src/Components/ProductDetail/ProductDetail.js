import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductDetail.scss";
import "../Styles/Styles.scss";
import Frame from "../../assets/Frame.jpeg";
import img2 from "../../assets/chrylys/Ibis-mockup.png";
import img3 from "../../assets/chrylys/Ibis-thum-1.png";
import img4 from "../../assets/chrylys/Ibis-thum-2.png";
import expres from "../../assets/express.svg";
import discover from "../../assets/discover.svg";
import ReactImageMagnify from "react-image-magnify";

export default function ProductDetail() {
  const [name, setName] = useState(""); // State for name
  const [size, setSize] = useState(""); // State for size
  const [variationPrice, setVariationPrice] = useState("");
  const [artDetails, setArtDetails] = useState(null); // State to store art details
  const [artVarition, setArtVariation] = useState([]);
  const [artFrames, setArtFrames] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndexSize, setSelectedIndexSize] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [value, setValue] = useState(1);
  const [startIndex, setStartIndex] = useState(0); // Starting index for thumbnails
  const navigate = useNavigate();

  const THUMBNAILS_VISIBLE = 4; // Number of thumbnails visible at once

  const handleNext = () => {
    if (startIndex + THUMBNAILS_VISIBLE < artDetails.images.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle the prev button click
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };
  const totalPrice = (
    Number(variationPrice?.regular_price || 0) +
    Number(selectedPrice?.price || 0)
  ).toFixed(2);
  
  // Disable the button if the total price is zero or invalid
  const isAddToCartDisabled = totalPrice <= 0 || isNaN(totalPrice);
  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };
  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1)); // Prevent value going below 1
  };
  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); // Update the main image when a thumbnail is clicked
  };
  const handleFrameChange = (frame) => {
    // Create a price object that contains the effective price (sale price if available, otherwise regular price)
    setSelectedFrame(frame.id);
    const framePrice = {
      price: frame.sale_price || frame.regular_price,
    };
    setSelectedPrice(framePrice);
  };
  const handleButtonClick = (index, n) => {
    setName(n);
    setSelectedIndex(index); // Update the selected index
  };
  const handleButtonClickSize = (index, s) => {
    debugger;
    let sizeLabel = s.split(" ")[0];
    if (sizeLabel == "Small") {
      sizeLabel = "small";
    } else if (sizeLabel == "Large") {
      sizeLabel = "large";
    } else if (sizeLabel == "Medium") {
      sizeLabel = "medium";
    } else {
      sizeLabel = 4;
    }
    setSize(s);
    fetchArtFrames(sizeLabel);
    setSelectedIndexSize(index); // Update the selected index
  };
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You have to login first to proceed."); // Popup message for login requirement
        return; // Exit the function if no token is found
    }
    const productId = localStorage.getItem("selectedImageId");
    const payload = {
      items: [
        {
          product_id: productId,
          quantity: value,
          product_amount: (
            parseFloat(variationPrice?.regular_price || 0) +
            parseFloat(selectedPrice?.price || 0)
          ),
          product_details: {
            variation_id: variationPrice?.id || null,
            frame_id: selectedFrame || null,
          },
        },
      ],
    };

    try {
      const response = await fetch(
        "https://web-production-e9268.up.railway.app/api/v1/payment/cart/add-products-to-cart/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const cartId = data.cart_id;
        if (cartId) {
          localStorage.setItem("cart_id", cartId);
          console.log("Cart ID stored in local storage:", cartId);

          // Navigate after storing cart_id
          navigate("/Cartpage");
        } else {
          console.error("Cart ID not found in the response");
        }

        console.log("Product added to cart successfully");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const fetchArtFrames = async (val) => {
    const id = localStorage.getItem("selectedImageId"); // Retrieve the ID from local storage
    if (id) {
      try {
        const response = await fetch(
          `https://web-production-e9268.up.railway.app/api/v1/arts/art_frame/?size_category=${val}`
        );
        const data = await response.json();
        setArtFrames(data); // Update state with fetched art details
        console.log("Frames", data);
      } catch (error) {
        console.error("Error fetching art details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    } else {
      setLoading(false); // Set loading to false if no ID is found
    }
  };
  // fetchArtFrames();
  React.useEffect(() => {
    // Combine values and call checkVariation when both are set
    if (name && size) {
      const combined = `${name} x ${size}`;
      console.log("Combined:", combined);
      checkVariation(combined);
    }
  }, [name, size]); // Runs whenever name or size changes
  function checkVariation(param) {
    if (artDetails && Array.isArray(artDetails.variations_list)) {
      const match = artDetails.variations_list.find(
        (item) => item.variation === param
      );
      console.log("match", match);
      setVariationPrice(match);
      return match ? true : false; // Return true if a match is found
    }
    return false; // Return false if no match or the list is invalid
  }

  useEffect(() => {
    const fetchArtDetails = async () => {
      const id = localStorage.getItem("selectedImageId");
      if (id) {
        try {
          const response = await fetch(
            `https://web-production-e9268.up.railway.app/api/v1/arts/art/get_single_art/?id=${id}`
          );
          const data = await response.json();
          setArtDetails(data); // Update art details
          console.log("Single Art", data);
        } catch (error) {
          console.error("Error fetching art details:", error);
        } finally {
          setLoading(false); // Set loading to false after fetch attempt
        }
      } else {
        setLoading(false);
      }
    };

    const fetchArtVariation = async () => {
      const id = localStorage.getItem("selectedImageId");
      if (id) {
        try {
          const response = await fetch(
            `https://web-production-e9268.up.railway.app/api/v1/arts/art/get_single_art_variations/?art_id=${id}`
          );
          const data = await response.json();
          console.log("check", data);

          // Check if the response is an object with 0 and 1 keys
          if (data && typeof data === "object" && "0" in data && "1" in data) {
            console.log("check1", data);

            // Convert object with numbered keys into an array
            const formattedData = [data[0], data[1]];
            setArtVariation(formattedData); // Update state with formatted data
          } else {
            console.error("Unexpected data format:", data);
            setArtVariation([]); // Fallback to empty array
          }
        } catch (error) {
          console.error("Error fetching art details:", error);
          setArtVariation([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchArtVariation();
    fetchArtDetails();
  }, []); // Fetch art details on component mount

  useEffect(() => {
   if (artDetails?.images?.length > 0) {
    // Find the image where thumbnail is true
    const thumbnailImage = artDetails.images.find(image => image.thumbnail === true);
    
    // Set the main image to the thumbnail image if found, otherwise fallback to the first image
    setMainImage(thumbnailImage ? thumbnailImage.image_url : artDetails.images[0].image_url);
  } else {
    setMainImage(null); // Ensure mainImage is null if no images are available
  }
  }, [artDetails]);

  const renderDescription = () => {
    if (!artDetails?.description) return null;

    const description = artDetails.description.split(/\r?\n/);

    return description.map((line, index) => {
      if (!line.trim()) return null;

      if (line === line.toUpperCase() && line.trim().length > 0) {
        // Heading
        return (
          <h4 key={index} className="mt-4 font-bold">
            {line.trim()}
          </h4>
        );
      } else if (line.endsWith(":")) {
        return (
          <label key={index} className="block  font-semibold">
            {line.trim()}
          </label>
        );
      } else {
        return (
          <p key={index} className="mt-1">
            {line.trim()}
          </p>
        );
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (!artDetails) {
    return <div>No art details found.</div>; // Render if no art details are available
  }
  return (
    <>
      <div className="product_detail ">
        <div className="product-page">
          <div className="product-gallery">
            <ReactImageMagnify
              className="image-magnify"
              {...{
                smallImage: {
                  alt: artDetails.title || "Art",
                  isFluidWidth: true,
                  src: mainImage,
                },
                largeImage: {
                  src: mainImage, // Use the same image or a higher resolution version
                  width: 1200, // Adjust to your needs
                  height: 1800, // Adjust to your needs
                },
                enlargedImageContainerDimensions: {
                  width: "100%", // Adjust magnified width
                  height: "100%", // Adjust magnified height
                },
                isHintEnabled: true, // Optional: Show hint for zoom
              }}
            />

            {/* Thumbnails with Navigation */}
            <div className="thumbnails-wrapper">
              {/* Left Arrow */}
              {startIndex > 0 && (
                <button className="arrow left-arrow" onClick={handlePrev}>
                  &#9664; {/* Left arrow symbol */}
                </button>
              )}

              {/* Thumbnails */}
              <div className="thumbnails">
                {artDetails.images
                  .slice(startIndex, startIndex + THUMBNAILS_VISIBLE)
                  .map((image, index) => (
                    <img
                      key={startIndex + index} // Ensure unique keys for visible images
                      src={image.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail"
                      onClick={() => setMainImage(image.image_url)} // Update main image on click
                    />
                  ))}
              </div>

              {/* Right Arrow */}
              {startIndex + THUMBNAILS_VISIBLE < artDetails.images.length && (
                <button className="arrow right-arrow" onClick={handleNext}>
                  &#9654; {/* Right arrow symbol */}
                </button>
              )}
            </div>
          </div>

          <div className="product-details">
            <h1 className="product-title">{artDetails.title}</h1>
            <div className="author">
              {" "}
              <span className="text-uppercase text-primary">
                BY {artDetails.created_by.username}
              </span>
            </div>
            <div className="product-pricing">
              <p className="price-range">${artDetails.price_range}</p>
            </div>
            <div className="product-options">
              {artVarition[0]?.length > 0 && (
                <div className="d-flex gap-2 mb-2">
                  {artVarition[0].map((size, index) => (
                    <div className="mb-2" key={index}>
                      <button
                        type="button"
                        className={`btn btn-outline-dark f-12 borderrr btn-sm w-100 ${
                          selectedIndex === index ? "selected-button" : ""
                        }`}
                        onClick={() => handleButtonClick(index, size)}
                      >
                        {size}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {artVarition[1]?.length > 0 && (
                <div className="d-flex gap-2 mb-2">
                  {artVarition[1].map((size, index) => (
                    <div className="mb-2" key={index}>
                      <button
                        type="button"
                        className={`btn btn-outline-dark f-12 borderrr btn-sm w-100 ${
                          selectedIndexSize === index ? "selected-button" : ""
                        }`}
                        onClick={() => handleButtonClickSize(index, size)}
                      >
                        {size}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <hr />
            </div>

            <div className="d-flex mb-3">
              <div className="w-40">
                <p className="mb-0">Artwork</p>
                <p className="mb-0">Selected Frame</p>
                <p className="mb-0">
                  <b>Total</b>
                </p>
              </div>
              <div>
                <p className="mb-0">
                  $
                  {variationPrice?.regular_price !== undefined
                    ? variationPrice.regular_price
                    : 0}
                </p>
                <p className="mb-0">
                  $
                  {selectedPrice?.price !== undefined ? selectedPrice.price : 0}
                </p>
                <p className="mb-0">
                  <b>
                    $
                    {(
                      Number(variationPrice?.regular_price || 0) +
                      Number(selectedPrice?.price || 0)
                    ).toFixed(2)}
                  </b>
                </p>
              </div>
            </div>
            <div>
              <p className="f-14">
                Availablity: <span className="textgreen">{artDetails?.total_stock} in Stock</span>
              </p>
            </div>

            <div className="d-flex flex-wrap justify-items-center w-100 framess gap-2 mb-3">
              {artFrames?.map((frame) => (
                <div
                  className={`card w-30 frame-card ${
                    selectedFrame === frame.id ? "active" : ""
                  }`}
                  onClick={() => handleFrameChange(frame)}
                  key={frame.id}
                >
                  <img
                    src={frame.frame_images[0].image_url}
                    className="card-img-top frame-img"
                    alt="frame"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{frame.name}</h5>
                    <p className="card-text">{frame.dimensions}</p>
                    <div className="price-container">
                      {frame.sale_price ? (
                        <>
                          <span className="regular-price text-decoration-line-through me-2">
                            ${frame.regular_price}
                          </span>
                          <span className="sale-price">
                            ${frame.sale_price}
                          </span>
                        </>
                      ) : (
                        <span className="regular-price">
                          ${frame.regular_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex gapi mt-4">
              <div className="d-flex mt-3">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm minus"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  className="form-control cartNo"
                  type="text"
                  value={value}
                  readOnly // Prevent user from manually editing the value
                  aria-label="default input example"
                />
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm plus bggreyy"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <div className="mt-3">
                {/* <Link to={`/Cartpage`}> */}
                <button
                  type="button"
                  className="btn btn-Trand"
                  onClick={addToCart}
                  disabled={isAddToCartDisabled} // Disable the button if total price is zero or invalid
                >
                  Add to Cart
                </button>
                {/* </Link> */}
              </div>
            </div>
            <fieldset className="safe-checkout-fieldset">
              <legend className="safe-checkout-legend">
                Guaranteed Safe Checkout
              </legend>
              <div className="safe-checkout-icons">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Visa"
                  className="payment-icon"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                  alt="MasterCard"
                  className="payment-icon"
                />
                <img
                  src={expres}
                  alt="American Express"
                  className="w-10 transition-transform-3"
                />
                <img
                  src={discover}
                  alt="Discover"
                  className="w-10 transition-transform-3"
                />
              </div>
            </fieldset>
          </div>
        </div>

        <div className="my-5 description-section">
          <hr className="srwr" />
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Additional Information
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Reviews(0){" "}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-disabled-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-disabled"
                type="button"
                role="tab"
                aria-controls="pills-disabled"
                aria-selected="false"
              >
                Artist
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabindex="0"
            >
              {renderDescription()}
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabindex="0"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
              tabindex="0"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="pills-disabled"
              role="tabpanel"
              aria-labelledby="pills-disabled-tab"
              tabindex="0"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
