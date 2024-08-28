import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

function Home() {

    const navigate = useNavigate();
    const [showSecondQuestion, setShowSecondQuestion] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUserChoice = (isIndigene) => {
        if (isIndigene) {
            navigate('/indigenes');
        } else {
            setShowSecondQuestion(true);
        }
    };

    const handleSecondChoice = (residesInAnambra) => {
        if (residesInAnambra) {
            navigate('/nonindigenes');
        } else {
            setErrorMessage('Only indigenes and those residing in Anambra are allowed to fill this form');
        }
    };


    return (
        <>
            <div className="bg-dark min-vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header text-white text-center py-4" id='back'>
                                {/* <img src={logo} alt="Logo" className="mb-3" style={{maxWidth: '150px'}} /> */}
                                <h2 className="font-weight-light text-dark">I Believe In Anambra State Declaration Form</h2>
                            </div>
                            <div className="card-body" id='formbak'>
                                {!showSecondQuestion ? (
                                    <>
                                        <h3 className="text-center text-white mb-4">Are you an indigene of Anambra state?</h3>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-primary btn-lg mx-2"
                                                onClick={() => handleUserChoice(true)}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="btn btn-outline-light btn-lg mx-2"
                                                onClick={() => handleUserChoice(false)}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-center mb-4 text-white">Do you reside in Anambra state?</h3>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-primary btn-lg mx-2"
                                                onClick={() => handleSecondChoice(true)}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="btn btn-outline-light btn-lg mx-2"
                                                onClick={() => handleSecondChoice(false)}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </>
                                )}
                                
                                {errorMessage && (
                                    <div className="alert alert-danger mt-4 text-center" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className="card-footer text-center py-3 bg-dark">
                                <div className="small" >
                                    <a href="#" id='linktext'>Need help? Contact support</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home