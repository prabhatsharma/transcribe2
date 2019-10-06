<template>
  <div>
    <p>
      <button @click.prevent="getJobs" >Refresh</button> &nbsp;&nbsp;&nbsp;
      <button @click.prevent="deleteJobs" >Delete All Jobs</button>
      <br>

      <table class="table table-striped">
        <thead>
          <th>#</th>
          <th>Job name</th>
          <th>Language Code</th>
          <th>Creation time</th>
          <th>Completion time</th>
          <th>Job status</th>
        </thead>
        <tbody>
          <tr v-for="(job, index) in jobList" v-bind:key="job.TranscriptionJobName">
            <td>{{index + 1}}</td>
            <td class="field"><router-link match="exact" :to="'/transcription/' + job.TranscriptionJobName" > {{job.TranscriptionJobName}}</router-link> </td>
            <td>{{job.LanguageCode}}</td>
            <td class="field">{{job.CreationTime| date}}</td>
            <td class="field">{{job.CompletionTime | date}}</td>
            <td>{{job.TranscriptionJobStatus}}</td>
          </tr>
        </tbody>
      </table>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

import { Auth, Storage } from "aws-amplify";
import TranscribeService from "aws-sdk/clients/transcribeservice";

export default {
  name: 'home',
  data: function () {
    return {
      jobList: []
    }
  },
  computed: {
    jobs: function () {
      return this.$store.state.jobList
    }
  },
  created: function(){
    setTimeout(this.getJobs, 300)
  },
  methods: {
    getJobs: function(){
      var vm = this
      Auth.currentCredentials().then(function(creds) {
        AWS.config.credentials = Auth.essentialCredentials(creds);

        var transcribeservice = new TranscribeService({
          credentials: Auth.essentialCredentials(creds),
          region: "us-west-2"
        })

        var params = {
          MaxResults: 100
        }


        transcribeservice.listTranscriptionJobs(params, function(err, data){
          if(err) { console.log(err)}
          else { 
            vm.$store.state.jobList = data.TranscriptionJobSummaries
            vm.jobList = data.TranscriptionJobSummaries
            }
          })
      })
    },
    deleteJobs: function () {
      var vm = this
      Auth.currentCredentials().then(function(creds) {
        AWS.config.credentials = Auth.essentialCredentials(creds);

        var transcribeservice = new TranscribeService({
          credentials: Auth.essentialCredentials(creds),
          region: "us-west-2"
        })

        for(var i=0; i <vm.jobList.length; i++){
          var params = {
            TranscriptionJobName: vm.jobList[i].TranscriptionJobName
          };
          transcribeservice.deleteTranscriptionJob(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });
        }
      })
    }
  }
}
</script>

<style scoped>
.field {
  text-align: left;
}
</style>
