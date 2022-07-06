import $ from 'jquery';

  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[now.getDay()];
  
  function printCoupon() {
      if(typeof window !== 'undefined'){
          window.print();
      }
    }
  
    function getUrlVars(){
      var vars = [], hash;
      if(typeof window !== 'undefined'){
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++)
          {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
          }
      }
      return vars;
    }
    var city = getUrlVars()["city"];
  