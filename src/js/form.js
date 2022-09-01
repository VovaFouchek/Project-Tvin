const form = document.querySelector('form');

// const url = 'https://crm.tvin.com.ua/api/v1/website_callback';
// const token = 'p3B2GFgbUSRT00lV7YeBf4SDEAjtcdGz';
const url = 'https://webhook.site/50defbeb-9263-4302-aa4b-875ec2b292cc';

const handleSubmit = event => {
  event.preventDefault();
  const userName = document.querySelector('#name').value;
  const userAddress = document.querySelector('#address').value;
  const userContact = document.querySelector('#contact').value;
  const userContactMethod = document.querySelector('#contact-method').value;

  const personalData = {
    name: userName,
    address: userAddress,
    contact: userContact,
    contact_method: userContactMethod,
  };

  addInfoToDatabase(personalData);
};

const addInfoToDatabase = async personalData => {
  const fetchData = {
    method: 'POST',
    body: personalData,
    headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
    // headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'X-Auth-Token': token }),
  };

  try {
    const response = await fetch(url, fetchData);
    return response.data;
  } catch (error) {
    console.log('Oops.. something go wrong');
    throw new Error(error);
  }
};

form.addEventListener('submit', handleSubmit);
