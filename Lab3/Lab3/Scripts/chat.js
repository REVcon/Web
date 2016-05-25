function Chat(user) {

    var id = 0;

    WriteResponse = function(messages) {
        var strResult = "";
        $.each(messages, function (index, msg) {
            strResult += "<div class=\"msg\"><b> " + msg.UserName + ": </b>" +
            msg.Content + "</div>";
            id = msg.Id;
        });
        $("#msgBar").html($("#msgBar").html() + strResult);

    }

    WriteResponseUsers = function (users) {
        var strResult = "";
        $.each(users, function (index, user) {
            strResult += "<div><b> " + user.Login + "</b></div>";
        });
        $("#userBar").html(strResult);

    }

    GetAllMessages = function(){
        $.ajax({
            url: 'http://localhost:30933/api/values/'+ id,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                WriteResponse(data);
            },
            error: function (x, y, z) {               
            }
        });
    }

    GetAllUsers = function () {
        $.ajax({
            url: 'http://localhost:30933/api/users',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                WriteResponseUsers(data);
            },
            error: function (x, y, z) {
            }
        });
    }

    AddMessage = function() {
        var msg = {
            Content: $('#newMsgTextarea').val(),
            UserName: user
        };
        $('#newMsgTextarea').val("");

        $.ajax({
            url: '/api/values',
            type: 'POST',
            data: JSON.stringify(msg),
            contentType: "application/json;charset=utf-8",
            success: function (data) {               
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }

    this.Init = function () {
        
        $("#msgBar").css('display', 'block');
        $("#newMsgBar").css('display', 'block');
        $("#loginBar").css('display', 'none');
        $("#userBar").css('display', 'block');

        $("#btnSendMessage").click(function (event) {
            event.preventDefault();
            AddMessage();
        });
        GetAllUsers();
        setInterval("GetAllMessages();", 1000);
    }
}