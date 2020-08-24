	var Change={};
	
    Change.PI= 3.14159265358979324;
	Change.change=function (wgsLat, wgsLon) {
		wgsLat=parseFloat(wgsLat);
		wgsLon=parseFloat(wgsLon);
        if (Change.outOfChina(wgsLat, wgsLon))
            return {lat:wgsLat,lng:wgsLon};
        d =Change.delta(wgsLat, wgsLon);
       	var lat=wgsLat + d['lat'];
       	var lng=wgsLon + d['lng'];
        return {lat:lat,lng:lng};
	}

	Change.antichange = function (wgsLat, wgsLon) {
	    wgsLat = parseFloat(wgsLat);
	    wgsLon = parseFloat(wgsLon);
	    if (Change.outOfChina(wgsLat, wgsLon))
	        return { lat: wgsLat, lng: wgsLon };
	    d = Change.delta(wgsLat, wgsLon);
	    var lat = wgsLat - d['lat'];
	    var lng = wgsLon - d['lng'];
	    return { lat: lat, lng: lng };
	}
    Change.outOfChina=function (lat, lon)
    {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    }
    Change.delta=function(lat, lon)
    {
        var a = 6378245.0;//  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323;//  ee: 椭球的偏心率。
        var dLat = Change.transformLat(lon - 105.0, lat - 35.0);
        var dLon = Change.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * Change.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Change.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Change.PI);
        return {lat:dLat,lng:dLon};
    }
     Change.transformLat=function(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * Change.PI) + 20.0 * Math.sin(2.0 * x * Change.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * Change.PI) + 40.0 * Math.sin(y / 3.0 * Change.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * Change.PI) + 320 *Math.sin(y * Change.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }
 
    Change.transformLon=function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * Change.PI) + 20.0 * Math.sin(2.0 * x * Change.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * Change.PI) + 40.0 * Math.sin(x / 3.0 * Change.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * Change.PI) + 300.0 * Math.sin(x / 30.0 * Change.PI)) * 2.0 / 3.0;
        return ret;
    }