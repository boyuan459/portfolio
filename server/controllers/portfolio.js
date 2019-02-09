const Portfolio = require('../models/portfolio')

exports.getPortfolios = (req, res) => {
  Portfolio.find({}, (err, portfolios) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(portfolios)
  })
}

exports.savePortfolio = (req, res) => {
  const data = req.body
  const portfolio = new Portfolio(data)

  portfolio.save((err, createdPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(createdPortfolio)
  })
}