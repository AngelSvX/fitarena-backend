import { payWithSripe } from "../services/pay.service.js"

export const createPaymentIntent = async (req, res) => {
  try {
    const {usuario_id, tarifa_id, clase_id} = req.body

    console.log(usuario_id)
    console.log(tarifa_id)
    console.log(clase_id)

    const paymentIntent = await payWithSripe({usuario_id, tarifa_id, clase_id})

    res.status(200).json(paymentIntent)

  } catch (error) {
      console.error("Error al crear PaymentIntent: ", error.message);
      res.status(500).json({error: error.message})
  }
}