export const generateSchemaCompliantPassword = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  // Generate a random length between 8 and 12 characters
  const length = Math.floor(Math.random() * 5) + 8;

  // Ensure at least one letter and one number
  let password = '';

  // Add one random letter
  password += letters.charAt(Math.floor(Math.random() * letters.length));

  // Add one random number
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));

  // Fill the rest with a mix of letters and numbers
  const combinedChars = letters + numbers;
  for (let i = password.length; i < length; i++) {
    password += combinedChars.charAt(Math.floor(Math.random() * combinedChars.length));
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};
