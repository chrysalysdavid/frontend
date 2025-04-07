import React from "react";
import "./loadingSkeleton.scss";

// Table Loading Skeleton Component
const TableLoadingSkeleton = () => {
  return (
    <div className="table-loading-skeleton">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
            <th>
              <div className="skeleton skeleton-header"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
              <td>
                <div className="skeleton skeleton-cell"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Card Loading Skeleton Component
const CardLoadingSkeleton = () => {
  return (
    <div className="card-loading-skeleton">
      <div className="card shadow-sm rounded">
        <div className="skeleton skeleton-card-header"></div>
        <div className="card-body">
          <div className="skeleton skeleton-card-title"></div>
          <div className="skeleton skeleton-card-text"></div>
          <div className="skeleton skeleton-card-text"></div>
          <div className="skeleton skeleton-card-footer"></div>
        </div>
      </div>
    </div>
  );
};

// Section Loading Skeleton Component
const SectionLoadingSkeleton = () => {
  return (
    <div className="section-loading-skeleton">
      <div className="skeleton skeleton-section-header"></div>
      <div className="skeleton skeleton-section-content"></div>
      <div className="skeleton skeleton-section-footer"></div>
    </div>
  );
};
const ProductLoadingSkeleton = () => {
  return (
    <div className="product-loading-skeleton">
      <div className="card shadow-sm rounded">
        <div className="skeleton skeleton-card-image"></div>
        <div className="card-body">
          <div className="skeleton skeleton-card-title"></div>
          <div className="skeleton skeleton-card-text"></div>
          <div className="skeleton skeleton-card-price"></div>
        </div>
      </div>
    </div>
  );
};
// Named exports for all components
export {
  TableLoadingSkeleton,
  CardLoadingSkeleton,
  SectionLoadingSkeleton,
  ProductLoadingSkeleton,
};
