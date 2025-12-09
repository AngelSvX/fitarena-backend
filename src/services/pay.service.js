import { myGymDB } from "../settings/db.js";
import { stripe } from "../settings/stripe.js";

export const payWithSripe = async ({ usuario_id, tarifa_id, clase_id }) => {
  try {

    const myAmountQuery = `
SELECT t.precio FROM tarifas t
WHERE t.id = ?
`

    const [result] = await myGymDB.execute(myAmountQuery, [tarifa_id])

    const amount = Math.round(result[0].precio * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      automatic_payment_methods: { enabled: true },
      description: "Producto FitArena",
    });

    const addPayQuery = `
      INSERT INTO suscripciones (usuario_id, estado, tarifa_id, clase_id, stripe_payment_id) VALUES(?,?,?,?,?)
    `

    const [insert] = await myGymDB.execute(
      addPayQuery, [
        usuario_id,
        "activa",
        tarifa_id,
        clase_id,
        paymentIntent.id
      ]
    )


    return {
      client_secret: paymentIntent.client_secret,
      client_id: paymentIntent.id,
      insert
    }


  } catch (error) {
    throw error
  }
};