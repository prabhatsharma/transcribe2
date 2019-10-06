<template>
  <div class="home">
    <h1> Transcription output</h1>
    <p>
      {{transcript}}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'transcription',
  components: {
  },
  data: function () {
    return { 
      transcript: ""
    }
    
  },
  mounted: function() {
    var vm = this
    this.$http.get("https://owdzod2rqa.execute-api.us-west-2.amazonaws.com/dev/job/" + this.$route.params.jobId).then(response=>{
      // console.log(response.data.response)
      vm.transcript = response.data.response
    })
  },
  methods: {

  }
}
</script>
