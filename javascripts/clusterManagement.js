function ClusterCtrl($scope) {
    $scope.clusters = [];

    $scope.clusters.push({
        "name": "Cluster1",
        "service": [6,4,1,1,0],
        "services": [{
            "name": "TruLink",
            "status": "Good",
            "nodes": 2
        }, {
            "name": "TruCQ",
            "status": "Good",
            "nodes": 3
        }, {
            "name": "TruCEP",
            "status": "Good",
            "nodes": 5
        }, {
            "name": "zookeeper",
            "status": "Good",
            "nodes": 1
        }, {
            "name": "PA Agent",
            "status": "Stopped",
            "nodes": 1
        }, {
            "name": "Storm",
            "status": "Bad",
            "nodes": 3
        }],
        "node": [10,9,1,0],
        "nodes": [
            {"ip": "123.211.122.122", "available": true},
            {"ip": "123.211.122.123", "available": true},
            {"ip": "123.211.122.124", "available": false},
            {"ip": "123.211.122.125", "available": true},
            {"ip": "123.211.122.126", "available": true},
            {"ip": "123.211.122.127", "available": true}
        ]
    });

    $scope.clusters.push({
        "name": "Cluster2",
        "service": [3,3,0,0,0],
        "services": [{
            "name": "TruCQ",
            "status": "Good",
            "nodes": 2
        }, {
            "name": "zookeeper",
            "status": "Good",
            "nodes": 3
        }, {
            "name": "PA Agent",
            "status": "Good",
            "nodes": 5
        }],
        "node": [2,2,0,0],
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
    });

    $("a.service-tab").tab('show');
});