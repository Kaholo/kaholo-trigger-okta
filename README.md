# kaholo-trigger-okta
Kaholo trigger for integration with Okta Event Hooks.

## How To Use
After installing the trigger on your kaholo server, create a new Event hook to this trigger's webhook in Okta admin console. Make sure to verify the event hook on Okta(which will send a verify request to the webhook on Kahlo). You can see more on creating event hooks [here](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-main.htm).

## Webhook URL
\<Kaholo-Server-URL\>/webhook/okta/event

## Method: Catch Event
Triggers when an event is sent to this method's webhook URL using POST HTTP method.

### Parameters
1. Event Types Patterns (Text) **Optional** - The event types to catch in this trigger. Can specify multiple event types by seperating each with a new line.
2. Event Severity (Options) **Optional** - The alert severity to catch in the trigger. Possible values: Any | Debug | Info | Warning | Error | Fatal.
Default Value is Any.
3. Include Higher Priority (Boolean) **Optional** - If true, also accept any events with a higher priority than the one specified in event severity. *Only relevant in case severity is not any.*

## Method: Verify
Triggers after a verify request to the event hook is sent from Okta using the webhook URL's and GET HTTP method.

### Parameters: None