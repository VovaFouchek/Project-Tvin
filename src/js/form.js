const form = document.querySelector('form');
const inner = document.querySelector('.inner');
const loader = document.querySelector('.lds-roller');
const inputs = document.querySelectorAll('input');

// need to change
// const url = 'https://jsonplaceholder.typicode.com/post';

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
  const statusSuccessMessage = document.createElement('div');
  statusSuccessMessage.classList.add('.successPopUp');
  document.querySelector('.successPopUp').classList.add('success');
  inner.appendChild(statusSuccessMessage);
  document.querySelector('.form__wrap').classList.add('disabled');
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
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(url, fetchData).then(response => {
      if (response.ok) {
        message.success();
      } else {
        throw new Error(error);
      }
    });
    return response;
  } catch (error) {
    message.failure();
    setTimeout(() => document.querySelector('.status').remove(), 5000);
    throw new Error(error);
  } finally {
    clearValues();
  }
};

form.addEventListener('submit', handleSubmit);
