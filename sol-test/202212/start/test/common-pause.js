// SPDX-License-Identifier: MIT

module.exports = {

    pauseAfterInitialise: async function(flashLoanContract) {
        const paused = await flashLoanContract.paused.call();
        assert.equal(paused, false, "Unexpectedly, paused after initialise");
    },

    pauseRequest: async function(flashLoanContract) {
        await flashLoanContract.pause();
        const paused = await flashLoanContract.paused.call();
        assert.equal(paused, true, "Unexpectedly, paused after initialise");
    },

    unpauseRequest: async function(flashLoanContract) {
        await flashLoanContract.pause();
        await flashLoanContract.unpause();
        const paused = await flashLoanContract.paused.call();
        assert.equal(paused, false, "Unexpectedly, paused after initialise");
    },

    pauseRequestAccessControl: async function(flashLoanContract) {
        let didNotTriggerError = false;
        try {
            await flashLoanContract.pause({from: accounts[1]});
            didNotTriggerError = true;
        } catch(err) {
            // Expect that a revert will be called: see assert below.
            // console.log("ERROR! " + err.message);
        }
        assert.equal(didNotTriggerError, false, "Unexpectedly, pause from the wrong account didn't cause a revert");
    },

    unpauseRequestAccessControl: async function(flashLoanContract) {
        await flashLoanContract.pause();
        let didNotTriggerError = false;
        try {
            await flashLoanContract.unpause({from: accounts[1]});
            didNotTriggerError = true;
        } catch(err) {
            // Expect that a revert will be called: see assert below.
            // console.log("ERROR! " + err.message);
        }
        assert.equal(didNotTriggerError, false, "Unexpectedly, unpause from the wrong account didn't cause a revert");
    },
};




