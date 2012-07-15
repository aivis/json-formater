module.exports = function(expected_param, actual_param, fill_obj_param, callback_param) {
    
    /**
     * Actual json match
     */
    var total_match = true;
    
    /**
     * Current object property path
     */
    var current_path = '';
    
    /**
     * If set to true - check_fill_obj will be executed
     */
    var execute_check_fill_obj = true;
    
    /**
     * Check whether fill_obj_param is set
     */
    if (typeof fill_obj_param == 'function') {
        callback_param = fill_obj_param;
        fill_obj_param = {};
        execute_check_fill_obj = false;
    }
    
    /**
     * Check property data type or ignore if flag is set
     */
    var check_type = function(expected_value, actual_value) {
        
        //is ignored
        if (expected_value == '@ignore_value') {
            return true;
        }
        
        //is object
        if (typeof expected_value == 'object') {
            return typeof actual_value == 'object';
        }
        
        //is function
        if (typeof expected_value == 'function') {
            return typeof actual_value == 'function'; 
        }

        //compare values
        return expected_value === actual_value;
        
    }
    
    /**
     * Check object (fill_obj_param) patterns
     */
    var check_fill_object = function(search_pattern, value, fill_obj) {
        
        for (var key in fill_obj) {
            
            if (typeof fill_obj[key] == 'object') {
                check_fill_object(search_pattern, value, fill_obj[key]);
            }
            
            if (fill_obj[key] === search_pattern) {
                fill_obj[key] = value;
            }
        }
    }
    
    /**
     * Compare actual json object to expected skeleton
     */
    var compare = function(expected, actual, compare_callback) {
        
        //object key count
        var count = Object.keys(expected).length;
        var current_iteration = 0;

        for (var key in expected) {
            
            current_iteration++;
            
            //check whether key exist
            total_match = total_match && !(typeof actual[key] == 'undefined');

            //check data
            total_match = total_match && check_type(expected[key], actual[key]);
            
            //execute this only if current match is "true"
            if (total_match) {
                
                var key_pattern = '["'+key+'"]';
                
                if (execute_check_fill_obj) {
                
                    if (typeof compare_callback == 'function') {
                        //clear current path - new first level property
                        current_path = '';
                    }
                    //build current full path
                    current_path+= key_pattern;

                    check_fill_object(current_path, actual[key], fill_obj_param);

                }
                
                if (typeof expected[key] == 'object') {
                    compare(expected[key], actual[key]);
                } else {
                    var prev_pattern = current_path.split(key_pattern, 1);
                    current_path = prev_pattern[0];
                }
                
            }
            
            if (current_iteration == count || !total_match) {
                
                if (typeof compare_callback == 'function') {
                    compare_callback(total_match, fill_obj_param);
                    break;
                }
            }
        }
    }
    
    //if expected param not an object - simply compare
    if (typeof expected_param != 'object') {
        callback_param(expected_param === actual_param);
    //if expected param key count is zero - return true
    } else if (!Object.keys(expected_param).length) {
        callback_param(true);
    } else {
        compare(expected_param, actual_param, callback_param);
    }
    
}