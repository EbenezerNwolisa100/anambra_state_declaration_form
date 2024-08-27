import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const IndigenesForm = () => {

    const initialFormState = {
        submission_type: 'indigene',
        surname: '',
        first_name: '',
        middle_name: '',
        email: '',
        date_of_birth: '',
        gender: '',
        marital_status: '',
        spouse_name: '',
        spouse_phone_number: '',
        country_of_residence: '',
        state_of_residence: '',
        state_of_origin: '',
        lga_of_residence: '',
        lga_of_origin: '',
        community_of_origin: '',
        village: '',
        tribe: '',
        kindred: '',
        employment_status: '',
        occupation: '',
        phone_number: '',
        alternate_phone_number: '',
        phone_on_whatsapp: '',
        alternate_on_whatsapp: '',
        next_of_kin: '',
        next_of_kin_phone_number: '',
        valid_means_of_identification: '',
        valid_identification_number: '',
        agreePrivacyPolicy: false,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [lgas, setLGAs] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup
    const navigate = useNavigate(); // Hook for navigation

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

    const [communities, setCommunities] = useState([]);
    const [anambraLGAs] = useState({
        "Aguata": ["Achina", "Aguluezechukwu", "Akpo", "Amesi", "Ekwulobia", "Ezinifite", "Igbo-Ukwu", "Ikenga", "Isuofia", "Nkpologwu", "Uga", "Oraeri", "Umuchu", "Umuona"],
        "Anambra East": ["Aguleri", "Enugwu-Aguleri", "Enugu-Otu Aguleri", "Eziagulu Otu", "Igbariam", "Ikem-Ivite", "Mkpunando", "Nando", "Nsugbe", "Umueri", "Umuoba-Anam"],
        "Anambra West": ["Ezi-Anam", "Ifite-Anam", "Inoma", "Nzam", "Olumbanasa", "Oroma-Etiti", "Owelle", "Ukwalla", "Umuenwelum", "Umueze-Anam"],
        "Anaocha": ["Adazi-Ani", "Adazi-Enu", "Adazi-Nnukwu", "Agulu", "Aguluzigbo", "Akwaeze", "Ichida", "Neni", "Nri", "Obeledu"],
        "Awka North": ["Achalla", "Ugbene", "Amanuke", "Awba-Ofemili", "Ebenebe", "Isuaniocha", "Mgbakwu", "Amansea", "Ugbenu", "Urum"],
        "Awka South": ["Amawbia", "Awka", "Ezinator", "Isiagu", "Nibo", "Nise", "Mbaukwu", "Okpuno", "Umuawulu"],
        "Ayamelum": ["Anaku", "Ifite-Ogwari", "Igbakwu", "Omasi", "Omor", "Umerum", "Umueje", "Umumbo"],
        "Dunukofia": ["Ifitedunu", "Nawgu", "Ukpo", "Ukwulu", "Umudioka", "Umunachi"],
        "Ekwusigo": ["Ichi", "Ihembosi", "Oraifite", "Ozubulu"],
        "Idemili North": ["Abacha", "Abatete", "Eziowelle", "Ideani", "Nkpor", "Obosi", "Ogidi", "Oraukwu", "Uke", "Umuoji"],
        "Idemili South": ["Akwa-Ukwu", "Alor", "Awka-Etiti", "Nnobi", "Nnokwa", "Oba", "Ojoto"],
        "Ihiala": ["Amorka", "Azia", "Ihiala", "Isseke", "Mbosi", "Okija", "Orsumoghu", "Lilu", "Ubuluisiuzo-Isiuzor", "Uli"],
        "Njikoka": ["Abagana", "Abba", "Enugu Agidi", "Enugwu-Ukwu", "Nawfia", "Nimo"],
        "Nnewi North": ["Nnewi"],
        "Nnewi South": ["Akwaihedi", "Amichi", "Azigbo", "Ebenator", "Ekwulumili", "Ezinifite", "Osumenyi", "Ukpor", "Unubi", "Utuh"],
        "Ogbaru": ["Akili-Ogidi", "Akili-Ozizor", "Amiyi", "Atani", "Mputu", "Obeagwe", "Ochuche-Umodu", "Odekpe", "Ogbakuba", "Ogwu-Aniocha", "Ogwu-Ikpele", "Ohita", "Okpoko", "Ossomala", "Umunankwo", "Umuzu"],
        "Onitsha North": ["Onitsha"],
        "Onitsha South": ["Onitsha"],
        "Orumba North": ["Ajali", "Amaetiti", "Amaokpala", "Awa", "Awgbu", "Nanka", "Ndikelionwu", "Ndiokolo", "Ndiokpalaeke", "Ndiokpalaeze", "Ndiowu", "Ndiukwuenu", "Oko", "Okpeze", "Omogho", "Ufuma"],
        "Orumba South": ["Akpu", "Agbudu", "Enugu-Umuonyia", "Eziagu", "Ezira", "Ihite", "Isulo", "Nawfija", "Ogboji", "Ogbunka", "Onneh", "Owerre-Ezukala", "Umuchukwu", "Umunze", "Umuomaku"],
        "Oyi": ["Awkuzu", "Nkwelle-Ezunaka", "Nteje", "Ogbunike", "Umunya"]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));

        if (name === 'country_of_residence') {
            if (value === 'Nigeria') {
                setStates(nigeriaStates);
            } else {
                setStates([]);
                setLGAs([]);
                setFormData(prevData => ({
                    ...prevData,
                    state_of_residence: '',
                    lga_of_residence: '',
                }));
            }
        }

        if (name === 'state_of_residence') {
            const stateLGAs = lgasByState[value] || [];
            setLGAs(stateLGAs);
            setFormData(prevData => ({
                ...prevData,
                lga_of_residence: '',
                lga_of_origin: ''
            }));
        }

        if (name === 'lga_of_origin') {
            // Update communities based on selected LGA of Origin
            const communities = anambraLGAs[value] || [];
            setCommunities(communities);
            setFormData((prevData) => ({
                ...prevData,
                community_of_origin: ''
            }));
        }

        if (name === 'marital_status' && value !== 'married') {
            setFormData(prevData => ({
                ...prevData,
                spouse_name: '',
                spouse_phone_number: ''
            }));
        }

        if (name === 'employment_status' && value !== 'employed') {
            setFormData(prevData => ({
                ...prevData,
                occupation: ''
            }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        const today = new Date();
        const birthDate = new Date(formData.date_of_birth);
        const age = today.getFullYear() - birthDate.getFullYear();

        // Check age
        if (age < 18) {
            tempErrors.date_of_birth = "You should be 18 years and above to fill this form";
        }

        // Validate required fields
        const requiredFields = [
            'surname', 'first_name', 'email', 'village', 'kindred', 'date_of_birth', 'gender', 'marital_status',
            'lga_of_origin', 'community_of_origin', 'phone_on_whatsapp',
            'country_of_residence', 'employment_status', 'phone_number',
            'next_of_kin', 'next_of_kin_phone_number', 'valid_means_of_identification',
            'valid_identification_number'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                tempErrors[field] = `${field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} is required`;
            }
        });

        // Validate spouse fields if married
        if (formData.marital_status === 'married') {
            if (!formData.spouse_name) tempErrors.spouse_name = "Spouse name is required";
            if (!formData.spouse_phone_number) tempErrors.spouse_phone_number = "Spouse phone number is required";
        }

        // Validate Nigeria-specific fields
        if (formData.country_of_residence === 'Nigeria') {
            const nigeriaFields = ['state_of_residence', 'lga_of_residence', 'lga_of_origin', 'community_of_origin'];
            nigeriaFields.forEach(field => {
                if (!formData[field]) {
                    tempErrors[field] = `${field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} is required`;
                }
            });
        }

        // Validate phone numbers
        const phoneFields = ['phone_number', 'alternate_phone_number', 'next_of_kin_phone_number', 'spouse_phone_number'];
        phoneFields.forEach(field => {
            if (formData[field] && formData[field].length !== 11) {
                tempErrors[field] = "Invalid Phone number";
            }
        });

        // Validate occupation if employed
        if (formData.employment_status === 'employed' && !formData.occupation) {
            tempErrors.occupation = "Occupation is required";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email address";
        }

        if (!formData.agreePrivacyPolicy) {
            tempErrors.agreePrivacyPolicy = "You must agree to the privacy policy";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            try {
                const response = await axios.post('http://localhost/user_data/submit_form.php', formData);
                console.log(response.data);
                if (response.data.status === "success") {
                    setShowPopup(true); // Show the popup
                    resetForm();

                    setTimeout(() => {
                        setShowPopup(false); // Hide the popup after 5 seconds
                        navigate('/'); // Redirect to home page
                    }, 5000);
                } else {
                    alert("Failed to submit form: " + response.data.message);
                }
            } catch (error) {
                console.error("There was an error submitting the form!", error);
                alert("There was an error submitting the form!");
            }
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <>
            <div className="container-fluid bg-light py-5">
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Your submission has been received.</p>
                        </div>
                    </div>
                )}
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5">
                                <div className="text-center mb-5">
                                    {/* <img src={logo} alt="Logo" className="img-fluid mb-4" style={{maxHeight: '100px'}} /> */}
                                    <h1 className="h3 mb-3 fw-bold text-primary">Anambra State Declaration Form</h1>
                                    <p className="text-muted">(For Indigenes Only)</p>
                                </div>
                                <form onSubmit={handleSubmit} method='POST' className="needs-validation" noValidate>
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label htmlFor="surname" className="form-label">Surname</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                                id="surname"
                                                name="surname"
                                                value={formData.surname}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.surname}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="first_name" className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                                id="first_name"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.first_name}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="middle_name" className="form-label">Middle Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="middle_name"
                                                name="middle_name"
                                                value={formData.middle_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Continue with other form fields, wrapping related fields in row and col classes */}
                                    {/* Example for email and date of birth */}
                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.email}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                                            <input
                                                type="date"
                                                className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                value={formData.date_of_birth}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.date_of_birth}</div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <select
                                                className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.gender}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="marital_status" className="form-label">Marital Status</label>
                                            <select
                                                className={`form-select ${errors.marital_status ? 'is-invalid' : ''}`}
                                                id="marital_status"
                                                name="marital_status"
                                                value={formData.marital_status}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Marital Status</option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.marital_status}</div>
                                        </div>
                                    </div>

                                    {formData.marital_status === 'married' && (
                                        <>
                                            <div className="row g-3 mt-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="spouse_name" className="form-label">Spouse Name</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.spouse_name ? 'is-invalid' : ''}`}
                                                        id="spouse_name"
                                                        name="spouse_name"
                                                        value={formData.spouse_name}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.spouse_name}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="spouse_phone_number" className="form-label">Spouse Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.spouse_phone_number ? 'is-invalid' : ''}`}
                                                        id="spouse_phone_number"
                                                        name="spouse_phone_number"
                                                        value={formData.spouse_phone_number}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.spouse_phone_number}</div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="lga_of_origin" className="form-label">LGA of Origin</label>
                                            <select
                                                className={`form-select ${errors.lga_of_origin ? 'is-invalid' : ''}`}
                                                id="lga_of_origin"
                                                name="lga_of_origin"
                                                value={formData.lga_of_origin}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select LGA</option>
                                                {Object.keys(anambraLGAs).map((lga) => (
                                                    <option key={lga} value={lga}>
                                                        {lga}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.lga_of_origin}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="community_of_origin" className="form-label">community of Origin</label>
                                            <select
                                                className={`form-select ${errors.community_of_origin ? 'is-invalid' : ''}`}
                                                id="community_of_origin"
                                                name="community_of_origin"
                                                value={formData.community_of_origin}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Community</option>
                                                {communities.map((community) => (
                                                    <option key={community} value={community}>
                                                        {community}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.community_of_origin}</div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="village" className="form-label">Village</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.village ? 'is-invalid' : ''}`}
                                                id="village"
                                                name="village"
                                                value={formData.village}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.village}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="kindred" className="form-label">Kindred</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.kindred ? 'is-invalid' : ''}`}
                                                id="kindred"
                                                name="kindred"
                                                value={formData.kindred}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.kindred}</div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="employment_status" className="form-label">Are You Employed?</label>
                                            <select
                                                className={`form-select ${errors.employment_status ? 'is-invalid' : ''}`}
                                                id="employment_status"
                                                name="employment_status"
                                                value={formData.employment_status}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Status</option>
                                                <option value="employed">Employed</option>
                                                <option value="unemployed">Unemployed</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.employment_status}</div>
                                        </div>
                                        <div className="col-md-6">
                                            {formData.employment_status === 'employed' && (
                                                <>
                                                    <label htmlFor="occupation" className="form-label">Occupation</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.occupation ? 'is-invalid' : ''}`}
                                                        id="occupation"
                                                        name="occupation"
                                                        value={formData.occupation}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.occupation}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                                                id="phone_number"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.phone_number}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone_on_whatsapp" className="form-label">Is this phone number on Whatsapp?</label>
                                            <select
                                                className={`form-select ${errors.phone_on_whatsapp ? 'is-invalid' : ''}`}
                                                id="phone_on_whatsapp"
                                                name="phone_on_whatsapp"
                                                value={formData.phone_on_whatsapp}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.phone_on_whatsapp}</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="alternate_phone_number" className="form-label">Alternate Phone Number</label>
                                            <input
                                                type="tel"
                                                className={`form-control ${errors.alternate_phone_number ? 'is-invalid' : ''}`}
                                                id="alternate_phone_number"
                                                name="alternate_phone_number"
                                                value={formData.alternate_phone_number}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.alternate_phone_number}</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="alternate_on_whatsapp" className="form-label">Is this alternate number on Whatsapp?</label>
                                            <select
                                                className={`form-select ${errors.alternate_on_whatsapp ? 'is-invalid' : ''}`}
                                                id="alternate_on_whatsapp"
                                                name="alternate_on_whatsapp"
                                                value={formData.alternate_on_whatsapp}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Option</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.alternate_on_whatsapp}</div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="next_of_kin" className="form-label">Next of Kin</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.next_of_kin ? 'is-invalid' : ''}`}
                                                id="next_of_kin"
                                                name="next_of_kin"
                                                value={formData.next_of_kin}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.next_of_kin}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="next_of_kin_phone_number" className="form-label">Next of Kin Phone Number</label>
                                            <input
                                                type="tel"
                                                className={`form-control ${errors.next_of_kin_phone_number ? 'is-invalid' : ''}`}
                                                id="next_of_kin_phone_number"
                                                name="next_of_kin_phone_number"
                                                value={formData.next_of_kin_phone_number}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.next_of_kin_phone_number}</div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label htmlFor="valid_means_of_identification" className="form-label">Valid Means of identification</label>
                                            <select
                                                className={`form-select ${errors.valid_means_of_identification ? 'is-invalid' : ''}`}
                                                id="valid_means_of_identification"
                                                name="valid_means_of_identification"
                                                value={formData.valid_means_of_identification}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select option</option>
                                                <option value="drivers_liscence">Drivers Licsence</option>
                                                <option value="NIN">National Identity Number</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.valid_means_of_identification}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="valid_identification_number" className="form-label">Valid Identification Number</label>
                                            <input
                                                type="number"
                                                className={`form-control ${errors.valid_identification_number ? 'is-invalid' : ''}`}
                                                id="valid_identification_number"
                                                name="valid_identification_number"
                                                value={formData.valid_identification_number}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.valid_identification_number}</div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-12">
                                            <label htmlFor="country_of_residence" className="form-label">Country of Residence</label>
                                            <select
                                                className={`form-select ${errors.country_of_residence ? 'is-invalid' : ''}`}
                                                id="country_of_residence"
                                                name="country_of_residence"
                                                value={formData.country_of_residence}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select Country</option>
                                                {countries.map((country, index) => (
                                                    <option key={index} value={country}>{country}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.country_of_residence}</div>
                                        </div>

                                    </div>

                                    {formData.country_of_residence === 'Nigeria' && (
                                        <>
                                            <div className="row g-3 mt-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="state_of_residence" className="form-label">State of Residence</label>
                                                    <select
                                                        className={`form-select ${errors.state_of_residence ? 'is-invalid' : ''}`}
                                                        id="state_of_residence"
                                                        name="state_of_residence"
                                                        value={formData.state_of_residence}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" disabled>Select State</option>
                                                        {states.map((state, index) => (
                                                            <option key={index} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">{errors.state_of_residence}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="lga_of_residence" className="form-label">LGA of Residence</label>
                                                    <select
                                                        className={`form-select ${errors.lga_of_residence ? 'is-invalid' : ''}`}
                                                        id="lga_of_residence"
                                                        name="lga_of_residence"
                                                        value={formData.lga_of_residence}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" disabled>Select LGA</option>
                                                        {lgas.map((lga, index) => (
                                                            <option key={index} value={lga}>{lga}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">{errors.lga_of_residence}</div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="row g-3 mt-3">
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="agreePrivacyPolicy"
                                                    name="agreePrivacyPolicy"
                                                    checked={formData.agreePrivacyPolicy}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="agreePrivacyPolicy">
                                                    By submitting this form, you agree to our privacy policy
                                                </label>
                                                {errors.agreePrivacyPolicy && <div className="invalid-feedback d-block">{errors.agreePrivacyPolicy}</div>}
                                            </div>
                                        </div>
                                    </div>


                                    {/* Submit button */}
                                    <div className="d-grid gap-2 mt-5">
                                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndigenesForm;
