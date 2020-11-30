
// sets up dependencies
const Alexa = require('ask-sdk-core');

const Facts = [ "Tom Nudd is the president of compsoc",
          "Irenitemi does events for compsoc",
          "Heidi does finance for compsoc",
          "Ethan does tech for compsoc",
          "Merry is the secretary for compsoc",
          "Irenitemi's favourite food is jollof rice",
          "Ethan puts jam in his spag bol",
          "Tom is secretly a wizard",
          "*add some pls*"
  ]
// core functionality for fact skill
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const coolFact = randomFact()
    const speakOutput = "Here's a cool fact: " + coolFact;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(speakOutput)
      .getResponse();
  },
};
const BillyBHandler = {
    canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return (request.type === 'IntentRequest'
        && request.intent.name === 'BillyB_ify');
  },
  handle(handlerInput) {
    const fname = handlerInput.requestEnvelope.request.intent.slots.fname.value
    const lname = handlerInput.requestEnvelope.request.intent.slots.lname.value
    const speakOutput ="Well of course! It would be: " + fname[0].toUpperCase() + "illy " + lname[0].toUpperCase();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(speakOutput)
      .getResponse();
  },
}
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('HELP_MESSAGE'))
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('FALLBACK_MESSAGE'))
      .reprompt(requestAttributes.t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('STOP_MESSAGE'))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('ERROR_MESSAGE'))
      .reprompt(requestAttributes.t('ERROR_MESSAGE'))
      .getResponse();
  },
};



const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    BillyBHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();

let randomFact = () => Facts[Math.floor(Math.random() * (Facts.length + 1))]
