var express = require("express");
var path = require("path");
var axios = require("axios");
var app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/slider", function(request, response) {
    axios.get("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg")
        .then(function(res) {
            response.send(res.data);
        })
});
app.get("/api/r-playlist", function(request, response) {
    axios.get("https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg", {
        params: {
            picmid:1,
            rnd:0.5447423980019914,
            g_tk:5381,
            loginUin:0,
            hostUin:0,
            format:'json',
            inCharset:'utf8',
            outCharset:'utf-8',
            notice:0,
            platform:'yqq.json',
            needNewCode:0,
            categoryId:10000000,
            sortId:5,
            sin:0,
            ein:19
        },
        headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            Origin: "https://y.qq.com",
            Referer: "https://y.qq.com/portal/playlist.html"
        }
    })
        .then(function(res) {
            response.json(res.data);
        })
});
app.get("/api/r-playlist/:disstid", function(request, response) {
    var params = {
        'type':1,
        'json':1,
        'utf8':1,
        'onlysong':0,
        'disstid':request.params.disstid,
        'g_tk':5381,
        'loginUin':0,
        'hostUin':0,
        'format':'json',
        'inCharset':'utf8',
        'outCharset':'utf-8',
        'notice':0,
        'platform':'yqq.json',
        'needNewCode':0,
    }
    var headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Origin': 'https://y.qq.com',
        'Referer': 'https://y.qq.com/n/yqq/playsquare/6925036416.html'
    }
    axios.get("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg", {"params": params, "headers": headers})
        .then(function(res) {
            response.json(res.data.cdlist[0]);
        })
});
app.get("/api/singerlist/hot", function(request, response) {
    function resetData(page) {
        return {
            "comm": {"ct":24,"cv":0},
            "singerList":{
                "module":"Music.SingerListServer",
                "method":"get_singer_list",
                "param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":80*(page-1),"cur_page":page}
            }
        }
    }
    axios.get("https://u.y.qq.com/cgi-bin/musicu.fcg?", {
        params: {
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0,
            data: resetData(1)
        }
    }).then(function (res) {
            response.json(res.data.singerList.data.singerlist);
        });
});
app.get("/api/singerlist/seq", function(request, response) {
    var arr = [];
    for (let i = 1; i <=24; i++) {
        let p = axios.get("https://u.y.qq.com/cgi-bin/musicu.fcg?", {
            params: {
                '-': 'getUCGI24513310925032994',
                g_tk: 5381,
                loginUin: 0,
                hostUin: 0,
                format: 'json',
                inCharset: 'utf8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'yqq.json',
                needNewCode: 0,
                data: {"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":i,"sin":0,"cur_page":1}}}
            }
        });
        arr.push(p);
    }
    Promise.all(arr).then(function(res) {
        var arr2 = [];
        for (let item of res) {
            let tmp = {index: item.data.singerList.data.index, singerlist: item.data.singerList.data.singerlist};
            arr2.push(tmp)
        }
        response.send(arr2);
    })
});
app.get("/api/songlist/:mid", function(request, response) {
    axios.get("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg", {
        params: {
            g_tk:5381,
            loginUin:0,
            hostUin:0,
            format:'json',
            inCharset:'utf8',
            outCharset:'utf-8',
            notice:0,
            platform:'yqq',
            needNewCode:0,
            ct:24,
            singermid:request.params.mid,
            order:'listen',
            begin:0,
            num:15
        }
    }).then(function(res) {
        response.send(res.data.data);
    })
});
app.get("/api/song/:songmid", function(request, response) {
    axios.post("https://u.y.qq.com/cgi-bin/musicu.fcg", {
        "req_0": {
            "module": "vkey.GetVkeyServer",
            "method": "CgiGetVkey",
            "param": {
                "guid": "1389405640",
                "songmid": [request.params.songmid],
                "songtype": [],
                "uin": "0",
                "loginflag": 0,
                "platform": "23",
                "h5to": "speed"
            }
        },
        "comm": {
            "g_tk": 5381,
            "uin": 0,
            "format": "json",
            "ct": 23,
            "cv": 0
        }
    }).then(function(res) {
        if (res.data.req_0.data.midurlinfo[0].purl) {
            response.send(res.data.req_0.data.midurlinfo[0].purl);
        } else {
            response.send(false);
        }
    })
});
app.get("/api/lyric/:songmid", function(request, response) {
    axios.get("https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg", {
        params: {
        '-':'MusicJsonCallback_lrc',
        'pcachetime':'1555489661409',
        'songmid':request.params.songmid,
        'g_tk':5381,
        'loginUin':0,
        'hostUin':0,
        'format':'json',
        'inCharset':'utf8',
        'outCharset':'utf-8',
        'notice':0,
        'platform':'yqq.json',
        'needNewCode':0
        },
        headers: {
            'Origin': 'https://y.qq.com',
            'Referer': 'https://y.qq.com/portal/player.html'
        }
    })
        .then(function(res) {
            response.send(res.data.lyric);
        })
});
app.get("/api/rank", function(request, response) {
    axios.get("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1555520462939&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1")
        .then(function(res) {
            response.json(res.data.data.topList)
        })
});
app.get("/api/rank2", function (request, response) {
    axios.get("https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom6755305628060821&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={\"comm\":{\"ct\":24},\"toplist\":{\"module\":\"musicToplist.ToplistInfoServer\",\"method\":\"GetAll\",\"param\":{}}}")
        .then(function (res) {
            var group = res.data.toplist.data.group;
            var arr = [];
            for (let item of group) {
                arr = arr.concat(item.toplist);
            }
            response.json(arr);
        })
});
app.get("/api/rank/:topId/:period", function(request, response) {
    var data = {
            "detail":{
                "module":"musicToplist.ToplistInfoServer",
                "method":"GetDetail",
                "param":{
                    "topId":parseInt(request.params.topId),
                    "offset":0,
                    "num":20,
                    "period":request.params.period
                }
            },
            "comm":{"ct":24,"cv":0}
        };
    var str = JSON.stringify(data);
    axios.get(`https://u.y.qq.com/cgi-bin/musicu.fcg?data=${str}`)
        .then(function(res) {
            response.json(res.data);
        })
});


app.listen(3001);