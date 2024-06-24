type PaymentDetails = {
  type: "credit-card" | "debit-card" | "paypal";
  cardNumber: string;
  cvv: string;
  expirationDate: string;
};

export type Customer = {
  name: string;
  email: string;
  country: string;
  city: string;
  street: string;
  apartment: string;
  phone: string;
  paymentDetails: PaymentDetails;
};
