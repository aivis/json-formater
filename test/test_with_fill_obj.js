var formater = require('./../json-formater');

describe('tests with object fill', function(){
    
    it('#1 simple object fill', function(done){
        
        var expected = {
            status: true,
            data: '@ignore_value'
        }
        
        var actual = {
            status: true,
            data: 'data data'
        }
        
        var fill_obj = {
            data: '["data"]'
        }
        
        formater(expected, actual, fill_obj, function(isMatch, filled_obj){

            if (!isMatch) {
                throw 'match pattern is correct';
            }
            
            if (filled_obj.data !== actual.data) {
                throw 'incorrect filled_obj data';
            }

            done();
            
        });
    });
    
    it('#2 tricky object fill', function(done){
        
        var expected = {
            status: true,
            data: '@ignore_value',
            data2: {
                data_2_status: false
            }
        }
        
        var actual = {
            status: true,
            data2: {
                data_2_status: false,
                data: {test: true}
            },
            data: 'data data'   
        }
        
        var fill_obj = {
            data: '["data"]',
            data2: '["data2"]'
        }
        
        formater(expected, actual, fill_obj, function(isMatch, filled_obj){

            if (!isMatch) {
                throw 'match pattern is correct';
            }
            
            if (filled_obj.data !== actual.data) {
                throw 'incorrect filled_obj data';
            }
            
            if (filled_obj.data2.data2_status !== actual.data2.status && typeof filled_obj.data2.data == 'object') {
                throw 'incorrect filled_obj data';
            }
            
            done();
            
        });
    });
    
    it('#3 tricky object fill', function(done){
        
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
            
            if (!is_match) {
                throw 'match pattern is correct';
            }
            
            if (person_obj.name === actual_json.data.person_name && person_obj.surname === actual_json.data.person_surname) {
                done();
            } else {
                done('Incorrect filled object data');
            }

        });
    });
});