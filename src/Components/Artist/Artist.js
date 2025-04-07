import React, { useEffect, useState } from "react";
import "./Artist.scss";
import "../Styles/Styles.scss";
import dot from "../../assets/Dot line.png";
import chris from "../../assets/Chris-Leib.jpg";
import perched from "../../assets/perched-seer-e.jpg";
import david_f from "../../assets/David_F.png";
import placeholderImage from "../../assets/placeholder.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  getArtistProfile,
  fetchArtistProfile,
  fetchArtistArtworks,
} from "../../Services/apiservice";

export default function Artist() {
  const [artists, setArtists] = useState([]); // State to store artist data
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch artist profiles when the component mounts
    const fetchArtists = async () => {
      try {
        const artistData = await getArtistProfile();
        console.log("Artist Data:", artistData); // Log the artist data
        setArtists(artistData); // Set artist data in state
      } catch (error) {
        console.error("Error fetching artist profiles:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchArtists();
  }, []);

  const handleArtistClick = (artistId) => {
    console.log("Clicked Artist ID:", artistId); // Verify the ID is being passed
    localStorage.setItem("selectedArtistId", artistId);
    navigate(`/ArtistPage`); // Navigate to ArtistPage with the artist ID
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <>
      <div className="container">
        <div className="e-con-inner">
          <div className="w-50">
            <h3 className="font-fam titleSize m-0 px-2">Artists</h3>
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <div className="bgborder Abt-Dot-line"></div>
        </div>

        <div className="rowww d-flex flex-wrap justify-content-start">
          {artists.map((artist, index) => (
            <div key={index} className="ArtistStylee mb-3 w-25">
              <Link
                to="/ArtistPage"
                onClick={() => handleArtistClick(artist.user.id)}
              >
                <img
                  src={artist?.profile_picture || placeholderImage}
                  alt={artist?.user?.username || "Artist"}
                  className="img-fluid"
                />
                <div className="Name_pos">
                  <p>{artist.user?.username}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center w-100">
          <div className="bgborder Abt-Dot-line"></div>
        </div>
      </div>
    </>
  );
}
