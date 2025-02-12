'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      states.push(currentState);
    }

    if (type === 'removeProperties') {
      currentState = deleteKeys({ ...currentState }, action.keysToRemove);
      states.push(currentState);
    }

    if (type === 'clear') {
      currentState = {};
      states.push(currentState);
    }
  }

  return states;
}

function deleteKeys(state, keys) {
  for (const key of keys) {
    delete state[key];
  }

  return state;
}

module.exports = transformStateWithClones;
