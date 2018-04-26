$(document).ready(function(){
    get("/consumer-groups?zk=" + getUrlParam('zk'), function(res){
        var consumers = [];
        var hidden_consumers = [];
        var result = res.result;
        var str = "<table class='table table-condensed'>"
        for(var i = 0; i < result.length; i++ ){
            try{
                var consumer = result[i].consumer;
                var topic = result[i].topic;
                var partitions = result[i].partitions;
                str += "<tr class='consumer-detail' data-detail='" + JSON.stringify(result[i]) + "'><td class='consumer-name'>" + consumer + "</td><td class='consumer-topic'>" + topic + "</td></tr>";
            }catch(err){

            }

        }
        str += "</table>";
        $("#consumer-groups").html( str );
    });

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


$(document).on("click",".consumer-detail", function(){
    var brokerDetail = $("#broker-list").data("detail");
    var broker = brokerDetail.split(",")[0];
    var detail = $(this).data("detail");
    $("#monitor-target").html( "<span>consumer[" + detail.consumer + "] , topic [" + detail.topic + "]</span>" );
    detail.broker = broker;
    detail.zk = getUrlParam('zk');
    post("/consumer-detail", detail, function (res) {
        var result = res.result;
        var trstr = "<table class='table table-bordered'><th>Partition</th><th>logSize</th><th>Offset</th><th>Lag</th><th>Created</th>"
        for(var i = 0; i < result.length; i++ ){
            trstr += "<tr><td>" + result[i].partition + "</td><td>" + result[i].logSize + "</td><td>" + result[i].offset + "</td><td>" + result[i].lag + "</td><td>" + result[i].date + "</td></tr>";
        }
        trstr += "</table>";
        $("#consumer-monitor-content").html( trstr );
    }, true);
});