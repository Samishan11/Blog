import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="page-footer font-small pt-4" style={{ background: '#333333' }}>
                <div className="container text-center text-md-left">
                    <div className="row text-center text-md-left mt-3 pb-3">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 text-light font-weight-bold">About</h6>
                            <p className style={{ color: '#737373' }}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias deserunt officia, nihil veniam
                                repellat quod maxime? Laudantium nemo, tempora facilis architecto, rem facere unde quod eos
                                atque enim, molestiae animi ipsa? Ut totam maxime earum eveniet quaerat adipisci velit hic?
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold text-light">Catagory</h6>
                            <p>
                                <a className="nav nav-link" style={{ color: '#737373' }} href="https://www.facebook.com/samishan.thapa.0">Animal</a>
                            </p>
                            <p>
                                <a className="nav nav-link" style={{ color: '#737373' }} href="#!">Nature</a>
                            </p>
                            <p>
                                <a className="nav nav-link" style={{ color: '#737373' }} href="#!">Mobile</a>
                            </p>
                            <p>
                                <a className="nav nav-link" style={{ color: '#737373' }} href="#!">Laptop</a>
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-4 col-lg-3 col-xl-3 mt-3">
                            <h6 className="text-uppercase mx-auto mb-4 font-weight-bold text-light">follow us</h6>
                            <i className="fab fa-facebook px-3 text-primary" />
                            <i className="fab fa-instagram px-3 text-danger" />
                            <i className="fab fa-twitter px-3  text-primary" />
                            <i className="fab fa-youtube px-3 text-danger" />
                        </div>
                        <hr className="w-100 bg-light d-md" />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
