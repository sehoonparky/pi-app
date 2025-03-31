export default function signUpform(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber");
  const password = formData.get("password");

  console.log(phoneNumber, password);
}
