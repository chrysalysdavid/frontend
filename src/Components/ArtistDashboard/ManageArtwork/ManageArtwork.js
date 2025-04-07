import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spinner, Form, Button } from "react-bootstrap";
import { FaTrash, FaCopy, FaEdit } from "react-icons/fa"; // Added FaEdit for the edit icon
import "./ManageArtwork.scss";
import ArtistHeader from "../ArtistNavbar/ArtistHeader";
import { TableLoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";

export default function ManageArtwork() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/addArt");
  };

  const handleEdit = (id) => {
    navigate(`/addArt`, { state: { id } });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`https://web-production-e9268.up.railway.app/api/v1/arts/art/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete artwork.');
      }

      setArtworks(artworks.filter(artwork => artwork.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleVisibilityChange = async (id, isActive) => {
    try {
      const response = await fetch(`https://web-production-e9268.up.railway.app/api/v1/arts/art/${id}/visibility/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visibility: isActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update visibility.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDuplicate = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://web-production-e9268.up.railway.app/api/v1/arts/art/duplicate-product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to duplicate artwork.');
      }

      fetchArtworks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtworks = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;

    fetch(
      `https://web-production-e9268.up.railway.app/api/v1/arts/art/get_all_arts_list/?artis_id=${userId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch artworks.");
        }
        return response.json();
      })
      .then((data) => {
        setArtworks(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      navigate("/ArtistPortal");
    } else {
      fetchArtworks();
    }
  }, [navigate]);

  if (loading) {
    return (
      <>
        <ArtistHeader />
        <div className="container" style={{ marginTop: '1.5rem' }}>
          <h4 className="text-center text-dark font-fam m-0">YOUR LISTINGS</h4>
        </div>
        <div className="container">
          <TableLoadingSkeleton />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ArtistHeader />
        <div className="container">
          <h4 className="text-center text-dark font-fam m-0">YOUR LISTINGS</h4>
        </div>
        <div className="container">
          <p className="text-danger">Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ArtistHeader />
      <div   className="container-fluid e-con py-4 m-15">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-dark font-fam m-0">YOUR LISTINGS</h4>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-bold"
            onClick={handleNavigation}
          >
            List Artwork
          </Button>
        </div>
        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table striped bordered hover className="m-0">
            <thead className="sticky-top bg-light">
              <tr>
                <th className="ps-4">ARTWORK</th>
                <th className="text-center">VISIBILITY</th>
                <th className="text-center">PUBLISHED DATE</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">STOCK</th>
                <th className="text-center">PRINTS</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((artwork, index) => (
                <tr key={index}>
                  <td className="ps-4 d-flex align-items-center gap-3">
                    <img
                      src={artwork.category.images}
                      alt="Artwork Category"
                      style={{ width: "4rem", height: "4rem", objectFit: "cover", borderRadius: "8px" }}
                    />
                    <div>
                      <div className="fw-bold">{artwork.title}</div>
                      <div className="text-muted">{artwork.category.name}</div>
                      <div className="text-muted">{artwork.dimension}</div>
                    </div>
                  </td>
                  <td className="text-center">
                    <Form.Select
                      defaultValue={artwork.is_active ? "Active" : "Inactive"}
                      onChange={(e) => handleVisibilityChange(artwork.id, e.target.value === "Active")}
                      className="form-select-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </td>
                  <td className="text-center">
                    {new Date(artwork.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-center">${artwork.price_range}</td>
                  <td className="text-center">{artwork.total_stock}</td>
                  <td className="text-center">{artwork.prints}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(artwork.id)}
                      disabled={deletingId === artwork.id}
                    >
                      {deletingId === artwork.id ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      ) : (
                        <FaTrash />
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDuplicate(artwork.id)}
                      disabled={loading}
                    >
                      <FaCopy />
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleEdit(artwork.id)}
                    >
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}