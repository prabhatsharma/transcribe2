<template>
  <div class="about">
    <form> 
      <input class="form-control" type="file" accept=".mp3,.mp4,.wav,.flac" @change="handleFileChange" />
      <br>
      Language: {{language}}
      <select v-model="language">
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
      </select>
      <br>
      <button @click.prevent="startTranscribe">Start transcription</button>

      <br><button @click.prevent="checkJobStatus">Check Job status</button>
      <br> Job Status: {{jobStatus}}

      <br>Transcript<br> <p clas="transcript"> {{transcript}} </p>

    </form>

    
    
    <br />
    <br />
    <div class="myProgress">
      Upload progress: {{progress}} %
      <div class="myProgress">
        <img class="myBar" src="../assets/progressbar.png" v-bind:width="progress*4" height="20px" />
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import { Auth, Storage } from "aws-amplify";
import AWS from "aws-sdk";

import S3 from "aws-sdk/clients/s3";

// var transcribeservice = new AWS.TranscribeService();
import TranscribeService from "aws-sdk/clients/transcribeservice";

// var upload;

export default {
  data: function() {
    return {
      progress: 0,
      uploadedFileLocation: "",
      fileName: "",
      language: "",
      jobName: "",
      jobStatus: "",
      transcript: ""
    };
  },
  methods: {
    handleFileChange: function(event) {
      var vm = this;
      console.log("this.$store.state: ", this.$store.state);

      console.log(event.target.files);

      var file = event.target.files[0];
      var fileName = event.target.files[0].name;
      vm.fileName = fileName

      Auth.currentCredentials().then(function(creds) {
        AWS.config.credentials = Auth.essentialCredentials(creds);
        const s3 = new S3({
          credentials: Auth.essentialCredentials(creds)
        });

        var upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: "prabhat-temp",
            Key: "transcribe/" + fileName,
            Body: file
          }
        });

        upload.on("httpUploadProgress", function(event) {
          var currentValue = (event.loaded / event.total) * 100;
          console.log(
            "Upload progress: ",
            event.loaded / 1024,
            " kb of ",
            event.total / 1024,
            " kb - ",
            Math.round(currentValue, 2),
            " %"
          );

          vm.progress = Math.round(currentValue);
        });

        var promise = upload.promise();
        promise.then(res => {
          console.log(res);
          vm.uploadedFileLocation = res.Location
        }).catch(err=>{
          console.log(err);
        })
      });
    },
    startTranscribe: function() {
      var fileName = this.fileName
      var format = fileName.substring(fileName.length - 3, fileName.length)
      var jobName = fileName + "-" + Math.round(Math.random()*1000000000000)
      this.jobName = jobName
      var params = {
          "TranscriptionJobName": jobName,
          "LanguageCode": this.language,
          "MediaSampleRateHertz": 44100,
          "MediaFormat": format,
          "Media": {
              "MediaFileUri": this.uploadedFileLocation 
          }
      }

      console.log(params)

      Auth.currentCredentials().then(function(creds) {
        AWS.config.credentials = Auth.essentialCredentials(creds);

        var transcribeservice = new TranscribeService({
          credentials: Auth.essentialCredentials(creds),
          region: "us-west-2"
        })

        transcribeservice.startTranscriptionJob(params, function(err, data){
        if(err) { console.log(err)}
        else { 
          console.log(data)
        }
      })

      })

      
    },
    checkJobStatus: async function(){
      var vm = this

      var jobName = this.jobName

      Auth.currentCredentials().then(function(creds) {
        AWS.config.credentials = Auth.essentialCredentials(creds);

        var transcribeservice = new TranscribeService({
          credentials: Auth.essentialCredentials(creds),
          region: "us-west-2"
        })

        var params = {
          TranscriptionJobName: jobName /* required */
        };
        transcribeservice.getTranscriptionJob(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else  { 
            console.log(data);           // successful response
            vm.jobStatus = data.TranscriptionJob.TranscriptionJobStatus

            if(vm.jobStatus === "COMPLETED") {
              var TranscriptFileUri = data.TranscriptionJob.Transcript.TranscriptFileUri

              fetch(TranscriptFileUri).then(function(response) {
                if (response.status !== 200) {
                  console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                  return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                  console.log(data);
                  vm.transcript = data
                });
              })

            }

          }    
        });

      })

      

    }

  }
};
</script>

<style scoped>
.myProgress {
  background-color: lightblue;
  width: 400px;
  align-items: left;
  text-align: left;
}

.myBar {
  left: 0;
  align-items: left;
}

.transcript {
  color: red;
}
</style>