let keyState = {
    UP: {
        registeredKey: 'ArrowUp',
        pressed: false
    },
    DOWN: {
        registeredKey: 'ArrowDown',
        pressed: false
    },
    LEFT: {
        registeredKey: 'ArrowLeft',
        pressed: false
    },
    RIGHT: {
        registeredKey: 'ArrowRight',
        pressed: false
    },
    ESCAPE: {
        registeredKey: 'Escape',
        pressed: false
    }
}

/**
 * Handler when a key is pressed
 * 
 * @param {KeyboardEvent} event
 */
function KeyDownHandle(event) {
    if(!event.ctrlKey) event.preventDefault();
    
    for(let key in keyState) {
        if(keyState[key].registeredKey == event.key) {
            keyState[key].pressed = true;
        }
    }
}

/**
 * Handler when a key is released
 * 
 * @param {KeyboardEvent} event
 */
function KeyUpHandle(event) {
    if(!event.ctrlKey) event.preventDefault();
    
    for(let key in keyState) {
        if(keyState[key].registeredKey == event.key) {
            keyState[key].pressed = false;
        }
    }
}

/**
 * Register a key to the `KeyState`
 * 
 * @param {string} keyStateName Key name for new `KeyState`
 * @param {string} keyCode Keyboard Event KeyCode
 */
function RegisterKey(keyStateName, keyCode) {
    const keyName = keyStateName.toUpperCase();
    if(keyState.hasOwnProperty(keyName)) {
        console.error(`"${keyStateName}" is already exists in keyState`);
        return false;
    } else {
        Object.assign(keyState, {
            [keyName]: {
                registeredKey: keyCode,
                pressed: false
            }
        });
        return keyState[keyName];
    }
}

/**
 * Remove a key from `keyState`
 * 
 * @param {string} keyStateName Key name for new `KeyState`
 */
function UnregisterKey(keyStateName) {
    const keyName = keyStateName.toUpperCase();
    if(keyState.hasOwnProperty(keyName)) {
        delete keyState[keyName];
    }
    else {
        console.error(`"${keyStateName}" is undefined on keyState.`);
    }
}

/**
 * Get key pressed state
 * 
 * @param {string} keyStateName KeyState Name
 */
function IsPressed(keyStateName) {
    const keyName = keyStateName.toUpperCase();
    if(keyState.hasOwnProperty(keyName)) {
        return keyState[keyName].pressed;
    }
    else {
        console.error(`"${keyStateName}" is undefined in keyState.`);
        return false;
    }
}

function _InitKeyHandler() {
    window.addEventListener('keydown', KeyDownHandle);
    window.addEventListener('keyup', KeyUpHandle);
}
