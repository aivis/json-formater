var formater = require('./../json-formater');

var expected_json = {
    status: true,
    data: {
        person_name: '@ignore_value',
        person_surname: '@ignore_value'
    }
}

var actual_json = {
    status: true,
    data: {
        person_name: 'John',
        person_surname: 'Formater'
    }
}

var person = {
    name: '["data"]["person_name"]',
    surname: '["data"]["person_surname"]'
}

formater(expected_json, actual_json, person, function(is_match, person_obj) {

    if (is_match) {
        console.log(person_obj);
    } else {
        console.log('Person data not found in actual json object');
    }
    
});