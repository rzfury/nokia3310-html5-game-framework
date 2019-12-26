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
        console.error(`"${key}" is already registered`);
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
 * Get key pressed state
 * 
 * @param {string} keyStateName KeyState Name
 */
function IsPressed(keyStateName) {
    if(keyState.hasOwnProperty(keyStateName)) {
        return keyState[keyStateName].pressed;
    }
    else {
        console.error(`${keyStateName} is undefined in keyState.`);
        return false;
    }
}
