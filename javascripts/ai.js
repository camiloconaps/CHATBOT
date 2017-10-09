//CONFIGURACION SDK PARA AVATAR ANIMADO
      

SDK.applicationId = "8588587813089245551";
var sdk = new SDKConnection();
var web = new WebAvatar();
var user = new UserConfig();
user.user = "CAMILOICC";
user.token = "2553073195530597232";
sdk.connect(user, function() {
web.connection = sdk;
web.avatar = "838582";
web.voice = "";
web.voiceMod = "";
web.width = "275";
web.height = "183";
web.createBox();
web.addMessage("Welcome to my website", "", "", "");
web.processMessages();
	  
//CONFIGURACION DE API.AI
      var accessToken = "bbc40a80fe5446f688e74bade2ac8121";
      var baseUrl = "https://api.api.ai/v1/";
      $(document).ready(function() {
      $("#chat").keypress(function(event) {
      if (event.which == 13) {
      event.preventDefault();
      send();
      }
      });
      $("#rec").click(function(event) {
      switchRecognition();
      });
      });
      var recognition;
      function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.onstart = function(event) {
      updateRec();
      };
      recognition.onresult = function(event) {
      var text = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
      }
      setInput(text);
      stopRecognition();
      };
      recognition.onend = function() {
      stopRecognition();
      };
      recognition.lang = "es";
      recognition.start();
      }
      function stopRecognition() {
      if (recognition) {
      recognition.stop();
      recognition = null;
      }
      updateRec();
      }
      function switchRecognition() {
      if (recognition) {
      stopRecognition();
      } else {
      startRecognition();
      }
      }
      function setInput(text) {
      $("#chat").val(text);
      send();
      }
      function updateRec() {
      $("#rec").text(recognition ? "mic" : "mic_none");
      }
      function send() {
      var text = $("#chat").val();
      $.ajax({
      type: "POST",
      url: baseUrl + "query?v=20150910",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
      "Authorization": "Bearer " + accessToken
      },
      data: JSON.stringify({ query: text, lang: "es", sessionId: "somerandomthing" }),
      success: function(data) {
      var uteracion = data.result.resolvedQuery;
      var respuesta = data.result.fulfillment.speech;
      var intencion = data.result.metadata.intentName;
      var confidencia = data.result.score * 100;
      console.log("Mensaje: " + uteracion);
      console.log("Intención: " + intencion);
      console.log("Respuesta: " + respuesta);
      setResponse(respuesta, intencion, confidencia, uteracion);
      },
      error: function() {
      setResponse("Internal Server Error");
      }
      });

      }
      function setResponse(val, intent, confidencia, uteracion) {
      $("#response").text("Bot: "+val);
      web.addMessage(val, "", "", "");
      web.processMessages();
      }
