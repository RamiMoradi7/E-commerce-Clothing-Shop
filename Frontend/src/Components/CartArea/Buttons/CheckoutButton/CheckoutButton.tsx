import "./CheckoutButton.css";
export default function CheckoutButton(): JSX.Element {
  return (
    <>
      <div className="container">
        <div className="left-side">
          <div className="card">
            <div className="card-line"></div>
            <div className="buttons"></div>
          </div>

          <div className="post">
            <div className="post-line"></div>
            <div className="screen">
              <div className="shekel">₪</div>
            </div>
            <div className="numbers"></div>
            <div className="numbers-line2"></div>
          </div>
        </div>
        <div className="right-side">
          <div className="new">Checkout</div>
        </div>
      </div>
    </>
  );
}
