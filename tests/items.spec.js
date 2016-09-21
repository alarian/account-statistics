/* eslint-env node, mocha */
const expect = require('chai').expect
import itemsStatistics from '../src/statistics/items'

const generateAccount = (items) => {
  return {
    bank: items.slice(0, 1),
    characters: [{
      name: 'Holds items',
      equipment: items.slice(1, 2),
      bags: [
        {inventory: items.slice(2)}
      ]
    }]
  }
}

describe('statistics > items', () => {
  it('exits out when one of the permissions is missing', () => {
    const emptyObject = {legendaryItems: null, fractalTonics: null}

    const bothPermissions = {bank: null, characters: null}
    expect(itemsStatistics(bothPermissions)).to.deep.equal(emptyObject)

    const inventoriesPermission = {bank: null, characters: [{name: 'Yo'}]}
    expect(itemsStatistics(inventoriesPermission)).to.deep.equal(emptyObject)

    const charactersPermission = {bank: [{id: 30687}], characters: null}
    expect(itemsStatistics(charactersPermission)).to.deep.equal(emptyObject)
  })

  it('can calculate legendary count', () => {
    expect(itemsStatistics(generateAccount([
      {id: 123, count: 1},
      {id: 30687, count: 1},
      {id: 71383, count: 1},
      {id: 1, count: 1},
      {id: 7, count: 1}
    ])).legendaryItems).to.equal(2)
  })

  it('can calculate fractal tonic count', () => {
    expect(itemsStatistics(generateAccount([
      {id: 49277, count: 1},
      {id: 30687, count: 1},
      {id: 71383, count: 1},
      {id: 49277, count: 1},
      {id: 49277, count: 1}
    ])).fractalTonics).to.equal(3)
  })

  it('can calculate legendary insight count', () => {
    expect(itemsStatistics(generateAccount([
      {id: 77302, count: 50},
      {id: 30687, count: 1},
      {id: 71383, count: 1},
      {id: 77302, count: 1},
      {id: 77302, count: 4}
    ])).legendaryInsights).to.equal(55)
  })

  it('can calculate white mantle portal device count', () => {
    expect(itemsStatistics(generateAccount([
      {id: 78978, count: 1},
      {id: 30687, count: 1},
      {id: 71383, count: 1},
      {id: 78978, count: 1},
      {id: 78978, count: 1}
    ])).whiteMantlePortalDevice).to.equal(3)
  })
})
