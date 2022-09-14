const form = document.querySelector('form');
const inner = document.querySelector('.inner');
const loader = document.querySelector('.lds-roller');
const inputs = document.querySelectorAll('input');
// const url = 'https://crm.tvin.com.ua/api/v1/website_callback';
// const token = 'p3B2GFgbUSRT00lV7YeBf4SDEAjtcdGz';
// const url = 'https://webhook.site/50defbeb-9263-4302-aa4b-875ec2b292cc';

const statusLoading = () => {
  loader.classList.add('active');
  form.classList.add('disabled');
};

const statusFailure = () => {
  const messageFailure = 'Ой, халепа. Будь ласка, спробуйте ще раз';
  loader.classList.remove('active');
  form.classList.remove('disabled');
  const statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.appendChild(statusMessage);
  statusMessage.textContent = messageFailure;
};

const statusSuccess = () => {
  loader.classList.remove('active');
  document.querySelector('.form__wrap').remove();
  const statusSuccessMessage = document.createElement('div');
  statusSuccessMessage.classList.add('.successPopUp');
  document.querySelector('.successPopUp').classList.add('success');
  inner.appendChild(statusSuccessMessage);
};

const message = {
  loading: statusLoading,
  success: statusSuccess,
  failure: statusFailure,
};

const clearValues = () => {
  document.querySelector('#contact-method').value = '';
  inputs.forEach(item => {
    item.value = '';
  });
};

const handleSubmit = event => {
  event.preventDefault();
  message.loading();
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
    body: JSON.stringify(personalData),
    mode: 'no-cors',
    headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
    // headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'X-Auth-Token': token }),
  };
  try {
    const response = await fetch(url, fetchData)
      .then(response => response.json())
      .then(message.success());
  } catch (error) {
    console.error(error);
    message.failure();
    setTimeout(() => {
      document.querySelector('.status').remove();
    }, 5000);
  } finally {
    clearValues();
  }
};

form.addEventListener('submit', handleSubmit);
