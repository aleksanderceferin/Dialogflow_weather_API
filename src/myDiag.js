const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const fetch = require("node-fetch");

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = "eat-what-hjnq") {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  process.env.GOOGLE_APPLICATION_CREDENTIALS =
    "./eat-what-hjnq-813c50b293a5.json";
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: "天氣如何",
        // The language used by the client (en-US)
        languageCode: "en-US"
      }
    }
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}

if (result.intent.displayName === "天氣") {
  //call weather
  let r = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=208bd65846f42a4bb1f62e16e47b0a86"
  );
  let json = await r.json();
  console.log(json);
}

runSample();
