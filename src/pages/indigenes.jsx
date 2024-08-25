import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'

function indigenes() {

    const [formData, setFormData] = useState({
        surname: '',
        firstName: '',
        middleName: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        spouseName: '',
        spousePhoneNumber: '',
        countryOfResidence: '',
        stateOfResidence: '',
        lgaOfResidence: '',
        lgaOfOrigin: '',
        communityOfOrigin: '',
        village: '',
        kindred: '',
        employed: '',
        occupation: '',
        phoneNumber: '',
        alternatePhoneNumber: '',
        nextOfKin: '',
        nextOfKinPhoneNumber: '',
        validMeansOfIdentification: '',
        validIdentificationNumber: '',
    });

    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [lgas, setLGAs] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data.map(country => country.name.common).sort());
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory (FCT)',
        'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
        'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
        'Yobe', 'Zamfara'
    ];

    const lgasByState = {
        Abia: ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North',
            'Isiala Ngwa South', 'Isiukwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo',
            'Ukwa East', 'Ukwa West', 'Umu Nneochi', 'Umuahia North', 'Umuahia South'],
        // Add other states and their LGAs here...
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));

        if (name === 'countryOfResidence') {
            if (value === 'Nigeria') {
                setStates(nigeriaStates);
            } else {
                setStates([]);
                setLGAs([]);
                setFormData(prevData => ({
                    ...prevData,
                    stateOfResidence: '',
                    lgaOfResidence: '',
                    lgaOfOrigin: ''
                }));
            }
        }

        if (name === 'stateOfResidence') {
            const stateLGAs = lgasByState[value] || [];
            setLGAs(stateLGAs);
            setFormData(prevData => ({
                ...prevData,
                lgaOfResidence: '',
                lgaOfOrigin: ''
            }));
        }
        if (name === 'maritalStatus' && value !== 'married') {
            setFormData(prevData => ({
                ...prevData,
                spouseName: '',
                spousePhoneNumber: ''
            }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        const today = new Date();
        const birthDate = new Date(formData.dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
    
        // Check age
        if (age < 18) {
            tempErrors.dateOfBirth = "You should be 18 years and above to fill this form";
        }
    
        // Validate required fields
        const requiredFields = [
            'surname', 'firstName', 'email', 'dateOfBirth', 'gender', 'maritalStatus',
            'countryOfResidence', 'employed', 'occupation', 'phoneNumber',
            'nextOfKin', 'nextOfKinPhoneNumber', 'validMeansOfIdentification',
            'validIdentificationNumber'
        ];
    
        requiredFields.forEach(field => {
            if (!formData[field]) {
                tempErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
            }
        });
    
        // Validate spouse fields if married
        if (formData.maritalStatus === 'married') {
            if (!formData.spouseName) tempErrors.spouseName = "Spouse name is required";
            if (!formData.spousePhoneNumber) tempErrors.spousePhoneNumber = "Spouse phone number is required";
        }
    
        // Validate Nigeria-specific fields
        if (formData.countryOfResidence === 'Nigeria') {
            const nigeriaFields = ['stateOfResidence', 'lgaOfResidence', 'lgaOfOrigin', 'communityOfOrigin'];
            nigeriaFields.forEach(field => {
                if (!formData[field]) {
                    tempErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
                }
            });
        }
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            console.log(formData);
            // Here you would typically send the data to your backend
        } else {
            console.log("Form has errors");
        }
    };


    return (
        <>
            <div className="container mt-5">
            <h1 className='text-center'>Anambra State Declaration Form</h1>
            <p className='text-center mb-5'>(For Indigenes Only)</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        placeholder="Surname"
                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                    />
                    {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Middle Name"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>


                <div className="mb-3">
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                    />
                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                </div>

                <div className="mb-3">
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>

                <div className="mb-3">
                    <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className={`form-select ${errors.maritalStatus ? 'is-invalid' : ''}`}
                    >
                        <option value="" disabled>Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                    {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
                </div>

                {formData.maritalStatus === 'married' && (
                    <>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="spouseName" 
                                value={formData.spouseName}
                                onChange={handleChange}
                                placeholder="Spouse Name"
                                className={`form-control ${errors.spouseName ? 'is-invalid' : ''}`}
                            />
                            {errors.spouseName && <div className="invalid-feedback">{errors.spouseName}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                name="spousePhoneNumber"
                                value={formData.spousePhoneNumber}
                                onChange={handleChange}
                                placeholder="Spouse Phone Number"
                                className={`form-control ${errors.spousePhoneNumber ? 'is-invalid' : ''}`}
                            />
                            {errors.spousePhoneNumber && <div className="invalid-feedback">{errors.spousePhoneNumber}</div>}
                        </div>
                    </>
                )}

                <div className="mb-3">
                    <select
                        name="countryOfResidence"
                        value={formData.countryOfResidence}
                        onChange={handleChange}
                        className={`form-select ${errors.countryOfResidence ? 'is-invalid' : ''}`}
                    >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    {errors.countryOfResidence && <div className="invalid-feedback">{errors.countryOfResidence}</div>}
                </div>

                {formData.countryOfResidence === 'Nigeria' && (
                    <>
                        <div className="mb-3">
                            <select
                                name="stateOfResidence"
                                value={formData.stateOfResidence}
                                onChange={handleChange}
                                className={`form-select ${errors.stateOfResidence ? 'is-invalid' : ''}`}
                            >
                                <option value="" disabled>Select State</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.stateOfResidence && <div className="invalid-feedback">{errors.stateOfResidence}</div>}
                        </div>

                        <div className="mb-3">
                            <select
                                name="lgaOfResidence"
                                value={formData.lgaOfResidence}
                                onChange={handleChange}
                                className={`form-select ${errors.lgaOfResidence ? 'is-invalid' : ''}`}
                            >
                                <option value="" disabled>Select LGA of Residence</option>
                                {lgas.map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                ))}
                            </select>
                            {errors.lgaOfResidence && <div className="invalid-feedback">{errors.lgaOfResidence}</div>}
                        </div>

                        <div className="mb-3">
                            <select
                                name="lgaOfOrigin"
                                value={formData.lgaOfOrigin}
                                onChange={handleChange}
                                className={`form-select ${errors.lgaOfOrigin ? 'is-invalid' : ''}`}
                            >
                                <option value="" disabled>Select LGA of Origin</option>
                                {lgas.map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                ))}
                            </select>
                            {errors.lgaOfOrigin && <div className="invalid-feedback">{errors.lgaOfOrigin}</div>}
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                name="communityOfOrigin"
                                value={formData.communityOfOrigin}
                                onChange={handleChange}
                                placeholder="Community of Origin"
                                className={`form-control ${errors.communityOfOrigin ? 'is-invalid' : ''}`}
                            />
                            {errors.communityOfOrigin && <div className="invalid-feedback">{errors.communityOfOrigin}</div>}
                        </div>
                    </>
                )}

                {/* ... (remaining form fields with similar structure) ... */}

                <div className="mb-3">
                    <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        placeholder="Village"
                        className={`form-control ${errors.village ? 'is-invalid' : ''}`}
                    />
                    {errors.village && <div className="invalid-feedback">{errors.village}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="kindred"
                        value={formData.kindred}
                        onChange={handleChange}
                        placeholder="Kindred"
                        className={`form-control ${errors.kindred ? 'is-invalid' : ''}`}
                    />
                    {errors.kindred && <div className="invalid-feedback">{errors.kindred}</div>}
                </div>

                <div className="mb-3">
                    <select
                        name="employed"
                        value={formData.employed}
                        onChange={handleChange}
                        className={`form-select ${errors.employed ? 'is-invalid' : ''}`}
                    >
                        <option value="" disabled>Employment Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {errors.employed && <div className="invalid-feedback">{errors.employed}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        placeholder="Occupation"
                        className={`form-control ${errors.occupation ? 'is-invalid' : ''}`}
                    />
                    {errors.occupation && <div className="invalid-feedback">{errors.occupation}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="PhoneNumber"
                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="alternatePhoneNumber"
                        value={formData.alternatePhoneNumber}
                        onChange={handleChange}
                        placeholder="alternatePhoneNumber"
                        className={`form-control ${errors.alternatePhoneNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.alternatePhoneNumber && <div className="invalid-feedback">{errors.alternatePhoneNumber}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="nextOfKin"
                        value={formData.nextOfKin}
                        onChange={handleChange}
                        placeholder="nextOfKin"
                        className={`form-control ${errors.nextOfKin ? 'is-invalid' : ''}`}
                    />
                    {errors.nextOfKin && <div className="invalid-feedback">{errors.nextOfKin}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="nextOfKinPhoneNumber"
                        value={formData.nextOfKinPhoneNumber}
                        onChange={handleChange}
                        placeholder="nextOfKinPhoneNumber"
                        className={`form-control ${errors.nextOfKinPhoneNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.nextOfKinPhoneNumber && <div className="invalid-feedback">{errors.nextOfKinPhoneNumber}</div>}
                </div>

                <div className="mb-3">
                    <select
                        name="validMeansOfIdentification"
                        value={formData.validMeansOfIdentification}
                        onChange={handleChange}
                        className={`form-select ${errors.validMeansOfIdentification ? 'is-invalid' : ''}`}
                    >
                        <option value="" disabled>Valid Means of Identification</option>
                        <option value="nationalId">National ID</option>
                        <option value="driversLicense">Driver's License</option>
                        <option value="passport">Passport</option>
                        <option value="votersCard">Voter's Card</option>
                    </select>
                    {errors.validMeansOfIdentification && <div className="invalid-feedback">{errors.validMeansOfIdentification}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="validIdentificationNumber"
                        value={formData.validIdentificationNumber}
                        onChange={handleChange}
                        placeholder="validIdentificationNumber"
                        className={`form-control ${errors.validIdentificationNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.validIdentificationNumber && <div className="invalid-feedback">{errors.validIdentificationNumber}</div>}
                </div>

                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default indigenes