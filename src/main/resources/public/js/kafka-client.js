/**
 * Created by lzz on 2018/1/16.
 */

$(document).ready(function(){
    get("/broker-list?zk=" + getUrlParam('zk'), function(res){
        var brokers = [];
        var hidden_brokers = [];
        var result = res.result;
        for(var i = 0; i < result.length; i++ ){
            brokers.push( result[i].host + ":" + result[i].port + "[" + result[i].jmx_port + "]" );
            hidden_brokers.push( result[i].host + ":" + result[i].port );
        }
        $("#broker-list").data("detail", hidden_brokers.join(","));
        $("#broker-list").text( brokers.join(" , ") );
    });
});

$("#start-consumer").click(function () {
    disconnect();
    var data = {};
    data.brokers = $("#broker-list").data("detail");
    data.topic = $("input[name='topic']").val();
    data.consumer_partition = $("input[name='consumer-partition']").val();
    if( !data.consumer_partition ){
        data.consumer_partition = -1;
    }
    data.partition = $("input[name='partition']").val();
    data.offset = $("input[name='offset']").val();
    if( !data.offset ){
        data.offset = 0;
    }
    connect( JSON.stringify(data) );
});

$("#stop-consumer").click(function () {
    disconnect();
});

$("#topic-list").click(function () {
    get("/topic-list?zk=" + getUrlParam('zk'), function(res){
        var result = res.result;
        var trstr = "<table class='table table-bordered'><tr><th>topic</th><th>partition</th><th>replication</th><th>operation</th></tr>"
        for(var i = 0; i < result.length; i++ ){
            trstr += "<tr>" + "<td><span class='topic-detail' data-detail='" + JSON.stringify(result[i]) + "'>"+ result[i].topic +"</span></td>"+ "<td>"+ result[i].partition +"</td>"+ "<td>"+ result[i].replication +"</td><td> <button  class='remove-topic btn btn-danger btn-xs' data-topic='" + result[i].topic +"'>remove</button> </td></tr>";
        }
        trstr += "</table>"

        $("#topic-list-content").html( trstr );
        $('#topic-list-model').modal('show');
    });
});

$(document).on("click",".remove-topic", function(){
    $("#remove-model").modal('show');
    var data = {};
    data.zk = getUrlParam('zk');
    data.topic = $(this).data("topic");
    $("#remove-confirm").data("detail", JSON.stringify(data));

});

$(document).on("click", "#remove-confirm", function(){
    var data = $("#remove-confirm").data("detail");
    var jsonData = JSON.parse(data);
    get("/delete-topic?zk=" + jsonData.zk + "&topic=" + jsonData.topic, function(res){
        console.log(res);
    });
    window.location.reload();
});

$(document).on("click",".topic-detail", function(){
    var detail = $(this).data("detail");
    $("input[name='topic']").val( detail.topic );
    $("input[name='partition']").val( detail.partition );
    $("input[name='replication']").val( detail.replication );
});

$("#create-topic").click(function () {
    var data = {};
    data.zk = getUrlParam('zk');
    data.topic = $("input[name='topic']").val();
    data.partition = $("input[name='partition']").val();
    data.replication = $("input[name='replication']").val();
    if( data.zk && data.topic && data.partition && data.replication){
        post("/create-topic", data, function (res) {
            console.log(res);
            $("#alert-model-content").text("success create topic");
            $("#alert-model").modal('show');
        });
    }else{
        $("#alert-model-content").text("error format");
        $("#alert-model").modal('show');
    }
});

document.onkeydown=function(e){
    var data = {};
    data.topic = $("input[name='topic']").val();
    data.brokers = $("#broker-list").data("detail");
    if(e.keyCode == 13){
        var message = document.getElementById("producer-text").value;
        var msg = message.split("\n");
        data.msg = msg[ msg.length - 2 ];
        if( msg[ msg.length - 1 ] ){
            data.msg = msg[ msg.length - 1 ];
        }

        if( data.msg && data.topic ){
            post("/producer-msg", data, function (res) {
                console.log(res);
            })
        }
    }
}