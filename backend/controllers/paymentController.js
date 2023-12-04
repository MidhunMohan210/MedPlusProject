import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_KEY);
const doctorPath = "http://localhost:7000/doctorMedia/";
import { format } from "date-fns";

export const makePayment = async (req, res) => {
  console.log("data in payment", req.body);
  const indianDate = format(new Date(req.body.date), "dd/MM/yyyy");

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Dr.${req.body.doctor.details.name}`,
              description: `At ${req.body.slot} on ${indianDate}`,
            },
            unit_amount: req.body.doctor.details.fee * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/users/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/users/paymentFailed`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
};

export const sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  // console.log("session",session);

  res.send({
    status: session.status,
    paymentId:session.id,
    customer_email: session.customer_details.email,
  });
};
