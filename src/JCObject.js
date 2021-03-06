/* JCObject.js
 * Represents a basic object class with a getter and setter
 * Dependencies: extend module
 * Author: Joshua Carter
 * Created: July 1, 2016
 */
"use strict";
//include modules
import extend from 'extend';
//create class to represent a basic object
var JCObject = class {
        // - model (obj) An object of property names and default values 
        //               to use to create the object
        constructor (model) {
            var val;
            //default value for id
            this._id = 0;
            //create additional props 
            //(given default id will overwrite above default)
            for (let prop in model) {
                val = model[prop];
                //if this prop doesn't have a private name
                if (prop.indexOf("_") != 0) {
                    //make it so
                    prop = "_" + prop;
                }
                //init property
                this[prop] = val;
            }
            //internal id of the object
            this._id = Math.floor(Math.random() * 1000000);
        }
        
        //converts a property's name to a property in this entry
        _convertProp (prop) {
            //if this prop is private, update the name
            if (!(prop in this) && ("_" + prop) in this) {
                prop = "_" + prop;
            }
            return prop;       
        }
        
        //GETTERS
        // gets a property value
        // - prop (string, array) The name(s) of the property(ies) to get
        // - returns (all) The property value, or an object of all properties requested
        get (prop) {
            var collection;
            //if we received a prop name
            if (typeof prop == "string") {
                //return value using converted single prop
                return this[this._convertProp(prop)];
            }   //else, we must have received multiple props
            //loop props
            collection = {};
            for (var i=0; i<prop.length; i++) {
                //add prop to collection
                collection[prop[i]] = this[this._convertProp(prop[i])];
            }
            //return collection     
            return collection;
        }
        
        //SETTERS
        // updates with new data
        // - data (obj, string) A collection of properties and new values to 
        //                      update OR the name of a single property to update  
        // - val (string -- optional) If data is string (single prop), the 
        //                            value to update it to
        // returns (obj) This
        update (data, val) {
            var newData = {};
            //if we received a single prop and value
            if (typeof data == "string") {
                //if this prop is private, update the name
                data = this._convertProp(data);
                //if this property doesn't exist, don't create it
                if (typeof this[data] == "undefined") {
                    return this;
                }
                //update the single prop
                this[data] = val;
            }
            //if we received data
            else if (typeof data == "object" && data !== null) {
                //loop the data
                for (var prop in data) {
                    //if this prop is private, update the name
                    //if this property exists
                    if (typeof this[this._convertProp(prop)] != "undefined") {
                        //add it to new data
                        newData[this._convertProp(prop)] = data[prop];
                    }
                }
                //extend default props with new data
                extend(this, newData);
            }
            return this;
        }
        
        
    };
//export JCObject class
export { JCObject };
