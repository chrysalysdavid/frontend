import React from 'react';
import '../ArtStyle/Art.scss';
import '../Styles/Styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import dot from '../../assets/Dot line.png';
import bloominImg from '../../assets/bloomin-scaled.png';
import brokenImg from '../../assets/broken-Small-scaled.png';
import divingImg from '../../assets/diving-Small-scaled.png';
import goldBettaImg from '../../assets/Image202.png';
import red from '../../assets/revo_Small.jpg';
import lake from '../../assets/chrylys/Amber Lake.jpg';
import snow from '../../assets/chrylys/Snow Mates.jpg';
import leopard from '../../assets/chrylys/leopard lounge.jpg';
import jackson from '../../assets/chrylys/jackson chameleon.jpg'
import pelican from '../../assets/chrylys/Great white pelican.jpg'
import Wanderlust from '../../assets/chrylys/Wanderlust.jpg';

export default function ExclusiveWork() {
  return (
    <>
      <div className="e-con-innerArt">
        <div className='d-flex'>
          <div className='w50'>
            <h3 className='font-fam titleSize'>Exclusive Works</h3>
            
            <h4 className='font-fam mb-0'>SUBSTRATES</h4>
              <p className='text-left'>
                <b>Brushed Aluminum:</b> Through a process of unidirectional polishing, brushed aluminum substrates feature a silvery glow, especially pronounced in a print’s white or light-colored areas. An edgy choice for mavericks and trendsetters.
              </p>
              <p className='text-left'>
                <b>Acrylic:</b> Acrylic’s sleek luminosity and depth brings a contemporary look to your space.
              </p>
              <p className='text-left'>
                <b>Wood:</b> Each piece of wood is unique. Grain and pattern are never the same. If you’re going for shabby chic or rustic, choose wood.
              </p>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="bgborder Art-Dot-line"></div>
      </div>
      <div className="containerArt">
        <div className="d-flex justify-content-center w-100">
          <div className="row m-0 w-85">
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={bloominImg} alt="Bloomin" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">BLOOMIN</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={brokenImg} alt="Broken" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">BROKEN</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={divingImg} alt="Diving" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">DIVING</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={goldBettaImg} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={lake} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">Lake</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={snow} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">Snow Leopard</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={leopard} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">Leopard</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={jackson} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">Jackson Chameleon</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={pelican} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">White Pelican</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={Wanderlust} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">Wanderlust</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={goldBettaImg} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={bloominImg} alt="Bloomin" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">BLOOMIN</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={brokenImg} alt="Broken" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">BROKEN</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={divingImg} alt="Diving" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">DIVING</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={goldBettaImg} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={lake} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={snow} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={leopard} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={jackson} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={pelican} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={Wanderlust} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 mb-4">
              <div className="gallery-item">
                <img src={goldBettaImg} alt="Gold Betta" className="img-fluid" />
                <div className="item-details">
                  <div className="author">by <span className='text-primarygreen'>FRENETK</span></div>
                  <div className="title3 mt-3">GOLD BETTA</div>
                  <div className="stars">
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                    <FontAwesomeIcon icon={regularStar} className="Star" size="1x" />
                  </div>
                  <button className="select-options btn btn-dark">SELECT OPTIONS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex my-4">
        <div className="bgborder Art-Dot-line"></div>
      </div>
      {/* <div className="d-flex my-4">
        <img src={red} className='Red' />
      </div>
      <div className="d-flex my-4">
        <img src={dot} className='Dot-line' />
      </div> */}
    </>
  )
}
