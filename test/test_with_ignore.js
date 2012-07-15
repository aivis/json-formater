var formater = require('./../json-formater');

describe('tests with @ignore_value', function(){
    
    it('must ignore value', function(done){

        formater([1, '@ignore_value', 3], [1, 14, 3], function(isMatch){

            if (!isMatch) {
                throw 'booleans are equal';
            }

            done();
            
        });
        
    });

    it('must ignore value', function(done){

        formater([1, '@ignore_value', {test: {test2: '@ignore_value'}}], [1, true, {test: {test2: 1234}}], function(isMatch){

            if (!isMatch) {
                throw 'booleans are equal';
            }

            done();
            
        });
        
    });

    it('must ignore value', function(done){

        formater({test: '@ignore_value'}, {test: 123}, function(isMatch){

            if (!isMatch) {
                throw 'booleans are equal';
            }

            done();
            
        });
        
    });
    
});