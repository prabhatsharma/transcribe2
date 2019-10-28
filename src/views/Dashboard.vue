<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="circle total"> <p class="content-text">120 <br> Total</p></div>
        <div class="circle positive"> <p class="content-text">50 <br> Positive</p></div>
        <div class="circle negative"> <p class="content-text">20 <br> Negative</p></div>
        <div class="circle neutral"> <p class="content-text">40 <br> Neutral</p></div>
        <div class="circle mixed"> <p class="content-text">10 <br> Mixed</p></div>
      </div>
    </div>
    <br><br>
    <div class="row">
      <div class="col details">
        <h4 class="title-text">Positive</h4>
        <div class="hbar positive"></div>
        <div class="row">
          <div class="col-8 audio">Audio 1</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 2</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 3</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 4</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 5</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 6</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
        </div>
      </div>
      <div class="col details">
        <h4 class="title-text">Negative</h4>
        <div class="hbar negative"></div>
        <div class="row">
          <div class="col-8 audio">Audio 1</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 2</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 3</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 4</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 5</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 6</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
        </div>
      </div>
      <div class="col details">
        <h4 class="title-text">Neutral</h4>
        <div class="hbar neutral"></div>
        <div class="row">
          <div class="col-8 audio">Audio 1</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 2</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 3</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 4</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 5</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 6</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
        </div>
      </div>
      <div class="col details">
        <h4 class="title-text">Mixed</h4>
        <div class="hbar mixed"></div>
        <div class="row">
          <div class="col-8 audio">Audio 1</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 2</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 3</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 4</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 5</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
          <div class="col-8 audio">Audio 6</div><div class="col-2 neutral"><font-awesome-icon icon="info-circle"></font-awesome-icon></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

.title-text {
  margin-top: 10px;
}
.infobar {
  height: 25px;
  width: 25px;
  background-color: orange;
  border-radius: 50%;
  display: inline-block;
}

.audio {
  margin: 5px;
}

.details {
  background-color: rgb(247, 241, 241);
  margin: 10px;
  text-align: left;
}

.hbar {
  border-color: red;
  height: 20px;
  border: 10px solid;
  width: 100%;
  text-align: left;
}

.circle {
  border-radius: 50%;
  border: 9px solid;
  width: 100px;
  height: 100px;
  text-align: center;
  margin: 10px;
  display: inline-block;
  
}

.total {
  border-color: blue;
}

.positive {
  border-color: lightgreen;
}

.negative {
  border-color: red;
}

.neutral {
  border-color: orange;
}

.mixed {
  border-color: gray;
}

.content-text {
  margin-top: 20px;
}
</style>