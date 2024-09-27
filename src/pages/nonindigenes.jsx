import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom';

function nonindigenes() {

    const initialFormState = {
        submission_type: 'nonindigene',
        surname: '',
        first_name: '',
        middle_name: '',
        email: '',
        password: '',
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
        tribe: '',
        village: '',
        kindred: '',
        employment_status: '',
        occupation: '',
        phone_number: '',
        phone_on_whatsapp: '',
        alternate_on_whatsapp: '',
        alternate_phone_number: '',
        next_of_kin: '',
        next_of_kin_phone_number: '',
        valid_means_of_identification: '',
        valid_identification_number: '',
        agreePrivacyPolicy: false,
    };

    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Abuja',
        'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
        'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
        'Yobe', 'Zamfara'
    ];

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState(nigeriaStates);
    const [lgas, setLGAs] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup
    const navigate = useNavigate(); // Hook for navigation
    const [ibadId, setIbadId] = useState('');

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


    const lgasByState = {
        Abia: [
            'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North',
            'Isiala Ngwa South', 'Isiukwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo',
            'Ukwa East', 'Ukwa West', 'Umu Nneochi', 'Umuahia North', 'Umuahia South'
        ],
        Adamawa: [
            'Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde',
            'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan',
            'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'
        ],
        AkwaIbom: [
            'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan',
            'Ibeno', 'Ibesikpo Asutan', 'Ibiono Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene',
            'Ini', 'Itu', 'Mbo', 'Mkpat Enin', 'Nsit Atai', 'Nsit Ibom', 'Nsit Ubium', 'Obot Akara',
            'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung Uko', 'Ukanafun', 'Uruan', 'Urue Offong/Oruko', 'Uyo'
        ],
        Anambra: [
            'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South', 'Ayamelum',
            'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala', 'Njikoka', 'Nnewi North',
            'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South', 'Orumba North', 'Orumba South', 'Oyi'
        ],
        Bauchi: [
            'Alkaleri', 'Bauchi', 'Bogoro', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 'Giade', 'Itas Gadau',
            'Jama\'are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'
        ],
        Bayelsa: [
            'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'
        ],
        Benue: [
            'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala',
            'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu',
            'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
        ],
        Borno: [
            'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa', 'Gubio', 'Guzamala',
            'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga', 'Kukawa', 'Kwaya Kusar', 'Mafa',
            'Magumeri', 'Maiduguri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 'Nganzai', 'Shani'
        ],
        CrossRiver: [
            'Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal',
            'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Yakurr', 'Yala'
        ],
        Delta: [
            'Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 'Ika North East',
            'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 'Okpe', 'Oshimili North',
            'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North', 'Ughelli South', 'Ukwuani', 'Uvwie',
            'Warri North', 'Warri South', 'Warri South West'
        ],
        Ebonyi: [
            'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 'Ikwo',
            'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'
        ],
        Edo: [
            'Akoko Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West', 'Etsako Central',
            'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba-Okha', 'Oredo', 'Orhionmwon', 'Ovia North-East',
            'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'
        ],
        Ekiti: [
            'Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 'Ido Osi',
            'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 'Moba', 'Oye'
        ],
        Enugu: [
            'Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti', 'Igbo Eze North',
            'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka', 'Oji River', 'Udenu', 'Udi', 'Uzo Uwani'
        ],
        Abuja: [
            'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal (AMAC)'
        ],
        Gombe: [
            'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada', 'Shongom', 'Yamaltu/Deba'
        ],
        Imo: [
            'Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte Mbaise', 'Ideato North', 'Ideato South',
            'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 'Nkwerre', 'Nwangele',
            'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal',
            'Owerri North', 'Owerri West'
        ],
        Jigawa: [
            'Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 'Gumel', 'Guri',
            'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kaugama', 'Kazaure', 'Kiri Kasama', 'Maigatari',
            'Malam Madori', 'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
        ],
        Kaduna: [
            'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South',
            'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga',
            'Soba', 'Zangon Kataf', 'Zaria'
        ],
        Kano: [
            'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa',
            'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal',
            'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 'Rano',
            'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa',
            'Wudil'
        ],
        Katsina: [
            'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dan Musa', 'Dandume', 'Danja', 'Daura',
            'Dutsi', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia', 'Kafur', 'Kaita', 'Kankara', 'Kankia',
            'Katsina', 'Kurfi', 'Kusada', 'Mai\'Adua', 'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa',
            'Safana', 'Sandamu', 'Zango'
        ],
        Kebbi: [
            'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 'Dandi', 'Fakai', 'Gwandu',
            'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Sakaba', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'Zuru'
        ],
        Kogi: [
            'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela Odolu', 'Ijumu', 'Kabba/Bunu',
            'Kogi', 'Lokoja', 'Mopa Muro', 'Ofu', 'Ogori/Magongo', 'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
        ],
        Kwara: [
            'Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 'Ilorin West', 'Irepodun',
            'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'
        ],
        Lagos: [
            'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki',
            'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo',
            'Shomolu', 'Surulere'
        ],
        Nasarawa: [
            'Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 'Nasarawa Egon',
            'Obi', 'Toto', 'Wamba'
        ],
        Niger: [
            'Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Kontagora',
            'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 'Mokwa', 'Muya', 'Pailoro', 'Rafi', 'Rijau', 'Shiroro',
            'Suleja', 'Tafa', 'Wushishi'
        ],
        Ogun: [
            'Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Egbado North', 'Egbado South', 'Ewekoro', 'Ifo',
            'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode',
            'Odeda', 'Odogbolu', 'Ogun Waterside', 'Remo North', 'Shagamu'
        ],
        Ondo: [
            'Akoko North-East', 'Akoko North-West', 'Akoko South-East', 'Akoko South-West', 'Akure North', 'Akure South',
            'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo', 'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West',
            'Ose', 'Owo'
        ],
        Osun: [
            'Aiyedaade', 'Aiyedire', 'Atakumosa East', 'Atakumosa West', 'Boluwaduro', 'Boripe', 'Ede North', 'Ede South',
            'Egbedore', 'Ejigbo', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East',
            'Ilesa West', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade',
            'Orolu', 'Osogbo'
        ],
        Oyo: [
            'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East', 'Ibadan North-West',
            'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo',
            'Iseyin', 'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu', 'Ogbomosho North', 'Ogbomosho South', 'Ogo Oluwa',
            'Olorunsogo', 'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West',
            'Surulere'
        ],
        Plateau: [
            'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 'Langtang North',
            'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Qua\'an Pan', 'Riyom', 'Shendam', 'Wase'
        ],
        Rivers: [
            'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 'Bonny', 'Degema', 'Eleme',
            'Emohua', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika',
            'Omuma', 'Opobo/Nkoro', 'Oyigbo', 'Port Harcourt', 'Tai'
        ],
        Sokoto: [
            'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela', 'Isa', 'Kebbe', 'Kware',
            'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta',
            'Wamako', 'Wurno', 'Yabo'
        ],
        Taraba: [
            'Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido', 'Kurmi', 'Lau', 'Sardauna',
            'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'
        ],
        Yobe: [
            'Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Machina',
            'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'
        ],
        Zamfara: [
            'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau', 'Kaura Namoda', 'Maradun',
            'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi'
        ],
    };


    const handleChange = (e) => {
        // const { name, value, type, checked } = e.target;
        // setFormData(prevData => ({
        //     ...prevData,
        //     [name]: type === 'checkbox' ? checked : value
        // }));

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Update only the field that was changed
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));

        if (name === 'state_of_origin' || name === 'state_of_residence') {
            const stateLGAs = lgasByState[value] || [];
            const updatedField = name === 'state_of_origin' ? 'lga_of_origin' : 'lga_of_residence';
        
            setFormData(prevData => ({
                ...prevData,
                [updatedField]: ''
            }));
            setLGAs(stateLGAs);
        }
        
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
                    lga_of_origin: ''
                }));
            }
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
            'surname', 'first_name', 'email', 'tribe', 'kindred', 'date_of_birth', 'gender', 'marital_status',
            'employment_status', 'phone_number', 'phone_on_whatsapp', 'state_of_residence', 'lga_of_residence',
            'next_of_kin', 'next_of_kin_phone_number', 'valid_means_of_identification', 'lga_of_origin',
            'valid_identification_number', 'community_of_origin', 'state_of_origin',
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

        // Check if password meets criteria
        if (!formData.password || formData.password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters long.";
        }

        if (!formData.agreePrivacyPolicy) {
            tempErrors.agreePrivacyPolicy = "You must agree to the privacy policy";
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

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
        setIbadId('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            try {
                const response = await axios.post('https://ibad.asatuyouth.org/api/submit.php', formData);
                console.log(response.data);

                // Check for success message
                if (response.data.message === "Form submitted successfully") {
                    setIbadId(response.data.ibad_id);
                    setShowPopup(true);

                    setTimeout(() => {
                        setShowPopup(false); // Hide the popup after 10 seconds
                        resetForm();
                        navigate('/'); // Redirect to home page
                    }, 30000);
                } else {
                    alert("Failed to submit form: " + response.data.error);
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
            <div className="container-fluid bg-dark py-5">
                {showPopup ? (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Your submission has been received.</p>
                            {ibadId ? (
                                <p>Your Community Identification Number (CIN) is: <strong>{ibadId}</strong></p>
                            ) : (
                                <p>Something went wrong. Check your email for declaration confirmation or try again later.</p>
                            )}
                        </div>
                    </div>
                ) : null}
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5" id='formbak'>
                                <div className="text-center mb-5" id='texts'>
                                    {/* <img src={logo} alt="Logo" className="img-fluid mb-4" style={{maxHeight: '100px'}} /> */}
                                    <h1 className="h3 mb-3 fw-bold">I Believe in Anambra Declaration Form</h1>
                                    <p className="text">(For Non-Indigenes Residing in Anambra Only)</p>
                                </div>
                                <form onSubmit={handleSubmit} method='POST' className="needs-validation text-white" noValidate>
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
                                                <option value="divorced">Divorced</option>
                                                <option value="widowed">Widowed</option>
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
                                            <label htmlFor="state_of_origin" className="form-label">State of Origin</label>
                                            <select name="state_of_origin" value={formData.state_of_origin} onChange={handleChange}
                                                className={`form-select ${errors.state_of_origin ? 'is-invalid' : ''}`}>
                                                <option value="" disabled>Select State</option>
                                                {states.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>   
                                            <div className="invalid-feedback">{errors.state_of_origin}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lga_of_origin" className="form-label">LGA of Origin</label>
                                            <select name="lga_of_origin" value={formData.lga_of_origin} onChange={handleChange}
                                                className={`form-select ${errors.lga_of_origin ? 'is-invalid' : ''}`}>
                                                <option value="" disabled>Select LGA</option>
                                                {lgas.map(lga => (
                                                    <option key={lga} value={lga}>{lga}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.lga_of_origin}</div>
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-3">

                                        <div className="col-md-6">
                                            <label htmlFor="community_of_origin" className="form-label">Community of Origin</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.community_of_origin ? 'is-invalid' : ''}`}
                                                id="community_of_origin"
                                                name="community_of_origin"
                                                value={formData.community_of_origin}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.community_of_origin}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="tribe" className="form-label">Tribe</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.tribe ? 'is-invalid' : ''}`}
                                                id="tribe"
                                                name="tribe"
                                                value={formData.tribe}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">{errors.tribe}</div>
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
                                                <option value="" disabled>Select Option</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
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
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
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
                                                <option value="Driver Licence">Drivers Licsence</option>
                                                <option value="National ID">National Identity Number</option>
                                                <option value="Voter Card">Voters Card</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.valid_means_of_identification}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="valid_identification_number" className="form-label">Valid Identification Number</label>
                                            <input
                                                type="text"
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
                                        <div className="col-md-6">
                                            <label htmlFor="state_of_residence" className="form-label">State of residence</label>
                                            <select name="state_of_residence" value={formData.state_of_residence} onChange={handleChange}
                                                className={`form-select ${errors.state_of_residence ? 'is-invalid' : ''}`}>
                                                <option value="" disabled>Select State</option>
                                                {states.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.state_of_residence}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lga_of_residence" className="form-label">LGA of residence</label>
                                            <select name="lga_of_residence" value={formData.lga_of_residence} onChange={handleChange}
                                                className={`form-select ${errors.lga_of_residence ? 'is-invalid' : ''}`}>
                                                <option value="" disabled>Select LGA</option>
                                                {lgas.map(lga => (
                                                    <option key={lga} value={lga}>{lga}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.lga_of_residence}</div>
                                        </div>
                                    </div>

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
    )
}

export default nonindigenes