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
            <div className="container mt-5">
            <div className="card p-4">
                <h1 className="text-center">Are you an indigene of Anambra state?</h1>
                {!showSecondQuestion && (
                    <div className="text-center mt-4">
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => handleUserChoice(true)}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={() => handleUserChoice(false)}
                        >
                            No
                        </button>
                    </div>
                )}

                {showSecondQuestion && (
                    <div className="text-center mt-4">
                        <h2>Do you reside in Anambra state?</h2>
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => handleSecondChoice(true)}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={() => handleSecondChoice(false)}
                        >
                            No
                        </button>
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger mt-4 text-center" role="alert">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default Home