/**
 * Created by lzz on 2018/1/16.
 */

$("#start-consumer").click(function () {
    var data = {};
    data.zk_address = $("input[name='zk-address']").val();
    data.topic = $("input[name='topic']").val();
    data.consumer_partition = $("input[name='consumer-partition']").val();
    data.runtime = $("input[name='runtime']").val();
    connect( JSON.stringify(data) );
});

$("#stop-consumer").click(function () {
    disconnect();
});

$("#create-topic").click(function () {
    var data = {};
    data.zk_address = $("input[name='zk-address']").val();
    data.topic = $("input[name='topic']").val();
    data.partition = $("input[name='partition']").val();
    data.replication = $("input[name='replication']").val();
});