const Portfolio = require('../models/portfolio')

exports.getPortfolios = (req, res) => {
  Portfolio.find({}, (err, portfolios) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(portfolios)
  })
}

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id

  Portfolio.findById(portfolioId, (err, portfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(portfolio)
  })
}

exports.savePortfolio = (req, res) => {
  const data = req.body
  const userId = req.user && req.user.sub
  const portfolio = new Portfolio(data)
  portfolio.userId = userId

  portfolio.save((err, createdPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(createdPortfolio)
  })
}

exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id
  const portfolioData = req.body

  Portfolio.findById(portfolioId, (err, foundPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }
    foundPortfolio.set(portfolioData)
    foundPortfolio.save((err, savedPortfolio) => {
      if (err) {
        return res.status(422).send(err)
      }
      return res.json(savedPortfolio)
    })
  })
}

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id

  Portfolio.deleteOne({_id: portfolioId}, (err, deletedPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json({status: 'DELETED'})
  })
}