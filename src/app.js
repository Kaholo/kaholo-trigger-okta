const micromatch = require("micromatch");
const parsers = require("./parsers");

async function alert(req, res, settings, triggerControllers) {
  try {
    const events = req.body.data.events;
    events.forEach(event => {
      const eventType = event.eventType;
      const severity = parsers.severity(event.severity);
      triggerControllers.forEach((trigger) => {
        let {alertEventTypes, alertSeverity, includeHigherSeverity} = trigger.params;
        alertEventTypes = alertEventTypes ? alertEventTypes.split("\n").map(eType => eType.trim()) : undefined;
        alertSeverity = parsers.severity(alertSeverity);
  
        if (alertEventTypes && !alertEventTypes.some(eType => micromatch.isMatch(eventType, eType))) return;
        if (alertSeverity !== "Any"){
          if (alertSeverity > severity) return;
          if (!includeHigherSeverity && alertSeverity != severity) return;
        }
        trigger.execute(`Okta Event: ${eventType} ${event.displayMessage}`, event);
      });
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message || JSON.stringify(err));
  }
}

async function verify(req, res) {
  const reqChanllenge = req.headers['x-okta-verification-challenge'];
  if (reqChanllenge){
    res.status(200).send({"verification" : reqChanllenge});
  }
  else {
    res.status(422).send("Unknown Request Format");
  }
}

module.exports = { 
  alert,
  verify
};