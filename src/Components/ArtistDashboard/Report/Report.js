import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "./Report.scss";
import ArtistHeader from "../ArtistNavbar/ArtistHeader";
import {
  SectionLoadingSkeleton,
  TableLoadingSkeleton,
} from "../../LoadingSkeleton/LoadingSkeleton";

export default function Component() {
  const [reportData, setReportData] = useState({
    commissions: {
      total_commissions: 0,
      pending_commissions: 0,
      paid_commissions: 0,
      refunded_commissions: 0,
    },
    orders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(
          "https://web-production-e9268.up.railway.app/api/v1/payment/report/?artist_id=7"
        );
        const data = await response.json();
        setLoading(false);
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, []);
  if (loading) {
    return (
      <>
        <ArtistHeader />
        <div className="container">
          <div className="py-4">
            <SectionLoadingSkeleton />
          </div>
          <div className="d-flex justify-content-center text-center align-items-center w-100 px-5 py-2 bg-gray rounded ">
            <span className=" f-18 font-fam fw-bold">TOP ARTWORK</span>
          </div>
          <TableLoadingSkeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <ArtistHeader />
      <div className="w-100 py-4">
        <div className="container my-4 report-table-div">
          <div className=" py-4">
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-3 border-none">
                <div className="card h-100 shadow-sm bg-gray border-0">
                  <div className="card-body">
                    <h6 className="card-title text-uppercase text-muted mb-3 font-fam">
                      TOTAL SALES
                    </h6>
                    <div className="d-flex justify-content-between align-items-center ">
                      <h3 className="mb-0 font-fam">$00</h3>
                      {/* <span className="text-muted font-fam">0%</span> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm bg-gray border-0">
                  <div className="card-body">
                    <h6 className="card-title text-uppercase text-muted mb-3 font-fam">
                      TOTAL EARNINGS
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 font-fam ">$00</h3>
                      {/* <span className="text-muted font-fam">0%</span> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm bg-gray border-0">
                  <div className="card-body">
                    <h6 className="card-title text-uppercase text-muted mb-3 font-fam">
                      PENDING PAYMENTS
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 font-fam">$00</h3>
                      {/* <span className="text-muted font-fam">0%</span> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3 ">
                <div className="card h-100 shadow-sm bg-gray border-0">
                  <div className="card-body">
                    <h6 className="card-title text-uppercase text-muted mb-3 font-fam">
                      AVAILABLE FOR WINDRAWAL
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 font-fam text-primary-new">$00</h3>
                      {/* <span className="text-muted font-fam">0%</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="card shadow-sm bg-gray border-0">
                  <div className="card-body">
                    <h6 className="card-title text-uppercase text-muted mb-3 font-fam">
                      ACTIVE ORDERS
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 font-fam">$00</h3>
                      {/* <span className="text-muted font-fam">0%</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center text-center align-items-center w-100 px-4 py-2 bg-gray rounded ">
            <span className=" f-18 font-fam fw-bold">TOP ARTWORK</span>
          </div>
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th className="border-radius-6pxf">
                    <span className="px-2">Artwork Details</span>
                  </th>
                  <th className="text-center">Material</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center border-radius-6pxl">Commission</th>
                </tr>
              </thead>
              <tbody>
                {reportData.orders.length > 0 ? (
                  reportData.orders.map((order, index) => (
                    <tr key={index}>
                      <td className="border-radius-6pxf">
                        <div className="d-flex align-items-center gap-3 px-2">
                          <div
                            className="bg-success"
                            style={{
                              width: "4rem",
                              height: "4rem",
                              backgroundImage: `url(${
                                order.artwork_image || ""
                              })`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <div>
                            <div className="fw-bold">
                              {order.artwork_name || "N/A"}
                            </div>
                            <div className="text-muted">
                              {order.artwork_size || "Unknown Size"}
                            </div>
                            {order.frame_type && (
                              <div className="text-muted">
                                Frame: {order.frame_type}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{order.material || "N/A"}</td>
                      <td className="text-center">
                        {order.status || "Pending"}
                      </td>
                      <td className="text-center">
                        ${order.total_price?.toFixed(2) || "0.00"}
                      </td>
                      <td className="text-center">
                        {order.total_quantity || "0"}
                      </td>
                      <td className="text-center border-radius-6pxl">
                        ${order.total_commission?.toFixed(2) || "0.00"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No artwork orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
