function ClusterCtrl($scope) {
    $scope.clusters = [];

    $scope.clusters.push({
        "name": "Cluster1",
        "service": [10,5,2,1,2],
        "services": [{
            "name": "Service1",
            "status": "Good",
            "nodes": 2
        }, {
            "name": "Service2",
            "status": "Good",
            "nodes": 3
        }, {
            "name": "TruLink",
            "status": "Good",
            "nodes": 5
        }, {
            "name": "TruCQ",
            "status": "Good",
            "nodes": 1
        }, {
            "name": "TruView",
            "status": "Stopped",
            "nodes": 1
        }, {
            "name": "Service3",
            "status": "Bad",
            "nodes": 3
        }, {
            "name": "Service4",
            "status": "Bad",
            "nodes": 2
        }, {
            "name": "Service5",
            "status": "Unknown",
            "nodes": 3
        }, {
            "name": "Service6",
            "status": "Good",
            "nodes": 5
        }, {
            "name": "Service7",
            "status": "Unknown",
            "nodes": 1
        }],
        "node": [10,9,1,0],
        "nodes": [
            {"ip": "123.211.122.122", "available": true},
            {"ip": "123.211.122.123", "available": true},
            {"ip": "123.211.122.124", "available": false},
            {"ip": "123.211.122.125", "available": true},
            {"ip": "123.211.122.126", "available": true},
            {"ip": "123.211.122.127", "available": true},
            {"ip": "123.211.122.128", "available": true},
            {"ip": "123.211.122.129", "available": true},
            {"ip": "123.211.122.130", "available": true},
            {"ip": "123.211.122.131", "available": true},
            {"ip": "123.211.122.132", "available": true},
            {"ip": "123.211.122.133", "available": true},
            {"ip": "123.211.122.134", "available": true},
            {"ip": "123.211.122.135", "available": true},
            {"ip": "123.211.122.136", "available": true},
            {"ip": "123.211.122.137", "available": true},
            {"ip": "123.211.122.138", "available": true}
        ]
    });

    $scope.clusters.push({
        "name": "Cluster2",
        "service": [4,4,0,0,0],
        "services": [{
            "name": "Service1",
            "status": "Good",
            "nodes": 2
        }, {
            "name": "Service2",
            "status": "Good",
            "nodes": 3
        }, {
            "name": "TruLink",
            "status": "Good",
            "nodes": 5
        }, {
            "name": "TruCQ",
            "status": "Good",
            "nodes": 1
        }],
        "node": [2,1,1,0],
        "nodes": [
            {"ip": "123.211.122.123", "available": true},
            {"ip": "123.211.122.124", "available": true}
        ]
    });
}

jQuery(function ($) {
    $("button.more").on("click", function () {
        $(this).next().dropdown();
    });

    $("#createClusterBtn").on("click", function () {
        $("#clusterModal").modal();
    });
});