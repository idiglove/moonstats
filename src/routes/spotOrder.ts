import { Router } from 'express'
import { SuccessResponse } from './../../types'
import SpotOrders from './../classes/SpotOrders/SpotOrders'

const spotOrderRoute = () => {
  const router = Router()

  router.post('/spot-order', (req, res) => {
    // TODO logic for creating role
  })

  router.get('/spot-order', (req, res) => {
    // TODO logic for retrieving roles
  })

  router.get('/spot-order/:id', (req, res) => {
    // TODO logic for retrieving role
  })

  router.put('/spot-order/:id', (req, res) => {
    // TODO logic for updating role
  })

  router.delete('/spot-order/:id', (req, res) => {
    // TODO logic for deleting role
  })

  router.post('/spot-order/csv', (req, res) => {
    const spotOrders = new SpotOrders()
    spotOrders.parseCsv((success: SuccessResponse) => {
      if (success.success) {
        res.status(200).send('Parse and insert success')
      } else {
        res.status(500).send('There was an error: ' + success.message)
      }
    })
  })

  return router
}

export default spotOrderRoute
