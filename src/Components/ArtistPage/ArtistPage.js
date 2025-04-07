import "./ArtistPage.scss";
import "../Styles/Styles.scss";
import FRENETK1 from "../../assets/Frenetk/Comeback.jpg";
import FRENETK2 from "../../assets/Frenetk/Snow leopards.jpg";
import FRENETK3 from "../../assets/Frenetk/Tim.jpg";
import FRENETK4 from "../../assets/Frenetk/floating puffer.jpg";
import FRENETK5 from "../../assets/Frenetk/helen in blue.jpg";
import FRENETK6 from "../../assets/Frenetk/high noon 1080.jpg";
import FRENETK7 from "../../assets/Frenetk/jackson chameleon.jpg";
import FRENETK8 from "../../assets/Frenetk/leopard lounge.jpg";
import FRENETK9 from "../../assets/Frenetk/nesting 1A_1.jpg";
import david_f from "../../assets/David_F.png";
import dot from "../../assets/Under-video-bar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getArtistProfile,
  fetchArtistProfile,
  fetchArtistArtworks,
} from "../../Services/apiservice";

export default function ArtistPage() {
  // const { artistId } = useParams();
  const [artistProfile, setArtistProfile] = useState([]);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const [backgroundPic, setBackgroundPic] = useState("");
  const artistId = localStorage.getItem("selectedArtistId"); // Retrieve artist ID

  useEffect(() => {
    if (artistId) {
      // Call both APIs using the artistId
      fetchArtistProfile(artistId)
        .then((response) => {
          setArtistProfile(response.data);
          setBackgroundPic(response.data.background_picture); // Set background picture in state
        })
        .catch((error) =>
          console.error("Error fetching artist profile:", error)
        );

      fetchArtistArtworks(artistId)
        .then((response) => setArtistArtworks(response.data))
        .catch((error) =>
          console.error("Error fetching artist artworks:", error)
        );
    }
  }, [artistId]);

  if (!artistId) {
    return <div>Error: Artist not found</div>;
  }

  return (
    <>
      <div
        className="background-image-container"
        style={{
          height: "300px",
          width: "100%",
          backgroundImage: `url(${backgroundPic})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="astronaut-collection">
        <div className="dp_tab">
          <div className="WiDth position-relative d-flex justify-content-between">
            {artistProfile ? (
              <div className="d-flex align-items-center gap-3">
                <div className="dp_placement">
                  <img
                    src={artistProfile?.profile_picture}
                    alt="Profile"
                    className="dp"
                  />
                </div>
                <div className="d-flex gap-5 mobilebtn">
                  <h2 className="text-uppercase Naaame font-fam m-0">
                    {artistProfile?.user?.username || "Unknown Artist"}
                  </h2>
                  <p className="follower font-fam mt-0">FOLLOWERS: 39785</p>
                  <div className="action-buttons mobile-btn">
                    <button className="follow-button">FOLLOW</button>
                    <button className="share-button">SHARE</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading profile...</div>
            )}
            <div className="action-buttons web-btn">
              <button className="follow-button">FOLLOW</button>
              <button className="share-button">SHARE</button>
            </div>
          </div>
        </div>

        <div className="View_change">
          {artistProfile ? (
            <div className="detailsec">
              {/* <div className="dp_placement">
                <img
                  src={artistProfile?.profile_picture}
                  alt="Profile"
                  className="dp"
                />
              </div> */}
              <div className="profile-info">
                {/* <div className="d-flex justify-content-center">
                  <img src={dot} alt="Dotbar" className="Dot-bar" />
                </div>
                <div className="buttons">
                  <button className="profile-button">INFO</button>
                  <button className="profile-button">COLLECTIONS</button>
                  <button className="profile-button">EXHIBITIONS</button>
                </div> */}
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        ARTIST STATEMENT
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {artistProfile?.artist_statement}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        BIO
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">{artistProfile?.bio}</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        EDUCATION
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {artistProfile?.education}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                      >
                        EXHIBITIONS
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {artistProfile?.exhibitions}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detaill">
                  <p>
                    {artistProfile?.description ||
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading profile...</div>
          )}

          <hr className="mobile_screen" />
          <div className="collection-section">
            <h3 className="font-fam">COLLECTION</h3>
            <div className="row">
              {artistArtworks.map((profileArt, index) => {
                console.log("Processing artwork:", {
                  id: profileArt.id,
                  title: profileArt.title,
                  images: profileArt.images,
                });

                // Find the first thumbnail image
                const thumbnailImage = profileArt.images.find(
                  (image) => image.thumbnail
                );
                return thumbnailImage ? (
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-4" key={index}>
                    <Link
                      to="/productDetail"
                      onClick={() =>
                        localStorage.setItem(
                          "selectedImageId",
                          thumbnailImage.art
                        )
                      }
                    >
                      <div className="artwork-container">
                        <div className="prodimg">
                          <img
                            src={thumbnailImage.image_url}
                            alt={profileArt.title}
                            className="collection-item"
                          />
                        </div>
                        <div className="item-details text-left">
                          <div className="author">
                            BY{" "}
                            <span className="text-primarygreen text-uppercase">
                              {profileArt.created_by.username}
                            </span>
                          </div>
                          <div className="title3">{profileArt.title}</div>
                          <div className="stars">
                            {[...Array(5)].map((_, starIndex) => (
                              <FontAwesomeIcon
                                key={starIndex}
                                icon={regularStar}
                                className="Star"
                                size="1x"
                              />
                            ))}
                          </div>
                          <div className="price">${profileArt.price_range}</div>
                          <button
                            className="select-options btn btn-dark"
                            onClick={(e) => {
                              e.stopPropagation();
                              localStorage.setItem(
                                "selectedImageId",
                                thumbnailImage.id
                              );
                            }}
                          >
                            SELECT OPTIONS
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
