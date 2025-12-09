import express from 'express'
import { createPaymentIntent } from '../controllers/pay.controller.js'

export const payRouter = express.Router()

payRouter.post('/create-payment-intent', createPaymentIntent)
