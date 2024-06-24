type PaymentDetails = {
  type: "credit-card" | "debit-card" | "paypal";
  cardNumber: string;
  cvv: number;
  expirationDate: string;
};

export type Customer = {
  name: string;
  email: string;
  country: string;
  region: string;
  city: string;
  street: string;
  apartment: string;
  phone: string;
  paymentDetails: PaymentDetails;
};
