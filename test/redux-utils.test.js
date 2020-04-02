import * as ReactUtils from '../src/ReduxUtils'


import sample from './_datasample'


const dumbList = [
    'a',
    'b',
    'c',
    'd'
]

test('delFromList',()=>{

    let result = ReactUtils.delFromList(dumbList,'c')

    expect(
        result
    ).toEqual(["a", "b", "d" ])


});


test('delFromListByProp',()=>{
    let result = ReactUtils.delFromListByProp('age_subrange',sample,'K3')

    expect(
        result
    ).toEqual([{"__v": 0, "_id": "5d52845d81d15bd5a0b4f519", "accident": false, "age_range": "AKL-KIN", "age_subrange": "K1", "basef": "1", "basep": "0", "canton": "GE", "cost": 130.2, "country": "CH", "franchise": "FRA-0", "franchise_class": "FRAST1", "id": "5d52845d81d15bd5a0b4f519", "insurer_code": "1384", "region_code": "PR-REG CH0", "tarif": "CASA", "tarif_name": "FAVORIT CASA", "tarif_type": "TAR-HAM", "year": "2019", "year_2": "2018"}, {"__v": 0, "_id": "5d52845d81d15bd5a0b4f521", "accident": false, "age_range": "AKL-KIN", "age_subrange": "K1", "basef": "0", "basep": "0", "canton": "GE", "cost": 119.4, "country": "CH", "franchise": "FRA-200", "franchise_class": "FRAST3", "id": "5d52845d81d15bd5a0b4f521", "insurer_code": "1384", "region_code": "PR-REG CH0", "tarif": "CASA", "tarif_name": "FAVORIT CASA", "tarif_type": "TAR-HAM", "year": "2019", "year_2": "2018"}]
    )

});


test('delFromListByPropId',()=>{
    let result = ReactUtils.delFromListByPropId(sample,'5d52845d81d15bd5a0b4f525')

    expect(
        result
    ).toEqual(
        [{"__v": 0, "_id": "5d52845d81d15bd5a0b4f519", "accident": false, "age_range": "AKL-KIN", "age_subrange": "K1", "basef": "1", "basep": "0", "canton": "GE", "cost": 130.2, "country": "CH", "franchise": "FRA-0", "franchise_class": "FRAST1", "id": "5d52845d81d15bd5a0b4f519", "insurer_code": "1384", "region_code": "PR-REG CH0", "tarif": "CASA", "tarif_name": "FAVORIT CASA", "tarif_type": "TAR-HAM", "year": "2019", "year_2": "2018"}, {"__v": 0, "_id": "5d52845d81d15bd5a0b4f51d", "accident": false, "age_range": "AKL-KIN", "age_subrange": "K3", "basef": "1", "basep": "0", "canton": "GE", "cost": 54.3, "country": "CH", "franchise": "FRA-0", "franchise_class": "FRAST1", "id": "5d52845d81d15bd5a0b4f51d", "insurer_code": "1384", "region_code": "PR-REG CH0", "tarif": "CASA", "tarif_name": "FAVORIT CASA", "tarif_type": "TAR-HAM", "year": "2019", "year_2": "2018"}, {"__v": 0, "_id": "5d52845d81d15bd5a0b4f521", "accident": false, "age_range": "AKL-KIN", "age_subrange": "K1", "basef": "0", "basep": "0", "canton": "GE", "cost": 119.4, "country": "CH", "franchise": "FRA-200", "franchise_class": "FRAST3", "id": "5d52845d81d15bd5a0b4f521", "insurer_code": "1384", "region_code": "PR-REG CH0", "tarif": "CASA", "tarif_name": "FAVORIT CASA", "tarif_type": "TAR-HAM", "year": "2019", "year_2": "2018"}]
    )

});

test('addToList',()=>{
    let result = ReactUtils.addToList(dumbList,'hello')

    expect(
        result
    ).toEqual(
        ["a", "b", "c", "d", "hello"]
    )

});

test('delFromObjectByPropValue',()=>{
    let result = ReactUtils.delFromObjectByKey("age_subrange",sample[1])

    expect(
        result
    ).toEqual(
        {"__v": 0, "_id": "5d52845d81d15bd5a0b4f51d", "accident": false, "age_range": "AKL-KIN", "basef": "1", "basep": "0", "canton": "GE", "cost": 54.3, "country": "CH", "franchise": "FRA-0", "franchise_class": "FRAST1", "id": "5d52845d81d15bd5a0b4f51d", "insurer_code": "1384", "region_code": "PR-REG CH0", "tarif": "CASA", "tarif_name": "FAVORIT CASA", "tarif_type": "TAR-HAM", "year": "2019", "year_2": "2018"}
    )

});
