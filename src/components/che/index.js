import debug from 'debug';
const log = debug('react-che:');
//
let COMPONENTS_STORE_LISTENERS = {};
let STORE_ACTION_LISTENERS = {};
let STORES = {};
let ACTIONS = {};
let che = {
  stores: {} //.e.g. stores.backend.getState()
};
che.STORES = STORES;
che.store = cheStore();
che.action = cheAction();
che.reset = ()=>{
  log('reset');
  COMPONENTS_STORE_LISTENERS = {};
  STORE_ACTION_LISTENERS = {};
  STORES = {};
  ACTIONS = {};
  che.stores = {};
}
che.start = () => {
  log('start is deprecated. Remove the line'); 
}
che.defineActions = function(newActions) {
  let action;
  for (var x in newActions) {
    action = newActions[x].toUpperCase();
    //log('Defining action',action);
    if (typeof ACTIONS[newActions[x]] !== 'undefined') {
      throw Error('che: duplicated action ' + action);
    }
    ACTIONS[action] = action;
    ACTIONS[action+"_RESOLVE"] = action+"_RESOLVE";
    ACTIONS[action+"_REJECT"] = action+"_REJECT";
  }
  log('defineActions',newActions);
  che.action = cheAction();
}


function cheAction() {
  var availableActions = {};

  function createActionHandler(name) {
    availableActions[name] = async function(){
      let availableListeners = STORE_ACTION_LISTENERS[name];
      log('Action',name,availableListeners.length,'listeners');
      if (availableListeners) {
        for (var x in availableListeners) {
          availableListeners[x].apply({},arguments);
        }
      }
    }
    return false;//Action handlers always return false
  }
  for (var x in ACTIONS) {
    createActionHandler(ACTIONS[x]);
  }
  return availableActions;
}


che.defineStore = function(name, state, handler) {
  if (typeof STORES[name] !== 'undefined') {
    throw Error('che: ' + name + ' store is duplicated')
  }
  STORES[name] = name;
  che.stores[name] = {
    getState: () => state
  };
  log('defineStore',name);
  var scope = {
    on: (() => {
      var actions = {}
      for (var x in ACTIONS) {
        actions[ACTIONS[x]] = ((actionName) => {
          //log('Store',name,'binding action',ACTIONS[x]);
          return (listener) => {
            STORE_ACTION_LISTENERS[actionName] = STORE_ACTION_LISTENERS[actionName] || [];
            let storeListener = async function(){
              let args = Array.prototype.slice.call(arguments)
              args.unshift(state)
              let result = await listener.apply({}, args);
              if(result!==true){
                return; //State update only uppon result equal to true
              }
              let availableComponentStoreListeners = COMPONENTS_STORE_LISTENERS[name];
              if (availableComponentStoreListeners) {
                for (var i in availableComponentStoreListeners) {
                  availableComponentStoreListeners[i](state);
                }
              }
            }
            STORE_ACTION_LISTENERS[actionName].push(storeListener)
          }
        })(ACTIONS[x])
      }
      return actions;
    })()
  };
  handler(scope);
}

function cheStore() {
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  function updateState(cmp, name, state) {
    log('updateState',getDisplayName(cmp),name,state);
    cmp.setState({
      [name.toLowerCase()]: state
    });

  }
  return {
    bind: (cmp, stores) => {
      let storeName;

      let unbindListeners = [];
      for (var x in stores) {
        storeName = stores[x];
        if (typeof STORES[storeName] == 'undefined') {
          throw Error('che: unknown store ' + storeName)
        }
        COMPONENTS_STORE_LISTENERS[storeName] = COMPONENTS_STORE_LISTENERS[storeName] || [];
        COMPONENTS_STORE_LISTENERS[storeName].push((state) => {
          updateState(cmp, storeName, state);
        });


        unbindListeners.push(((length) => {
          //Original length after push
          return () => COMPONENTS_STORE_LISTENERS[storeName].splice(length - 1, 1);
        })(COMPONENTS_STORE_LISTENERS[storeName].length));

        let initialState = che.stores[storeName].getState();
        updateState(cmp, storeName, initialState);
      }


      var componentWillUnmountOriginal = cmp.componentWillUnmount;
      cmp.componentWillUnmount = function() {

        for (var x in unbindListeners) unbindListeners[x](); //remove listeners.
        componentWillUnmountOriginal && componentWillUnmountOriginal();
      }

    }
  }
}


export default che;