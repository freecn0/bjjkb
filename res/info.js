//name:    姓名，显示在主页和扫码/查询页底部
//id:      身份证号（匿名形式，只显示前2位和后2位，其余用*代替）
//imgData: 照片用base64编码后的内容
var name = localStorage.getItem("name");
var id = localStorage.getItem("id");
var imgData = localStorage.getItem("imgData");
hsStatusUpdate();
ymStatusUpdate();

if (name == undefined || id == undefined || imgData == undefined){
	//当任何一个信息未知时，显示输入信息界面。
	document.getElementById("frontPage").style.display = 'none';
	document.getElementById("infoInput").style.display = 'block';
	console.log("No name or id, promt to get user info.");
}else{
	document.getElementById("personalName").innerHTML = name;
	var personalAnonymousNames = document.getElementsByClassName("personalNameAnonymous");
	[].forEach.call(personalAnonymousNames, function (el) {
		el.innerHTML = name[0]+"*";
	});

	var hsymNames = document.getElementsByClassName("hsymName");
	[].forEach.call(hsymNames, function (el) {
		el.innerHTML = name[0]+"**";
	});

	var personalIds = document.getElementsByClassName("personalId");
	[].forEach.call(personalIds, function (el) {
		el.innerHTML = id;
	});

	var personalImages = document.getElementsByClassName("personalImage");
	[].forEach.call(personalImages, function (el) {
		el.src = "data:image/png;base64," + imgData;
	});

}

function showInfo()
{
	document.getElementById("frontPage").style.display = 'none';
	document.getElementById("infoPage").style.display = 'block';
	//back to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function showhsym()
{
	document.getElementById("frontPage").style.display = 'none';
	document.getElementById("hsymPage").style.display = 'block';
}

function backToFront()
{
	document.getElementById("infoPage").style.display = 'none';
	document.getElementById("saomaPage").style.display = 'none';
	document.getElementById("hsymPage").style.display = 'none';
	document.getElementById("frontPage").style.display = 'block';
	//back to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function updateInfo()
{
	var name = document.getElementById("nameText").value;
	localStorage.setItem("name", name);
	var id = document.getElementById("idText").value;
	localStorage.setItem("id", id);
	var avatar= document.getElementById('avatarImg');
	var imgData = getBase64Image(avatar);
	localStorage.setItem("imgData", imgData);

	var dose1Date = document.getElementById("dose1Dateinput").value;
	localStorage.setItem("dose1Date",dose1Date);
	var dose2Date = document.getElementById("dose2Dateinput").value;
	localStorage.setItem("dose2Date",dose2Date);
	var dose3Date = document.getElementById("dose3Dateinput").value;
	localStorage.setItem("dose3Date",dose3Date);

	var dose1Prod = document.getElementById("dose1Prodinput").value;
	localStorage.setItem("dose1Prod",dose1Prod);
	var dose2Prod = document.getElementById("dose2Prodinput").value;
	localStorage.setItem("dose2Prod",dose2Prod);
	var dose3Prod = document.getElementById("dose3Prodinput").value;
	localStorage.setItem("dose3Prod",dose3Prod);

	var dose1Type = document.getElementById("dose1Typeinput").value;
	localStorage.setItem("dose1Type",dose1Type);
	var dose2Type = document.getElementById("dose2Typeinput").value;
	localStorage.setItem("dose2Type",dose2Type);
	var dose3Type = document.getElementById("dose3Typeinput").value;
	localStorage.setItem("dose3Type",dose3Type);
	window.location.reload();
}

function readURL(input)
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('avatarImg').src =  e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function vaxShow() {
    document.getElementById("vaxShowButton").style.display="none";
    document.getElementById("vaxText").style.display="block";
    document.getElementById("vaxHideButton").style.display="block";
}

function vaxHide() {
    document.getElementById("vaxText").style.display="none";
    document.getElementById("vaxHideButton").style.display="none";
    document.getElementById("vaxShowButton").style.display="block";
}

function playAudio(){
    var audio = null;
    audio = document.getElementById("audio0");
    audio.currentTime = 0;
    audio.play();
}

function cameraOn() {
  document.getElementById("frontPage").style.display = "none";
  document.getElementById("cameraPage").style.display = "block";
  var video = document.querySelector("#videoElement");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'environment'} })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }

  video.addEventListener("click",stop,false);

  function stop(e) {
    var stream = video.srcObject;
    if (stream == null){
      return;
    }
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
    document.getElementById("cameraPage").style.display = "none";
    document.getElementById("saomaPage").style.display = "block";
    playAudio();
  }
}

function switchToImg() {
  swiper.autoplay.stop();
  document.getElementsByClassName("texts")[0].style.display = "none";
  document.getElementsByClassName("titleImg")[0].style.display = "block";
}

function switchToNotice() {
  document.getElementsByClassName("titleImg")[0].style.display = "none";
  document.getElementsByClassName("texts")[0].style.display = "flex";
  swiper.autoplay.start();
}

function hsStatusUpdate()
{
  var checkDate = localStorage.getItem("checkDate");
  var nowtime = new Date();
  if (checkDate != undefined){
    checktime = new Date(checkDate);
    var days = Math.floor((nowtime - checktime)/(24*3600*1000));
    if (days < 1 ){
      hsStatusFlush();
      return;
    }
  }
  //record too old or even do not have one
  //go back 10.24 hours
  checkDate = new Date(nowtime - 36864000);
  localStorage.setItem('checkDate',checkDate.toISOString());
  const labNames = [
"北京凯普医学检验实验室",
"北京千麦医学检验实验室",
"北京迪安医学检验实验室",
"北京美因医学检验实验室",
"北京诺尼医学检验实验室",
"北京优迅医学检验实验室",
"北京致朴医学检验实验室",
  ]
  var labName = labNames[Math.floor(Math.random()*labNames.length)];
  localStorage.setItem('labName',labName);
  hsStatusFlush();
}

function hsStatusFlush()
{
  var checkDate = localStorage.getItem("checkDate");
  var checktime = new Date(checkDate);
  const NUMBERS = ["00",
	  	   "01","02","03","04","05","06","07","08","09","10",
	           "11","12","13","14","15","16","17","18","19","20",
	           "21","22","23","24","25","26","27","28","29","30",
	           "31","32","33","34","35","36","37","38","39","40",
	           "41","42","43","44","45","46","47","48","49","50",
	           "51","52","53","54","55","56","57","58","59","60",
  ];
  var outputString = ''+checktime.getFullYear()+"-"+NUMBERS[checktime.getMonth()+1]+"-"+NUMBERS[checktime.getDate()]+" "+NUMBERS[checktime.getHours()]+":"+NUMBERS[checktime.getMinutes()]+":"+NUMBERS[checktime.getSeconds()];
  document.getElementsByClassName("checkDate")[0].innerHTML = outputString;
  var labName = localStorage.getItem('labName',labName);
  document.getElementsByClassName("labName")[0].innerHTML = labName;
}

function ymStatusUpdate()
{
  var dose1Date = localStorage.getItem("dose1Date");
  var dose2Date = localStorage.getItem("dose2Date");
  var dose3Date = localStorage.getItem("dose3Date");

  if (dose1Date == undefined || dose2Date == undefined || dose3Date == undefined){
  var now = new Date();
  var dose3time = new Date(now - 89*24*3600*1000);
  dose3Date = dose3time.toISOString().split('T')[0];
  var dose2time = new Date(now - (89+192)*24*3600*1000);
  dose2Date = dose2time.toISOString().split('T')[0];
  var dose1time = new Date(now - (89+192+35)*24*3600*1000);
  dose1Date = dose1time.toISOString().split('T')[0];

  localStorage.setItem("dose1Prod","北京生物");
  localStorage.setItem("dose2Prod","北京生物");
  localStorage.setItem("dose3Prod","北京生物");
  localStorage.setItem("dose1Type","新冠疫苗（Vero细胞）");
  localStorage.setItem("dose2Type","新冠疫苗（Vero细胞）");
  localStorage.setItem("dose3Type","新冠疫苗（Vero细胞）");
  localStorage.setItem("dose1Date",dose1Date);
  localStorage.setItem("dose2Date",dose2Date);
  localStorage.setItem("dose3Date",dose3Date);
  }
  ymStatusFlush();
}

function ymStatusFlush()
{
  var dose1Prod = localStorage.getItem("dose1Prod");
  document.getElementById("dose1Prod").innerHTML = dose1Prod;
  var dose2Prod = localStorage.getItem("dose2Prod");
  document.getElementById("dose2Prod").innerHTML = dose2Prod;
  var dose3Prod = localStorage.getItem("dose3Prod");
  document.getElementById("dose3Prod").innerHTML = dose3Prod;

  var dose1Type = localStorage.getItem("dose1Type");
  document.getElementById("dose1Type").innerHTML = dose1Type;
  var dose2Type = localStorage.getItem("dose2Type");
  document.getElementById("dose2Type").innerHTML = dose2Type;
  var dose3Type = localStorage.getItem("dose3Type");
  document.getElementById("dose3Type").innerHTML = dose3Type;

  var dose1Date = localStorage.getItem("dose1Date");
  document.getElementById("dose1Date").innerHTML = dose1Date;
  var dose2Date = localStorage.getItem("dose2Date");
  document.getElementById("dose2Date").innerHTML = dose2Date;
  var dose3Date = localStorage.getItem("dose3Date");
  document.getElementById("dose3Date").innerHTML = dose3Date;

  var dose3time = new Date(dose3Date);
  var nowtime = new Date();
  var days = Math.floor((nowtime - dose3time)/(24*3600*1000));
  deltaDays = "距离第三剂次接种完成已过 "+days+" 天";
  document.getElementById("deltaDays").innerHTML = deltaDays;
}
