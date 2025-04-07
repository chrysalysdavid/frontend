import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; 
import "./AddArt.scss";
import { getArtCategoryList } from "../../Services/apiservice";
import { predefinedTags } from '../../data/predefinedTags';

export default function AddArt() {
  const location = useLocation();
  const { id } = location.state || {}; // Get the id from location.state

  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");
  const [variations, setVariations] = useState([]);
  const [images, setImages] = useState([]);
  const [artimages, setArtImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]); // Combined images
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // State to hold selected category ID
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserId] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState(""); // State to store the description
  const [artworkTitle, setArtworkTitle] = useState(""); // State to store the input value
  const [loading, setLoading] = useState(""); // Track which button is loading // State to manage loading
  const [attributes, setAttributes] = useState([]);
  const [newAttribute, setNewAttribute] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [termsuggestions, setTermSuggestions] = useState({});
  const [artworkType, setArtworkType] = useState(""); // State to track selected artwork type
  const [isEditMode, setIsEditMode] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch data from the API on component mount
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          "https://web-production-e9268.up.railway.app/api/v1/arts/attributes/?user_id=7"
        );
        console.log(response.data);
        setAllSuggestions(response.data); // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  //new attribute with id
  const handleAddAttribute = (value, id = null) => {
    if (value.trim() && !attributes.find((attr) => attr.name === value)) {
      setAttributes([
        ...attributes,
        { id, name: value, values: [], input: "" },
      ]);
      setNewAttribute("");
      setSuggestions([]);
    }
  };

  const handleDeleteVariation = (index) => {
    // Create a copy of the variations array
    const updatedVariations = [...variations];
    // Remove the variation at the specified index
    updatedVariations.splice(index, 1);
    // Update the state with the new variations array
    setVariations(updatedVariations);
  };

  //new ttribute with id
  const handleAttributeKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddAttribute(newAttribute);
    }
  };

  // New attributes
  const handleSuggestionClick = (suggestion) => {
    handleAddAttribute(suggestion.name, suggestion.id);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewAttribute(value);

    // Filter suggestions based on input
    if (value.trim()) {
      const filteredSuggestions = allSuggestions.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleDeleteSuggestion = async (id) => {
    try {
      await axios.delete(
        `https://web-production-e9268.up.railway.app/api/v1/arts/attributes/${id}/`
      );
      // Remove the suggestion from both state arrays
      setAllSuggestions(allSuggestions.filter((item) => item.id !== id));
      setSuggestions(suggestions.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting suggestion:", error);
    }
  };

  const handleValueChange = async (index, value, id, name) => {
    // Update the input value in attributes
    debugger;
    setAttributes((prev) =>
      prev.map((attr, i) => (i === index ? { ...attr, input: value } : attr))
    );

    // Call the API if there is an attribute ID
    if (id) {
      try {
        const response = await axios.get(
          `https://web-production-e9268.up.railway.app/api/v1/arts/terms/?attribute_id=${id}&search=${value}`
        );

        // Store the response data directly
        setTermSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching term suggestions:", error);
      }
    }
  };

  const handleValueKeyPress = (index, e) => {
    if (e.key === "Enter") {
      setAttributes((prev) =>
        prev.map((attr, i) =>
          i === index
            ? {
                ...attr,
                values: [...attr.values, attr.input.trim()],
                input: "",
              }
            : attr
        )
      );
    }
  };
  const handleTermSuggestionClick = (index, suggestion) => {
    debugger;
    setAttributes((prev) =>
      prev.map((attr, i) =>
        i === index
          ? {
              ...attr,
              values: [...attr.values, suggestion.trim()],
              input: "",
            }
          : attr
      )
    );
  };
  const handleRemoveValue = (index, value) => {
    setAttributes((prev) =>
      prev.map((attr, i) =>
        i === index
          ? { ...attr, values: attr.values.filter((v) => v !== value) }
          : attr
      )
    );
  };

  const handleTitleChange = (e) => {
    setArtworkTitle(e.target.value); // Update the state when input changes
    setPayload((prevPayload) => ({
      ...prevPayload,
      title: e.target.value, // Update variations dynamically
    }));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Update the state when textarea changes
    setPayload((prevPayload) => ({
      ...prevPayload,
      description: e.target.value, // Update variations dynamically
    }));
  };
  const handleTagInput = (event) => {
    const value = event.target.value.toLowerCase();
    setTagInput(value);

    if (value.trim()) {
      const suggestions = predefinedTags
        .flatMap(category => category.tags)
        .filter(tag => tag.toLowerCase().includes(value))
        .slice(0, 10); // Limit to 10 suggestions
      setTagSuggestions(suggestions);
    } else {
      setTagSuggestions([]);
    }
  };

  // Rename the tag category handler to avoid conflict with artwork category handler
  const handleTagCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setTagSuggestions(category ? 
      predefinedTags.find(c => c.category === category)?.tags || [] 
      : []);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      setTagInput('');
      setTagSuggestions([]);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const tagsString = tags.join(","); // Create a string of tags separated by commas
  // setPayload((prevPayload) => ({
  //   ...prevPayload,
  //   tags: tagsString, // Update variations dynamically
  // }));

  useEffect(() => {
    // Retrieve the user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.name); // Set the name in state
      setUserId(parsedData.userId);
      setPayload((prevPayload) => ({
        ...prevPayload,
        created_by: parsedData.userId, // Update variations dynamically
      }));
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getArtCategoryList(); // Assume this function fetches the categories
        console.log("Categories:", data);
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId); // Update the selected category ID
    setPayload((prevPayload) => ({
      ...prevPayload,
      category: selectedId, // Update variations dynamically
    }));
    console.log("Selected Category ID:", selectedId);
  };


  const handleFileChange = (index, file) => {
    if (file) {
      const updatedVariations = [...variations];
      updatedVariations[index].image = file; // Set the file object for the image

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        updatedVariations[index].preview = e.target.result;
        setVariations([...updatedVariations]);

        setPayload((prevPayload) => ({
          ...prevPayload,
          generated_variations: updatedVariations,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Functions for Sizes
  const handleSizeKeyPress = (event) => {
    if (event.key === "Enter" && sizeInput.trim() !== "") {
      setSizes([...sizes, sizeInput.trim()]);
      setSizeInput("");
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  // Functions for Materials
  const handleMaterialKeyPress = (event) => {
    if (event.key === "Enter" && materialInput.trim() !== "") {
      setMaterials([...materials, materialInput.trim()]);
      setMaterialInput("");
    }
  };

  // const handleVariationChange = (index, field, value) => {
  //   setVariations((prev) => {
  //     const updatedVariations = prev.map((variation, i) =>
  //       i === index ? { ...variation, [field]: value } : variation
  //     );
  //     console.log(variations);
  //     console.log(updatedVariations); // Log the updated state here
  //     return updatedVariations;
  //   });
  // };
  const handleVariationChange = (index, field, value) => {
    setVariations((prev) => {
      const updatedVariations = prev.map((variation, i) =>
        i === index ? { ...variation, [field]: value } : variation
      );
      
      // Update the payload while preserving other fields
      setPayload((prevPayload) => ({
        ...prevPayload,
        generated_variations: updatedVariations,
      }));
      
      return updatedVariations;
    });
  };

  // Update the getFilePreview function to handle both File objects and URLs
  const getFilePreview = (file) => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    } else if (typeof file === 'string') {
      return file; // Return the URL directly if it's a string
    } else if (file?.image_url) {
      return file.image_url; // Handle case where image comes from API with image_url property
    }
    console.error("Invalid file type:", file);
    return "";
  };

  // Function to remove an image from the array and update final images
  const removeImage = (index, isArtImage) => {
    if (isArtImage) {
      setArtImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        console.log("Updated art images array after remove:", updatedImages);
        return updatedImages;
      });
    } else {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        console.log(
          "Updated gallery images array after remove:",
          updatedImages
        );
        return updatedImages;
      });
    }
    updateFinalImages(); // Recalculate final images after removal
  };

  // Function to update the finalImages state after upload or removal
  const updateFinalImages = () => {
    const allImages = [...images, ...artimages].map(img => {
      if (img.isNew) {
        // For newly uploaded files
        return {
          image: img.image,
          thumbnail: img.thumbnail,
          isNew: true
        };
      } else {
        // For existing images from URL
        return {
          image_url: img.image,
          thumbnail: img.thumbnail,
          isNew: false
        };
      }
    });

    setFinalImages(allImages);
    setPayload(prevPayload => ({
      ...prevPayload,
      images: allImages
    }));
  };

  // Update the file upload handlers to maintain consistency
  const fileImagesArt = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => ({
      image: file,
      thumbnail: true,
      isNew: true
    }));
    setArtImages((prevImages) => {
      const updatedImages = [...prevImages, ...imagesArray];
      console.log("Updated art images array:", updatedImages);
      return updatedImages;
    });
    updateFinalImages();
  };

  const fileImages = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => ({
      image: file,
      thumbnail: false,
      isNew: true
    }));
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...imagesArray];
      console.log("Updated gallery images array:", updatedImages);
      return updatedImages;
    });
    updateFinalImages();
  };

  const handleRemoveMaterial = (materialToRemove) => {
    setMaterials(materials.filter((material) => material !== materialToRemove));
  };
  const handleSubmit = async () => {
    const payload = {
      attributes_list: attributes.map((attr) => ({
        attribute: attr.name,
        terms: attr.values,
      })),
    };

    setPayload((prevPayload) => ({
      ...prevPayload,
      attributes: attributes.map((attr) => ({
        attribute: attr.name,
        terms: attr.values,
      })),
    }));

    setLoading("generate"); // Indicate "Generate Variations" is loading

    try {
      const response = await fetch(
        "https://web-production-e9268.up.railway.app/api/v1/arts/art/generate_variations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setVariations(result.generated_variations || []);
        alert("Data submitted successfully!");
      } else {
        console.error("Error:", response.statusText);
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data.");
    } finally {
      setLoading(""); // Reset loading state
    }
  };

 
  const [payload, setPayload] = useState({
    title: '',
    description: '',
    category: null,
    created_by: '',
    tags: '',
    short_description: "abc",
    images: [],
    attributes: [
      { attribute: "Material", terms: materials },
      { attribute: "Size", terms: sizes },
    ],
    generated_variations: [],
    prints: '',
  });

  const handleSave = async () => {
    setLoading("save");

    try {
      // Create the final payload by combining existing data with any changes
      const finalPayload = {
        ...payload,
        title: artworkTitle || payload.title,
        description: description || payload.description,
        category: selectedCategoryId || payload.category,
        tags: tags.join(",") || payload.tags,
        generated_variations: variations,
        prints: artworkType || payload.prints,
      };

      // Log the final payload for debugging
      console.log("Final Payload:", finalPayload);

      const response = await fetch(
        "https://web-production-e9268.up.railway.app/api/v1/arts/art/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        alert("Art saved successfully!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert("Failed to save art: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error saving art:", error);
      alert("Failed to save art.");
    } finally {
      setLoading("");
    }
  };

  const handleArtworkTypeChange = (type) => {
    console.log('Setting artwork type to:', type);
    setArtworkType(type);
    setIsEditMode(false);
  };

// Fetch artwork details if id is present
useEffect(() => {
  if (id) {
    fetchArtworkDetails();
  }
}, [id]);

// Function to fetch artwork details
const fetchArtworkDetails = async () => {
  try {
    const response = await axios.get(
      `https://web-production-e9268.up.railway.app/api/v1/arts/art/${id}/get-art-edit-details/`
    );
    const data = response.data;

    setIsEditMode(true);

    // Set basic artwork details
    setArtworkTitle(data.title);
    setDescription(data.description);
    setSelectedCategoryId(data.category);
    setTags(data.tags ? data.tags.split(",") : []);

    // Handle existing images
    if (data.images) {
      const thumbnailImages = data.images
        .filter(img => img.thumbnail)
        .map(img => ({
          image: img.image_url,
          thumbnail: true,
          isNew: false
        }));

      const galleryImages = data.images
        .filter(img => !img.thumbnail)
        .map(img => ({
          image: img.image_url,
          thumbnail: false,
          isNew: false
        }));

      setArtImages(thumbnailImages);
      setImages(galleryImages);
      setFinalImages([...thumbnailImages, ...galleryImages]);
    }

    // Set artwork type based on prints value
    if (data.prints) {
      const artType = data.prints === "Limited Edition" ? "Limited Edition" : 
                     data.prints === "Open Edition" ? "Open Edition" : 
                     "Original Artwork";
      setArtworkType(artType);
      // Update radio button selection
      setTimeout(() => {
        const radioButton = document.querySelector(`input[value="${artType}"]`);
        if (radioButton) {
          radioButton.checked = true;
        }
      }, 0);
    }

    // Handle variations data
    if (data.generated_variations) {
      const formattedVariations = data.generated_variations.map(variation => ({
        variation: variation.variation || variation.size,
        regular_price: variation.regular_price?.toString() || '',
        sale_price: variation.sale_price?.toString() || '',
        stock_status: variation.stock_status || 'In Stock',
        available_quantity: variation.available_quantity?.toString() || '',
        image: variation.image_url || null,
        preview: variation.image_url || null,
      }));
      
      setVariations(formattedVariations);
    }

    // Update payload with the correct image format
    setPayload(prevPayload => ({
      ...prevPayload,
      title: data.title,
      description: data.description,
      category: data.category,
      created_by: data.created_by,
      tags: data.tags || '',
      short_description: data.short_description || "abc",
      images: data.images ? data.images.map(img => ({
        image_url: img.image_url,
        thumbnail: img.thumbnail,
        isNew: false
      })) : [],
      attributes: data.attributes || [
        { attribute: "Material", terms: materials },
        { attribute: "Size", terms: sizes },
      ],
      generated_variations: data.generated_variations || [],
      prints: data.prints || artworkType,
    }));

  } catch (error) {
    console.error("Error fetching artwork details:", error);
    setError("Failed to load artwork details.");
  }
};

// Create a function to determine if quantity should be shown
const shouldShowQuantity = () => {
  console.log('isEditMode:', isEditMode);
  console.log('artworkType:', artworkType);
  return artworkType === "Limited Edition";
};

// Add debug logging for artwork type changes
useEffect(() => {
  console.log('Artwork Type Changed:', artworkType);
  console.log('Is Edit Mode:', isEditMode);
}, [artworkType, isEditMode]);

  return (
    <div className="product-listing">
      <div className="left-content">
        <h1>List Your Artwork</h1>
        <form className="product-form">
          <div className="form-group w-100">
            <label>Artwork Title</label>
            <input
              type="text"
              id="artwork-title"
              className="form-control"
              placeholder="Enter artwork title"
              value={artworkTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div className="d-flex justify-content-start gap-2 pb-3">
            <div className="d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="limited"
                name="artworkType"
                value="Limited Edition"
                checked={artworkType === "Limited Edition"}
                onChange={() => handleArtworkTypeChange("Limited Edition")}
              />
              <label htmlFor="limited" className="form-check-label">
                Limited Edition
              </label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="open"
                name="artworkType"
                value="Open Edition"
                checked={artworkType === "Open Edition"}
                onChange={() => handleArtworkTypeChange("Open Edition")}
              />
              <label htmlFor="open" className="form-check-label">
                Open Edition
              </label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="original"
                name="artworkType"
                value="Original Artwork"
                checked={artworkType === "Original Artwork"}
                onChange={() => handleArtworkTypeChange("Original Artwork")}
              />
              <label htmlFor="original" className="form-check-label">
                Original Artwork
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              id="description"
              placeholder="Enter artwork description"
              className="form-control"
              value={description} // Bind textarea value to state
              onChange={handleDescriptionChange} // Handle textarea changes
            ></textarea>
          </div>
         

          {/* <div className="form-group">
            <label>Add Attribute</label>
            <input
              type="text"
              value={newAttribute}
              onChange={handleInputChange}
              onKeyDown={handleAttributeKeyPress}
              placeholder="Type attribute name and press Enter"
              className="form-control"
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="suggestion-item"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <span
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{ cursor: "pointer", flex: 1 }}
                    >
                      {suggestion.name}
                    </span>
                    <button
                      onClick={() => handleDeleteSuggestion(suggestion.id)}
                      style={{
                        marginLeft: "10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ marginTop: "20px" }}>
              {attributes.map((attribute, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <label>{attribute.name}</label>
                  <input
                    type="text"
                    value={attribute.input}
                    onChange={(e) =>
                      handleValueChange(
                        index,
                        e.target.value,
                        attribute.id,
                        attribute.name
                      )
                    }
                    onKeyDown={(e) => handleValueKeyPress(index, e)}
                    placeholder={`Type ${attribute.name} and press Enter`}
                    className="form-control"
                  />
                  {termsuggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {termsuggestions.map((suggestion, i) => (
                        <li
                          key={i}
                          className="suggestion-item"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          <span
                            onClick={() =>
                              handleTermSuggestionClick(index, suggestion.name)
                            }
                            style={{ cursor: "pointer", flex: 1 }}
                          >
                            {suggestion.name}
                          </span>
                          <button
                            onClick={() =>
                              handleDeleteSuggestion(suggestion.id)
                            }
                            style={{
                              marginLeft: "10px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              cursor: "pointer",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="values">
                    {attribute.values.map((value, i) => (
                      <span
                        key={i}
                        className="badge text-bg-secondary"
                        onClick={() => handleRemoveValue(index, value)}
                        style={{ cursor: "pointer", margin: "5px" }}
                      >
                        {value} &times;
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="form-group">
  <label>Add Attribute</label>
  <input
    type="text"
    value={newAttribute}
    onChange={handleInputChange}
    onKeyDown={handleAttributeKeyPress}
    placeholder="Type attribute name and press Enter"
    className="form-control"
  />
  {suggestions.length > 0 && (
    <ul className="suggestions-list">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="suggestion-item"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <span
            onClick={() => handleSuggestionClick(suggestion)}
            style={{ cursor: "pointer", flex: 1 }}
          >
            {suggestion.name}
          </span>
          <button
            onClick={() => handleDeleteSuggestion(suggestion.id)}
            style={{
              marginLeft: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  )}
  {/* Render the attributes below the input field */}
  <div className="attributes-container" style={{ marginTop: "10px" }}>
    {attributes.map((attribute, index) => (
      <span
        key={index}
        className="badge text-bg-secondary"
        style={{ margin: "5px", cursor: "pointer" }}
        onClick={() => {
          // Optionally, you can add functionality to remove the attribute
          setAttributes(attributes.filter((_, i) => i !== index));
        }}
      >
        {attribute.name} &times;
      </span>
    ))}
  </div>
  <div style={{ marginTop: "20px" }}>
    {attributes.map((attribute, index) => (
      <div key={index} style={{ marginBottom: "20px" }}>
        <label>{attribute.name}</label>
        <input
          type="text"
          value={attribute.input}
          onChange={(e) =>
            handleValueChange(
              index,
              e.target.value,
              attribute.id,
              attribute.name
            )
          }
          onKeyDown={(e) => handleValueKeyPress(index, e)}
          placeholder={`Type ${attribute.name} and press Enter`}
          className="form-control"
        />
        {termsuggestions.length > 0 && (
          <ul className="suggestions-list">
            {termsuggestions.map((suggestion, i) => (
              <li
                key={i}
                className="suggestion-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <span
                  onClick={() =>
                    handleTermSuggestionClick(index, suggestion.name)
                  }
                  style={{ cursor: "pointer", flex: 1 }}
                >
                  {suggestion.name}
                </span>
                <button
                  onClick={() => handleDeleteSuggestion(suggestion.id)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="values">
          {attribute.values.map((value, i) => (
            <span
              key={i}
              className="badge text-bg-secondary"
              onClick={() => handleRemoveValue(index, value)}
              style={{ cursor: "pointer", margin: "5px" }}
            >
              {value} &times;
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
          <div className="variations my-5">

            <div className="text-right mb-3">
              <button
                type="button"
                className="btn btn-primary border-0  fw-bold  rounded-pill px-4"
                onClick={handleSubmit}
                disabled={loading === "generate"}
              >
                {loading === "generate"
                  ? "Generating..."
                  : "Generate Variations"}
              </button>
            </div>

            {/* Header Row */}
 <div className="table-container">
  {/* Table Header */}
  <div className="table-header">
    <div className="header-cell">Image</div>
    <div className="header-cell">Size</div>
    <div className="header-cell">Regular Price</div>
    <div className="header-cell">Sale Price</div>
    <div className="header-cell">Stock</div>
    {shouldShowQuantity() && <div className="header-cell">Quantity</div>}
    <div className="header-cell">Actions</div>
  </div>

  {/* Table Body */}
  <div className="table-body">
    {variations.map((variation, index) => (
      <div key={index} className="table-row">
        {/* Image Upload */}
        <div className="table-cell">
          <div
            className="image-upload"
            style={{
              width: "100px",
              height: "100px",
              position: "relative",
              background: "#f8f9fa",
              border: "1px dashed #ddd",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              style={{
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            {(variation.preview || variation.image) ? (
              <img
                src={variation.preview || variation.image}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <span style={{ color: "#6c757d" }}>Upload Image</span>
            )}
          </div>
        </div>

        {/* Size */}
        <div className="table-cell">{variation.variation}</div>

        {/* Regular Price */}
        <div className="table-cell">
          <input
            type="number"
            value={variation.regular_price}
            onChange={(e) =>
              handleVariationChange(index, "regular_price", e.target.value)
            }
            style={{ width: "100px", padding: "5px" }}
          />
        </div>

        {/* Sale Price */}
        <div className="table-cell">
          <input
            type="number"
            value={variation.sale_price}
            onChange={(e) =>
              handleVariationChange(index, "sale_price", e.target.value)
            }
            style={{ width: "100px", padding: "5px" }}
          />
        </div>

        {/* Stock */}
        <div className="table-cell">
          <select
            value={variation.stock_status}
            onChange={(e) =>
              handleVariationChange(index, "stock_status", e.target.value)
            }
            style={{ width: "120px", padding: "5px" }}
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Quantity field */}
        {shouldShowQuantity() && (
          <div className="table-cell">
            <input
              type="number"
              value={variation.available_quantity || ''}
              onChange={(e) =>
                handleVariationChange(index, "available_quantity", e.target.value)
              }
              style={{ width: "100px", padding: "5px" }}
              disabled={isEditMode && artworkType !== "Limited Edition"}
            />
          </div>
        )}

        {/* Delete Action */}
        <div className="table-cell">
          <button
            onClick={() => handleDeleteVariation(index)}
            style={{
              background: "none",
              border: "none",
              color: "red",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
          </div>

          {/* <style jsx>{`
            .image-box {
              width: 80px;
              height: 80px;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #ccc;
              position: relative;
              overflow: hidden;
            }

            .image-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .image-box input {
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0;
              cursor: pointer;
            }

            .variation-item {
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              padding: 10px;
              background-color: #f9f9f9;
              transition: box-shadow 0.3s;
            }

            .variation-item:hover {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .imagee {
              border-radius: 8px;
            }

            .form-control {
              border-radius: 4px;
            }

            .form-select {
              border-radius: 4px;
            }
          `}</style> */}

          <div className="form-group col-12 col-sm-12 col-md-6">
            <label>Select Category</label>
            <select
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategoryId}
              className="form-control"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="form-group col-12 col-sm-12 col-md-6">
            <label>Listed By</label>
            <input
              type="text"
              className="form-control"
              id="listed-by"
              value={userName}
              // readOnly
              disabled
            />
          </div>

          <div className="form-group">
            <label>Keywords/Tags</label>
            <div className="tags-inputs-container">
              {/* Category Selector */}
              <select 
                className="form-control mb-2"
                value={selectedCategory}
                onChange={handleTagCategoryChange}
              >
                <option value="">Select a category</option>
                {predefinedTags.map(category => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>

              {/* Tag Search Input */}
              <div className="tag-input-wrapper">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search for tags..."
                  value={tagInput}
                  onChange={handleTagInput}
                />
                {tagSuggestions.length > 0 && (
                  <div className="tag-suggestions">
                    {tagSuggestions.map((tag, index) => (
                      <div
                        key={index}
                        className="tag-suggestion-item"
                        onClick={() => {
                          if (!tags.includes(tag)) {
                            setTags([...tags, tag]);
                          }
                          setTagInput('');
                          setTagSuggestions([]);
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Tag Input */}
              <input
                type="text"
                className="form-control"
                placeholder="Type custom tag and press Enter"
                onKeyDown={handleKeyPress}
              />
            </div>

            {/* Selected Tags Display */}
            <div className="tags-container mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeTag(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <style jsx>{`
              .tags-inputs-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }

              .tag-input-wrapper {
                position: relative;
              }

              .tag-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-radius: 4px;
                max-height: 200px;
                overflow-y: auto;
                z-index: 1000;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }

              .tag-suggestion-item {
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.2s;
              }

              .tag-suggestion-item:hover {
                background-color: #f5f5f5;
              }

              .tags-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
              }

              .tag {
                display: inline-flex;
                align-items: center;
                background-color: #1bae70;
                color: white;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 14px;
              }

              .remove-button {
                background: none;
                border: none;
                color: white;
                margin-left: 5px;
                font-size: 14px;
                cursor: pointer;
                padding: 0 5px;
              }

              .remove-button:hover {
                opacity: 0.8;
              }
            `}</style>
          </div>
        </form>
      </div>
      <div className="right-sidebar bg-light">
      
        {/* Art Thumbnail Section */}
        <div className="bg-white rounded-5 w-100 heightt p-4">
          <h5>Art Thumbnail</h5>
          <div className="file-upload">
            <input
              type="file"
              id="fileInputArt"
              className="file-input"
              accept="image/*"
              multiple
              onChange={fileImagesArt}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInputArt" className="select-image-text">
              Select Art Image
            </label>
          </div>
          <div className="image-preview" style={styles.imagePreview}>
            {artimages.map((image, index) => (
              <div
                key={index}
                className="image-container"
                style={styles.imageContainer}
              >
                <img
                  src={image.isNew ? getFilePreview(image.image) : image.image}
                  alt={`Uploaded Thumbnail ${index + 1}`}
                  style={styles.image}
                />
                <button
                  onClick={() => removeImage(index, true)}
                  style={styles.removeButton}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Art Gallery Section */}
        <div className="bg-white rounded-5 heightt p-4">
          <h5>Art Gallery</h5>
          <div className="file-upload">
            <input
              type="file"
              id="fileInputGallery"
              className="file-input"
              accept="image/*"
              multiple
              onChange={fileImages}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInputGallery" className="select-image-text">
              Select Gallery Image
            </label>
          </div>
          <div className="image-preview" style={styles.imagePreview}>
            {images.map((image, index) => (
              <div
                key={index}
                className="image-container"
                style={styles.imageContainer}
              >
                <img
                  src={image.isNew ? getFilePreview(image.image) : image.image}
                  alt={`Uploaded Gallery ${index + 1}`}
                  style={styles.image}
                />
                <button
                  onClick={() => removeImage(index, false)}
                  style={styles.removeButton}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}
const styles = {
  imagePreview: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 images per row
    gap: "10px",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%", // Make the image fit the container
    maxHeight: "150px",
    objectFit: "cover", // Ensure images are resized proportionally
  },
  removeButton: {
    position: "absolute",
    top: "3px",
    right: "5px",
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    border: "none",
    color: "white",
    borderRadius: "50%",
    paddingLeft: "5px",
    paddingRight: "5px",
    cursor: "pointer",
  },
};



