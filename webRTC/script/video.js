// 视频聊天房间
var bqn_consultID = '123';
var localEl = document.getElementById('local');
var remoteEl = document.getElementById('remote');
var userModel = document.getElementById('user-model');
//邀请列表
var userList = document.getElementById('user-list');

var videoList = document.getElementById('videos');
var invitInfo = document.getElementById('invitInfo');
var inviteEl = document.getElementById('current-invite');
var menu = document.getElementById('menu')
var currentConversation = null;
var usersref = null;
var auth = null;
var remoteStream = null;
var currentInvite = null;
var outInvite = null;
var localStream = null;


var onInviteCb = function (conversation) {
    incomingConversation = conversation;
    inviteEl.hidden = false;
    invitInfo.textContent = conversation.remoteUid + '向你发出会话邀请';
    //监听被邀请者的事件
    conversation.on('response', function (callstatus) {
        switch (callstatus) {
            case 'TIMEOUT':
                currentInvite = null;
                inviteEl.hidden = true;
                break;
            case 'REJECTED':
                currentInvite = null;
                inviteEl.hidden = true;
                break;
        }
    });
};

var onParticipantDisconnectedCb = function () {
    //如果有远端媒体
    if (remoteStream) {
        remoteStream.detach(remoteEl);
        console.log('participant_disconnected');
        currentConversation.close();
        currentConversation = null;
        usersref.child('users/' + auth.uid).set(true);
    }
}

/*
    页面载入时候触发 
*/


var loginCb = function (user) {
    //页面操作，无关sdk
    videoList.hidden = false;
    auth = user;
    usersref.child('users/' + user.uid).set(true);
    usersref.child('users/' + user.uid).onDisconnect().remove();//监听在线用户列表，并展示除自己之外的用户
    usersref.child('users').on('child_added', function (snap) {
        if (snap.key() != user.uid) {
            console.log('新增了个用户uid是' + snap.key())
            //如果有新的用户则自动发起邀请
            setTimeout(function(){
                invite(snap.key())
            }, 0)
            
        }
    });
    //有用户离开，在 'user-list' 元素中取消该用户
    usersref.child('users').on('child_removed', function (snap) {
        if (snap.key() != user.uid) {
            console.log('123')
        }
    });
}

//监听wilddog sync链接状态的节点
var connectedRef;
//登录
var login = function () {
    //初始化widdog
    var config = {
        authDomain: 'bqn-video.wilddog.com'
    };
    var videoApp = wilddog.initializeApp(config, 'videoApp');
    var syncConfig = {
        syncURL: "https://" + bqn_consultID + ".wilddogio.com"
    };
    var syncApp = wilddog.initializeApp(syncConfig, 'syncApp');
    //定义quickstart使用的用户列表存储路径，userList 可以改为其他自定义路径
    usersref = syncApp.sync().ref();
    connectedRef = syncApp.sync().ref('/.info/connected');
    //获取WilddogVideo对象
    videoInstance = wilddogVideo.getInstance();
    //匿名登录 推荐使用非匿名登录方式
    videoApp.auth().signInAnonymously()
        .then(function (user) {
            
            console.log(user)
            //初始化WilddogVideo对象
            videoInstance.initialize('bqn-video', user.getToken());
            //获取本地媒体流，并绑定到页面
            videoInstance.createLocalStream({
                captureVideo: true,
                captureAudio: true,
                dimension: '480p',
                maxFPS: 15
            })
                .then(function (wdStream) {
                    localStream = wdStream;
                    localStream.attach(localEl);
                    initVideo()
                })
                .catch(function (err) {
                    console.error(err);
                });
                //登录成功后获取是否有新的用户
            loginCb(user);
        })
        .then(function () {
            //监听收到的邀请
            videoInstance.on('called', onInviteCb);
            videoInstance.on('token_error', function () {
                alert('token不合法或过期，请重新登录！');
            })
        })
        .catch(function (err) {
            console.log(err);
            alert('请检查appid是否正确并开启匿名登录功能和实时视频服务！');
        });
};

//接受当前收到的邀请
var accept = function () {
    incomingConversation.accept(localStream).then(conversationStarted);
};

//拒绝当前收到的邀请
var reject = function () {
    incomingConversation.reject();
    inviteEl.hidden = true;
};

var conversationStarted = function (conversation) {
    //监听新参与者加入conversation事件
    conversation.on('stream_received', function (stream) {
        inviteEl.hidden = true;
        usersref.child('users/' + auth.uid).remove();
        remoteStream = stream;
        remoteStream.attach(remoteEl);
    });
    //监听参与者离开conversation事件
    conversation.on('closed', onParticipantDisconnectedCb);

    conversation.on('local_stats', function (statistics) {
        console.log('local_stats', statistics);
    });
    conversation.on('remote_stats', function (statistics) {
        console.log('remote_stats', statistics);
    });
    currentConversation = conversation;
};

//邀请其他用户加入会话
var invite = function (uid) {
    console.log('dianji')
    currentConversation = videoInstance.call(uid, localStream, 'test');
    conversationStarted(currentConversation);
    //监听被邀请者的事件
    currentConversation.on('response', function (callstatus) {
        switch (callstatus) {
            case 'REJECT':
                currentConversation = null;
                break;
            case 'BUSY':
                currentConversation = null;
                break;
        }
    });
};

/*离开当前conversation
    挂断当前通话
*/
var disconnect = function () {
    if (currentConversation) {
        remoteStream.detach(remoteEl);
        //Conversation提供了close函数用于主动离开conversation
        currentConversation.close();
        currentConversation = null;
        usersref.child('users/' + auth.uid).set(true);
    }
}

var initVideo = function () {
    menu.style.display = "block"
}

var stop = function () {
    //禁用视频画面
    localStream.enableVideo(false);
}

window.onload = function(){
    login()
}