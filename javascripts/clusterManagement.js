function ClusterCtrl($scope) {
    $scope.clusters = [];

    for (var i = 0; i < 10; i++) {
        $scope.clusters.push({
            "name": "Cluster" + (i + 1),
            "nodes": [parseInt(Math.random() * 10) || 1,parseInt(Math.random() * 10),parseInt(Math.random() * 10)],
            "services": [parseInt(Math.random() * 10),parseInt(Math.random() * 10),parseInt(Math.random() * 10)]
        });
    }
}