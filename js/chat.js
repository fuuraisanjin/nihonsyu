var milkcocoa = new MilkCocoa("teaiaw0009v.mlkcca.com");
var chatDataStore = milkcocoa.dataStore('chat');
var textArea, board, name, inputDate;

window.onload = function(){
  textArea = document.getElementById("msg");
  board = document.getElementById("chat_board");
}

//送信日時の取得
function newDate(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var inputDate = year + "-" + month + "-" + date +" "+ h + ":" + m + ":" + s;
    return inputDate;
};

//メッセージの送信時の機能
function sendText(text){
    chatDataStore.push({
        message: text,
        name: name,
        inputDate: inputDate
    });
    textArea.value = "";
}

//送信ボタン押下時の挙動
function clickEvent(){
    var text = textArea.value;
    name = $("#chat_user_name input").val();
    inputDate = newDate();
    sendText(text);
}


//チャット画面への表示
function addText(text){
    var msgDom = document.createElement("li");
    msgDom.innerHTML = text.name + ":" + text.inputDate +"<br><span class='message'>"+ text.message + "</span>";
    board.insertBefore(msgDom, board.firstChild);
}
//ミルクココアサーバーへのデータ保存
chatDataStore.on("push",function(data){
    addText(data.value);
});


chatDataStore.stream().size(100).sort('asc').next(function (err,data) {
    $.each( data, function(i,v){
        addText(v.value,0);
    });
});
