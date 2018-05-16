const engine = require('../../../engine')

module.exports = (transaction) => {
  const { error, value } = engine.validate(transaction, engine.joi.object({
    id: engine.joi.string().alphanum().required(),
    blockid: engine.joi.number(),
    type: engine.joi.number().valid(1),
    timestamp: engine.joi.number().min(0).required(),
    amount: engine.joi.number().valid(0),
    fee: engine.joi.number().min(1).required(),
    senderId: engine.joi.arkAddress().required(),
    senderPublicKey: engine.joi.arkPublicKey().required(),
    signature: engine.joi.string().alphanum().required(),
    asset: engine.joi.object({
      signature: engine.joi.object({
        publicKey: engine.joi.arkPublicKey().required()
      })
    }).required(),
    confirmations: engine.joi.number().min(0)
  }))

  return {
    data: value,
    passes: !error,
    fails: error
  }
}
