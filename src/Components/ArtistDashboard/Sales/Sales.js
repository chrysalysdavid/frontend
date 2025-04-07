// import React from 'react';
// import { Button, Table } from 'react-bootstrap';
// import './Sales.scss';
// import ArtistHeader from "../ArtistNavbar/ArtistHeader";

// export default function Sales() {
//     const artworks = [
//         {
//           name: "ARTWORK NAME",
//           SIZE: "SMALL/ MEDIUM/ LARGE",
//           MATERIAL: "ACRYLIC",
//           FRAMETYPE: "BLACK FLOATING FRAME 1.5INCH",
//           orderDate: "10-OCT-2024",
//           orderId: "10-OCT-2024",
//           price: "$3478",
//           commission: "$1200",
//           status: "PROCCESSING/COMPLETED",
//         },
//       ]

//       return (
//         <>
//           <ArtistHeader />
//           <div className="w-100">
//             <div className="container-fluid e-con py-4">
//               <div className="d-flex align-items-center mb-4">
//                 <h4 className="w-50 text-end text-dark font-fam m-0">YOUR LISTINGS</h4>
//                 <div className='w-50 text-end'>
//                   <Button variant="success">LIST ARTWORK</Button>
//                 </div>
//               </div>
//               <div className='table-div'>
//                 <Table>
//                     <thead>
//                     <tr>
//                         <th>ARTWORK</th>
//                         <th className='text-center'>ORDER DATE</th>
//                         <th className='text-center'>ORDER ID</th>
//                         <th className='text-center'>PRICE</th>
//                         <th className='text-center'>COMMISSION</th>
//                         <th className='text-center'>STATUS</th>
//                         <th className='text-center'>DETAILS</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {Array(5).fill(artworks[0]).map((artwork, index) => (
//                         <tr key={index}>
//                         <td>
//                             <div className="d-flex align-items-center gap-3">
//                             <div className="bg-success" style={{ width: "4rem", height: "4rem" }} />
//                             <div>
//                                 <div className="fw-bold">{artwork.name}</div>
//                                 <div className="text-muted">{artwork.SIZE}</div>
//                                 <div className="text-muted">{artwork.MATERIAL}</div>
//                                 <div className="text-muted">{artwork.FRAMETYPE}</div>
//                             </div>
//                             </div>
//                         </td>
//                         <td className='text-center'>{artwork.orderDate}</td>
//                         <td className='text-center'>{artwork.orderId}</td>
//                         <td className='text-center'>{artwork.price}</td>
//                         <td className='text-center'>{artwork.commission}</td>
//                         <td className='text-center'>{artwork.status}</td>
//                         <td className='text-center'>
//                             <p className='m-0 f-12'>ARTWORK PRICE</p>
//                             <p className='m-0 f-12'>$1087</p>
//                             <p className='m-0 f-12'>FRAME PRICE</p>
//                             <p className='m-0 f-12'>$125</p>
//                             <p className='m-0 f-12'>TOTAL:$212</p>
//                             <p className='m-0 f-12'>FEE:242.4</p>
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </Table>
//               </div>
//             </div>
//           </div>
//         </>
//       )

// }

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./Sales.scss";
import ArtistHeader from "../ArtistNavbar/ArtistHeader";
import { TableLoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";

export default function Sales() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const artistId = 7; // Replace with dynamic artist ID if needed
  const apiURL = `https://web-production-e9268.up.railway.app/api/v1/payment/orders_list/?artist_id=${artistId}`;

  // Fetch data from API
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setLoading(false);
        setArtworks(data); // Set the artworks state with API response
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchArtworks();
  }, [apiURL]);

  if (loading) {
    return (
      <>
        <ArtistHeader />
        <div className="container ">
          <h4 className=" text-center font-fam m-0">YOUR LISTINGS</h4>
        </div>
        <div className="container">
          <TableLoadingSkeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <ArtistHeader />
      <div className="w-100">
        <div className="container-fluid e-con py-4">
          <div className="d-flex align-items-center justify-content-center my-4 w-100">
            <h4 className=" text-end text-dark font-fam m-0">YOUR LISTINGS</h4>
            {/* <div className="w-50 text-end">
              <Button variant="success" className="br-30">
                LIST ARTWORK
              </Button>
            </div> */}
          </div>
          <div className="table-div">
            <Table>
              <thead>
                <tr>
                  <th className=" text-capitalize ">
                    <span className="ps-2">ARTWORK</span>
                  </th>
                  <th className="text-center text-capitalize">ORDER DATE</th>
                  <th className="text-center text-capitalize">ORDER ID</th>
                  <th className="text-center text-capitalize">PRICE</th>
                  <th className="text-center text-capitalize">COMMISSION</th>
                  <th className="text-center text-capitalize">STATUS</th>
                  <th className="text-center text-capitalize ">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {artworks.map((artwork, index) => (
                  <tr key={artwork.id || index}>
                    <td className="">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="bg-success ms-2 rounded"
                          style={{ width: "4rem", height: "4rem" }}
                        />
                        <div>
                          <div className="fw-bold text-uppercase">
                            {artwork.artwork_name}
                          </div>
                          <div className="text-muted">
                            {artwork.artwork_size}
                          </div>
                          <div className="text-muted">{artwork.material}</div>
                          <div className="text-muted">
                            {artwork.frame_type || "No Frame"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {new Date(artwork.order_date).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </td>
                    <td className="text-center">{artwork.order_number}</td>
                    <td className="text-center">${artwork.total_price}</td>
                    <td className="text-center">${artwork.commission}</td>
                    <td className="text-center text-capitalize">
                      {artwork.status}
                    </td>
                    <td className="text-center ">
                      <p className="m-0 f-12">
                        Artwork Price: ${artwork.artwork_price}
                      </p>
                      <p className="m-0 f-12">
                        Frame Price: ${artwork.frame_price || "0.00"}
                      </p>
                      <p className="m-0 f-12">Total: ${artwork.total_price}</p>
                      <p className="m-0 f-12">Fee: ${artwork.fee}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
