import React from "react";
import "./Contact.scss";
import "../Styles/Styles.scss";
import starlingInMist from "../../assets/starling-in-mist.png";
import dot from "../../assets/Dot line.png";

export default function Contact() {
  return (
    <>
      <div className="e-con-innerC mb-5">
        <div className="col-12 col-md-6">
          <h3 className="font-fam titleSize">Contact US</h3>
          <p className="text-left">
            Feel free to contact us with any questions or concerns. You can use
            the form on our website or email us directly. We appreciate your
            interest and look forward to hearing from you.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {/* <img src={dot} alt="Dotbar" className='Dot-baCr' /> */}
        <div className="bgborder Con-Dot-line"></div>
      </div>
      <div className="ECon mb-5 ">
        {/* <div className="w-50 d-none d-sm-none d-md-flex  justify-content-center">
          <img
            src={starlingInMist}
            alt="Design"
            className="img-fluid rounded fit-height"
          />
        </div> */}
        <form className="w-100 d-flex justify-content-center">
          <div className="col-12 col-md-6 px-3 px-md-0">
            <div className="mb-2">
              <label for="inputText" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="inputText" />
            </div>
            <div className="mb-2">
              <label for="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputEmail4" />
            </div>
            <div className="mb-2">
              <label for="inputTextSD" className="form-label">
                Subject
              </label>
              <input type="text" className="form-control" id="inputTextSD" />
            </div>
            <div className="mb-2">
              <label for="exampleFormControlTextarea1" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
