document.getElementById('clusterForm').addEventListener('submit', function(event) {

    const originalRanges = {
        ratings: { min: 1, max: 5 },
        ram: { min: 1, max: 16 }, // Em GB
        rom: { min: 8, max: 512 }, // Em GB
        mobile_size: { min: 4, max: 7 }, // Em polegadas
        primary_cam: { min: 5, max: 108 }, // Em megapixels
        selfi_cam: { min: 2, max: 40 }, // Em megapixels
        battery: { min: 1000, max: 5000 }, // Em mAh
        price: { min: 100, max: 2000 } // Em USD
    };
    
    function normalize(value, min, max) {
        return (value - min) / (max - min);
    }    

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

    const inputData = [
        normalize(ratings, originalRanges.ratings.min, originalRanges.ratings.max),
        normalize(ram, originalRanges.ram.min, originalRanges.ram.max),
        normalize(rom, originalRanges.rom.min, originalRanges.rom.max),
        normalize(mobile_size, originalRanges.mobile_size.min, originalRanges.mobile_size.max),
        normalize(primary_cam, originalRanges.primary_cam.min, originalRanges.primary_cam.max),
        normalize(selfi_cam, originalRanges.selfi_cam.min, originalRanges.selfi_cam.max),
        normalize(battery, originalRanges.battery.min, originalRanges.battery.max),
        normalize(price, originalRanges.price.min, originalRanges.price.max)
    ];

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