'use strict';

/*
requirejs.config({
  baseUrl: "assets/script",
  paths: {
    domReady: "https://s3.shawxu.net/js/lib/requirejs/plugins/domReady.2.0.1"
  }
});

require(['domReady'], (domReady) => {
  domReady(() => {
    //This function is called once the DOM is ready.
    //It will be safe to query the DOM and manipulate
    //DOM nodes in this function.
    console.log('OK');

  });
}); */

((_w, _d) => {
  const SECOND = 1000;
  let [dts, ddv, dsv, dtv, dev] = _d.querySelectorAll('#dateTimeString, #dateValue, #timeValue, #todayValue, #edgeValue');

  //let [dtv] = _d.querySelectorAll('#todayValue');

  //let [dev] = _d.querySelectorAll('#edgeValue');

  function timerShow(dDateTimeString, dDateValue, dTimeValue, dTodayValue, dEdgeValue) {
    let tm = new Date();
    let yr = tm.getFullYear();

    let mh = tm.getMonth() + 1;
    (mh < 10) && (mh = '0' + mh);

    let dt = tm.getDate();
    (dt < 10) && (dt = '0' + dt);

    let hr = tm.getHours();
    (hr < 10) && (hr = '0' + hr);

    let mn = tm.getMinutes();
    (mn < 10) && (mn = '0' + mn);

    let sc = tm.getSeconds();
    (sc < 10) && (sc = '0' + sc);

    if(dDateTimeString && dDateTimeString.innerHTML) {
      dDateTimeString.textContent = `${yr}-${mh}-${dt} ${hr}:${mn}:${sc}`;
    }

    if(dDateValue && dDateValue.innerHTML) {
      dDateValue.textContent = `${yr}年${mh}月${dt}日`;
    }
    if(dTimeValue && dTimeValue.innerHTML) {
      dTimeValue.textContent = `${hr}:${mn}:${sc}`;
    }

    ('undefined' === typeof timerShow._counter_) && (timerShow._counter_ = 0);

    if(timerShow._counter_ < 1) {
      if(dTodayValue && dTodayValue.innerHTML) {
        dTodayValue.textContent = `${mh}-${dt} ${hr}:${mn}`;
      }

      if(dEdgeValue && dEdgeValue.innerHTML) {
        dEdgeValue.textContent = `${mh}-${dt} 24:00`;
      }
    }

    timerShow._counter_++;
  }

  function photoFileShow(evt) {
    let [phc, ifc, pid] = _d.querySelectorAll('#formContainer, #infoContainer, #photoId');

    pid.src = evt.target.result;
    ifc.style.display = '';
    phc.style.display = 'none';
  }

  function filePreview(evt) {
    let fr, f0;
    if(evt && evt.target && evt.target.files && (f0 = evt.target.files[0])) {
      fr = new FileReader();
      fr.readAsDataURL(f0); //base64编码
      fr.addEventListener('load', photoFileShow);
    }
  }

  function initEventsBind() {
    let fm = _d.getElementById('loadPhoto');

    fm && fm.addEventListener && fm.addEventListener('change', filePreview);
  }

  function blink() {
    let pic = _d.getElementById('sm-image');
    fadeOut(pic);
  }

  function fadeOut(element) {
    var op = 1;  // initial opacity
    var step = -0.1;
    var flag = 0;
    var timer = setInterval(function () {
	//1  0.9  0.8  0.7  0.6  0.5  0.4  0.3  0.2  0.1  0
        if (op < 0.1){
	    step = 0.1;
	    flag = 1;
        }
	if (flag == 1 && op > 0.9){
            clearInterval(timer);
	}
        element.style.opacity = op;
        op += step;
    }, 50);
  }
  //initEventsBind();
  _w.setInterval(timerShow, SECOND, dts, ddv, dsv, dtv, dev);
  //_w.setInterval(blink, SECOND);
})(window, document);
