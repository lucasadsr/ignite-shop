import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { CartEntry } from "use-shopping-cart/core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const cart: CartEntry = req.body.cart;

  if (!cart) {
    return res.status(400).json({ error: "Cart not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  let line_items = [];
  for (let i = 0; i < cart.length; i++) {
    line_items.push({
      price: cart[i].price_id,
      quantity: cart[i].quantity,
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}