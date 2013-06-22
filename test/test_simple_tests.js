var formater = require('./../json-formater');

describe('simple tests', function(){

    it('#1 two identical bool compare', function(done){

        formater(false, false, function(isMatch){

            if (!isMatch) {
                throw 'booleans are equal';
            }

            done();
            
        });
    });
    
    it('#2 two identical string compare', function(done) {
        
        formater('asdfg', 'asdfg', function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    it('#3 two identical int compare', function(done) {
        
        formater(1234567890, 1234567890, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    it('#4 two identical empty array compare', function(done) {
        
        formater([], [], function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });

    it('#5 two identical empty object compare', function(done) {
        
        formater({}, {}, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    it('#6 expected object is empty - so all objects actual objects are true', function(done) {
        
        formater({}, {test: 1}, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    it('#7 expected array is empty - so all objects actual objects are true', function(done) {
        
        formater([], {test: 1}, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    
    it('#8 returl must return true - one level check', function(done) {
        
        formater({test: 1}, {test: 1}, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    
    it('#9 result must return true - two level check', function(done) {
        
        formater({test: 1, test2: {test3: false}}, {test: 1, test2: {test3: false}}, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });

    it('#10 result must return true', function(done) {
        
        formater({test: 1, test2: {test3: false, test4: {param: true, param2: false}}}, 
               {test: 1, test2: {test3: false, test4: {param: true, param2: false}}}, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });
    
    it('#11 result must return true', function(done) {
        
        var expected = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                param: {
                    
                },
                taram: {
                    test123: {
                        bool: false,
                        test: "123456**"
                    }
                }
            }
        }
        
        var actual = expected;
        
        formater(expected, actual, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            }

            done();
            
        });
    });

    it('#12 result must return true', function(done) {
        
        var expected = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                taram: {
                    test123: {
                        test: "123456**"
                    }
                }
            }
        }
        
        var actual = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                param: {
                    
                },
                taram: {
                    test123: {
                        bool: false,
                        test: "123456**"
                    }
                }
            }
        };
        
        formater(expected, actual, function(isMatch){

            if (!isMatch) {
                throw 'must be true';
            } else 

            done();
            
        });
    });
    
    it('#13 result must return false', function(done) {
        
        var expected = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                taram: {
                    test123: {
                        test: "123456*"  //missing one *
                    }
                }
            }
        }
        
        var actual = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                param: {
                    
                },
                taram: {
                    test123: {
                        bool: false,
                        test: "123456**"
                    }
                }
            }
        };
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            } else 

            done();
            
        });
    });
      
    it('#14 result must return false', function(done) {
        
        var expected = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                taram: {
                    test123: {
                        bool: true // bool is true
                    }
                }
            }
        }
        
        var actual = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                param: {
                    
                },
                taram: {
                    test123: {
                        bool: false,
                        test: "123456**"
                    }
                }
            }
        };
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            } 

            done();
            
        });
    });
    
    it('#15 result must return false', function(done) {
        
        var expected = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                taram: {
                    test123: {
                        bool: 0 // bool is zero
                    }
                }
            }
        }
        
        var actual = {
            test: {
                param: '123',
                tamra: 1235467
            },
            test45: {
                param: {
                    
                },
                taram: {
                    test123: {
                        bool: false,
                        test: "123456**"
                    }
                }
            }
        };
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
  
    it('#16 result must return false', function(done) {
        
        var expected = [1,2,3,4];
        
        var actual = [1,2];
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#17 result must return false', function(done) {
        
        var expected = {
            test: 1,
            test2: 2
        }
        
        var actual = [1,2];
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#18 result must return false', function(done) {
        
        var expected = {
            test: 1,
            test2: 2
        }
        
        var actual = {
            test: 1
        }
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#19 result must return true', function(done) {
        
        var expected = {
            test: [1,2,3,4],
            test2: 2
        }
        
        var actual = {
            test: [1,2,3,4],
            test2: 2
        }
        
        formater(expected, actual, function(isMatch){

            if (!isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#20 result must return false', function(done) {
        
        var expected = {
            test: [1,2,3,4],
            test2: 2
        }
        
        var actual = {
            test: [1,2,3],
            test2: 2
        }
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#21 result must return true', function(done) {
        
        var expected = {
            test: [1,{test: [1,2]},3,4],
            test2: 2
        }
        
        var actual = {
            test: [1,{test: [1,2]},3,4],
            test2: 2
        }
        
        formater(expected, actual, function(isMatch){

            if (!isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#22 result must return false', function(done) {
        
        var expected = {
            test: [1,{test: [1,2]},3,4],
            test2: 2
        }
        
        var actual = {
            test: [1,{test: [1,true]},3,4],
            test2: 2
        }
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#23 result must return true', function(done) {
        
        var expected = {
            test: function(){
                
            },
            test2: 2
        }
        
        var actual = {
            test: function() {
                
            },
            test2: 2
        }
        
        formater(expected, actual, function(isMatch){

            if (!isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
    
    it('#24 result must return fasle', function(done) {
        
        var expected = {
            test: function(){
                
            },
            test2: 2
        }
        
        var actual = {
            test2: 2
        }
        
        formater(expected, actual, function(isMatch){

            if (isMatch) {
                 throw 'must be false';
            }

            done();
            
        });
    });
 
    it('obj and false', function(done){

        formater({key:1}, false, function(isMatch){

            if (isMatch) {
                throw 'must be false';
            }

            done();
            
        });
    });

    it('obj and null', function(done){

        formater({key:1}, null, function(isMatch){

            if (isMatch) {
                throw 'must be false';
            }

            done();
            
        });
    });
    
});
