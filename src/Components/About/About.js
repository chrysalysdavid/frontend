import React, { useState, useEffect } from "react";
import "./About.scss";
import "../Styles/Styles.scss";
import dot from "../../assets/Dot line.png";
import marinaImg from "../../assets/Marina.png";
import robynImg from "../../assets/Roben-Carter.jpg.png";
import imranImg from "../../assets/IMRANIMG.png";
import jono from "../../assets/JONO.png";
import david from "../../assets/David.png";
import david_f from "../../assets/David_F.png";
import alyssa from "../../assets/Alyssa.jpg";
import about from "../../assets/About_img.jpg";

export default function About() {
  const [showMore, setShowMore] = useState({
    marina: false,
    robyn: false,
    imran: false,
    jono: false,
    david: false,
    david_f: false,
  });

  const handleToggleReadMore = (name) => {
    setShowMore((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 993);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {/* <div className={`pad-set container-fuild ${isLargeScreen ? 'container' : ''}`}> */}
      <div className="e-con-innerA">
        <div className="d-flex gap-3">
          <div className="col-12 col-md-6">
            <h3 className="font-fam titleSizeAB">ABOUT US</h3>
            <p className="text-left">
              Chrysalys is dedicated to creating a sustainable and healthy
              environment for all global citizens. Our vision is to empower
              artists by promoting art as a means of healing the planet.
            </p>
            <p className="text-left">
              Solving the climate crisis promotes social justice and equality,
              and unlocks new opportunities for all. By addressing climate
              change, we can create a future that is fair and just for everyone.
            </p>
            <p className="text-left mb-4">
              10% of Chrysalys sales go directly to the Earthtopia Fund for
              Green Justice, an endowment split evenly among fifteen
              environmental foundations, climate science non-profits, and green
              aid agencies that align with our values.
            </p>
            <h3 className="font-fam titleSizeAB">NATURAL INTELLIGENCE</h3>
            <p className="text-left">
              Artificial Intelligence has become a transformative force,
              revolutionizing the way we solve human problems and the way we
              think about what it means to be human.
            </p>
            <p className="text-left">
              In machine learning algorithms enhance diagnosis accuracy and
              treatment efficacy. They help develop mitigation and adaptation
              strategies that preserve ecosystems and biodiversity on Earth and
              push the boundaries of our understanding of the cosmos. But when
              it comes to the spin of your universe, we count on natural
              intelligence to bring the planets of your vision into alignment.
            </p>
            <p className="text-left">
              Art from the Chrysalys collection is made by humans. No artificial
              intelligence or sweeteners. No additives. No algorithms. Just
              flesh, bones, hearts and minds.
            </p>
            <p className="text-left">
              And sometimes nerve and sweat and pain and joy.
            </p>
            <p className="text-left">Explore with us.</p>
          </div>
          <div className="w-50 d-none d-md-block">
            <img src={about} alt="About" className="aboutt" />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {/* <img src={dot} alt="Dot line" className='Dot-line' /> */}
        <div className="bgborder Abt-Dot-line"></div>
      </div>
      <div className="containerteam">
        <h3 className="Meet titleSize font-fam">MEET THE TEAM</h3>
        <div className="contain TEAM">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img
                  src={marinaImg}
                  alt="Marina"
                  className="img-fluid rounded"
                />
                <div className="team-details">
                  <h4 className="mb-0">MARINA</h4>
                  <p>PROJECT MANAGER</p>
                  <a onClick={() => handleToggleReadMore("marina")}>
                    {showMore.marina ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.marina && (
                    <p>
                      Marina Virijevic is an experienced Project Manager with a
                      distinguished international career in project and business
                      management.Her expertise spans social justice, human
                      rights, entrepreneurship, and developmental aid.
                      Throughout her career, she has collaborated with major
                      international stakeholders, including the European Union,
                      USAID, the European Commission, and the Council of Europe,
                      among others. Her strong organizational, critical
                      thinking, and problem-solving skills are vital to our
                      team’s success, ensuring the smooth execution of our
                      operational tasks.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img
                  src={robynImg}
                  alt="Robyn Carter"
                  className="img-fluid rounded"
                />
                <div className="team-details">
                  <h4 className="mb-0">ROBYN CARTER</h4>
                  <p>WRITER</p>
                  <a onClick={() => handleToggleReadMore("robyn")}>
                    {showMore.robyn ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.robyn && (
                    <p>
                      Robyn Carter writes fiction, scripts, and web content. Her
                      work has appeared in Conjunctions, Ninth Letter, West
                      Branch, Colorado Review, Playboy, and various websites.
                      She is a two-time winner of the San Francisco WritersCorps
                      Teaching Artist in Residence grant award. When she is not
                      writing, she teaches writing to kids and prisoners. Robyn
                      is the owner-operator of a fictional small business called
                      A Toy Store Not a Real Store.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img
                  src={imranImg}
                  alt="Imran Noor"
                  className="img-fluid rounded"
                />
                <div className="team-details">
                  <h4 className="mb-0">IMRAN NOOR</h4>
                  <p>ANIMATION/DESIGN</p>
                  <a onClick={() => handleToggleReadMore("imran")}>
                    {showMore.imran ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.imran && (
                    <p>
                      Imran Noor’s experience in graphic design, animation, and
                      motion graphics makes him an invaluable player on the
                      team. He is proficient in Adobe After Effects, Adobe
                      Photoshop, Adobe premier Pro, Adobe Illustrator as well as
                      Adobe Audition.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img src={jono} alt="Jono" className="img-fluid rounded" />
                <div className="team-details">
                  <h4 className="mb-0">JONO WILLIAMSON</h4>
                  <p>ADVISOR</p>
                  <a onClick={() => handleToggleReadMore("jono")}>
                    {showMore.jono ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.jono && (
                    <p>
                      Jono Williamson is a seasoned consultant with over a
                      decade of experience, having collaborated with tech
                      companies in Silicon Valley and advised Evangeline
                      Records, an indie record label. Specializing in CRM,
                      Supply Chain solutions, AI, and Machine Learning, he
                      boasts a proven track record of strategic success with
                      enterprise clients like Apple, JP Morgan, and Credit
                      Suisse. Jono’s unique blend of technical skills and
                      creative strategic vision makes him an invaluable advisor,
                      particularly well-suited to offer insightful guidance to
                      art-focused startups and ventures in the creative industry
                      aiming to drive innovation and success.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img src={david} alt="david" className="img-fluid rounded" />
                <div className="team-details">
                  <h4 className="mb-0">DAVID ETHRIDGE</h4>
                  <p>ADVISOR</p>
                  <a onClick={() => handleToggleReadMore("david")}>
                    {showMore.david ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.david && (
                    <p>
                      David Ethridge is a distinguished curator and gallery
                      owner from Denver, Colorado. With a career spanning over
                      three decades in the art industry, David’s expertise has
                      shaped his roles as the esteemed director of Gallery 1261
                      and the co-owner and curator of the celebrated Abend
                      Gallery. His dedication and discerning eye have made
                      significant contributions to the art community since 1992.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img src={alyssa} alt="alyssa" className="img-fluid rounded" />
                <div className="team-details">
                  <h4 className="mb-0">ALYSSA YEARGIN</h4>
                  <p>ASSISTANT TO THE FOUNDER</p>
                  <a onClick={() => handleToggleReadMore("alyssa")}>
                    {showMore.alyssa ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.alyssa && (
                    <p>
                      Alyssa is the essential sidekick and support to the
                      Frenetk Founder.As someone who is drawn to the arts, she’s
                      in utter awe of nature and loves capturing its raw beauty
                      through photography. Her background is interlaced with a
                      lifetime devoted to supporting and serving others.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3 mb-4">
              <div className="team-member">
                <img
                  src={david_f}
                  alt="david_f"
                  className="img-fluid rounded"
                />
                <div className="team-details">
                  <h4 className="mb-0">DAVID FENTON</h4>
                  <p>CEO/FOUNDER</p>
                  <a onClick={() => handleToggleReadMore("david_f")}>
                    {showMore.david_f ? "Read Less..." : "Read More..."}
                  </a>
                  {showMore.david_f && (
                    <p>
                      David is a self taught artist and serial entrepreneur. He
                      believes that the art world takes itself too seriously. He
                      also believes we need to change that.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="bgborder Abt-Dot-line"></div>
      </div>
    </>
  );
}
