export const getRemainingDays = (dateString) => {
  if (!dateString) return 0; // Ensure there's a valid date

  const endDate = new Date(dateString);
  const today = new Date();

  // Calculate the difference in days
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0; 
};

export const formatPrice = (price) => {

  const numPrice = Number(price);


  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numPrice);
};
export const dateFormats = (date) => {
  return new Date(date).toLocaleDateString('en-IN');
}
