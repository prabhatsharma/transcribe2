<template>
  <div class="home">
    <button class="btn btn-warning" @click.prevent="getSentiment">Get sentiment</button> <br>

    <div v-if="!sentimentError">
    {{sentiment.Sentiment}} - 
    {Mixed: {{Math.round(sentiment.SentimentScore.Mixed*100)}}% , 
    Negative: {{Math.round(sentiment.SentimentScore.Negative*100)}}% ,  
    Neutral: {{Math.round(sentiment.SentimentScore.Neutral*100)}}% , 
    Positive: {{Math.round(sentiment.SentimentScore.Positive*100)}}% }
    </div>
    <div v-if="sentimentError">
      {{sentimentErrorText}}
    </div>

    
    <h1> Transcription output</h1>
    <p>
      {{transcript}}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

import { Auth, Storage } from "aws-amplify";
import AWS from "aws-sdk";

import comprehend from "aws-sdk/clients/comprehend";

export default {
  name: 'transcription',
  components: {
  },
  data: function () {
    return { 
      transcript: "",
      sentiment: {
        SentimentScore: {}
      },
      sentimentError: true,
      sentimentErrorText: ""
    }
    
  },
  created: function() {
    var vm = this
    this.$http.get("https://owdzod2rqa.execute-api.us-west-2.amazonaws.com/dev/job/" + this.$route.params.jobId).then(response=>{
      // console.log(response.data.response)
      vm.transcript = response.data.response
    })
  },
  methods: {
    getSentiment: function(){ 
      var vm = this;

      Auth.currentCredentials().then(function(creds) {
        AWS.config.credentials = Auth.essentialCredentials(creds);

        var comprehend = new AWS.Comprehend({
          credentials: Auth.essentialCredentials(creds),
          region: "us-west-2"
        });

        var params = {
          LanguageCode: "en",
          Text: vm.transcript
        };
        comprehend.detectSentiment(params, function (err, data) {
          if (err) { 
            vm.sentimentError = true
            vm.sentimentErrorText = err.stack.substring(0, err.stack.indexOf("\n"))
            console.log(vm.sentimentErrorText); // an error occurred
          } 
          else {
            vm.sentimentError = false
            console.log(data);           // successful response
            vm.sentiment = data
          }    
        });


      });

    }
  }
}
</script>
