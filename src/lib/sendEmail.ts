import { Linking } from 'react-native';

const sendEmail = async (to: string, subject: string) => {
  // mailto:<receiver_email>?subject=<subject>&body=<body>&cc=<emails_to_copy>
  let url = `mailto:${to}?subject=${subject}`;
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
};

export default sendEmail;
