json-formater
=============
### Version: 0.1 ###

Node.js JSON data formater / comparator

Imagine: 
> You have stream where you recieve json data (e.g. twitter user/site stream) and you need save this data in DB, but before you save - you need classificate and format this data in your format. 

or

> You need validate json object (check whether properties exist and with correct values).

This module can do this.

Install
-------
...

Usage
-----
```javascript
var formater = require('json-formater');

//your skeleton
var expected_json = {
    status: true,
    data: {
        person_name: '@ignore_value',
        person_surname: '@ignore_value'
    }
}

//e.g. data from some stream
var actual_json = {
    status: true,
    data: {
        person_name: 'John',
        person_surname: 'Formater'
    }
}

//formatted object skeleton
var person = {
    name: '["data"]["person_name"]',
    surname: '["data"]["person_surname"]'
}

formater(expected_json, actual_json, person, function(match, person_obj) {

    if (match) {
        console.log(person_obj);
        //output (formatted data): { name: 'John', surname: 'Formater' }
    } else {
        console.log('Person data not found in actual json object');
    }
    
});
```
Params:
- ```expected_json```: json skeleton who must coincide against actual_json (param is required)
- ```actual_json```: any json data (param is required)
- ```person```: formatted object skeleton (param is optional)

Callback params:
- ```match```: 
  - ```true```: if ```expected_json``` matches with ```actual_json```, 
  - ```false```: if don't
- ```person_obj```: formatted json object (only if formatted object skeleton was passed)

About ```@ignore_value```
-------------------------
Write this flag (```@ignore_value```) as expected object property if you not interested in object property data, but this property must exist / or you necessary these data set to "formatted" object.

### Important: ###
- Only properties which is in "expected" object, can be set to "formatted" object.
- For data retrieving flags use only double quotes (e.g. ```name: '["data"]["person_name"]'```). 
