/* FluxStore.js
 * Basic Flux store
 * Dependencies: flux module
 * Author: Joshua Carter
 * Created: February 25, 2017
 */
"use strict";
//include modules
import Flux from 'flux';
import { Store } from 'flux/utils';
//create default dispatcher
var defaultDispatch = new Flux.Dispatcher();
//create class for our store
var FluxStore = class extends Store {
    constructor (Dispatch) {
        //call FluxStore constructor (pass dispatcher)
        super(Dispatch || defaultDispatch);
        //init flux actions
        this.fluxActions = {};
        //token used for removing listener
        this.listenerTokens = {};
    }
    
    //override FluxStore.__onDispatch, this method will be registered with the dispatcher
    __onDispatch (action) {
        //if we can handle this type of action AND
        //this flux store is supposed to be receiving it
        if (
            action.params && action.type in this.fluxActions && 
            (!("_id" in this) || !("id" in action) || action.id == this._id)
        ) {
            //call the handler for this action
            this[this.fluxActions[action.type]](...action.params);
        }
    }
    
    //to be used instead of FluxStore.__emitChange()
    emitChange () {
        this.__emitter.emit(this.__changeEvent);
    }
    
    //used to add listeners for our change event
    addChangeListener (callback) {
        //save token
        this.listenerTokens[callback] = this.addListener(callback);
    }
    
    //used to cleanup listeners on our change event
    removeChangeListener (callback) {
        if (this.listenerTokens[callback]) {
            this.listenerTokens[callback].remove();
        }
    }
};
//export FluxStore
export { FluxStore };
