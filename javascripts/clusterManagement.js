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
            {"ip": "123.211.122.122", "status": "Available"},
            {"ip": "123.211.122.123", "status": "Available"},
            {"ip": "123.211.122.124", "status": "Unavailable"},
            {"ip": "123.211.122.125", "status": "Available"},
            {"ip": "123.211.122.126", "status": "Available"},
            {"ip": "123.211.122.127", "status": "Available"}
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
            {"ip": "123.211.122.123", "status": "Available"},
            {"ip": "123.211.122.124", "status": "Unavailable"}
        ]
    });
}

jQuery(function ($) {
    $("button.more").on("click", function () {
        $(this).next().dropdown();
    });

    $("button.btn-toggle").on("click", function () {
        $(this).children("i")
            .toggleClass("fa-angle-double-down")
            .toggleClass("fa-angle-double-right");

        $(this).parent().parent().nextAll().slideToggle();
    });

    $("ul.nav-tabs li").on("click", function () {
        if (!$(this).hasClass("active")) {
            $(this).children("a").children("span").removeClass("badge-danger");
            $(this).siblings("li").children("a").children("span").addClass("badge-danger");
        } else {
            $(this).children("a").children("span").addClass("badge-danger");
            $(this).siblings("li").children("a").children("span").removeClass("badge-danger");
        }
    });

    // todo: tab action
});