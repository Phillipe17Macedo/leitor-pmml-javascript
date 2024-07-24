// script.js
document.getElementById('clusterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;

    const ratings = parseFloat(form.ratings.value);
    const ram = parseFloat(form.ram.value);
    const rom = parseFloat(form.rom.value);
    const mobile_size = parseFloat(form.mobile_size.value);
    const primary_cam = parseFloat(form.primary_cam.value);
    const selfi_cam = parseFloat(form.selfi_cam.value);
    const battery = parseFloat(form.battery.value);
    const price = parseFloat(form.price.value);

    const inputData = [ratings, ram, rom, mobile_size, primary_cam, selfi_cam, battery, price];

    const centroids = {
        cluster_1: [0.5491, 0.5065, 0.1429, 0.0776, 0.8036, 0.4372, 0.3557, 0.0110],
        cluster_2: [0.7119, 0.3156, 0.1788, 0.0875, 0.5316, 0.2128, 0.5066, 0.0810],
        cluster_3: [0.8371, 0.6083, 0.5104, 0.1032, 0.7119, 0.4099, 0.6168, 0.2629]
    };

    function calculateDistance(point1, point2) {
        return Math.sqrt(point1.reduce((sum, val, index) => sum + Math.pow(val - point2[index], 2), 0));
    }

    let minDistance = Infinity;
    let assignedCluster = '';

    for (const [cluster, centroid] of Object.entries(centroids)) {
        const distance = calculateDistance(inputData, centroid);
        if (distance < minDistance) {
            minDistance = distance;
            assignedCluster = cluster;
        }
    }

    document.getElementById('result').textContent = `Assigned Cluster: ${assignedCluster}`;
});
