const MAX_LENGTH_BODY = 120;
const ERROR_RECIPIENT = 'Email is not valid';
const ERROR_BODY = `Message length should be more than 0 and less than ${MAX_LENGTH_BODY}`;

export const isEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const checkSender = ({ email, body }) => {
  const checked = {
    error: false,
    fields: {},
  };

  const checkEmail = isEmail(email); // *not only email
  const checkBodyLength = body && body.length <= MAX_LENGTH_BODY;

  if (!checkEmail) {
    checked.error = true;
    checked.fields.email = ERROR_RECIPIENT;
  }

  if (!checkBodyLength) {
    checked.error = true;
    checked.fields.body = ERROR_BODY;
  }

  return checked;
};
