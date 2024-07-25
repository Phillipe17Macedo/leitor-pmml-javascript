document.getElementById('clusterForm').addEventListener('submit', function(event) {
    event.preventDefault();

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

    const weights = {
        ratings: 1,
        ram: 1,
        rom: 1,
        mobile_size: 1,
        primary_cam: 1,
        selfi_cam: 1,
        battery: 1,
        price: 1
    };

    function normalize(value, min, max) {
        return parseFloat(((value - min) / (max - min)).toFixed(6)); // Usar mais casas decimais
    }

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
        normalize(ratings, originalRanges.ratings.min, originalRanges.ratings.max) * weights.ratings,
        normalize(ram, originalRanges.ram.min, originalRanges.ram.max) * weights.ram,
        normalize(rom, originalRanges.rom.min, originalRanges.rom.max) * weights.rom,
        normalize(mobile_size, originalRanges.mobile_size.min, originalRanges.mobile_size.max) * weights.mobile_size,
        normalize(primary_cam, originalRanges.primary_cam.min, originalRanges.primary_cam.max) * weights.primary_cam,
        normalize(selfi_cam, originalRanges.selfi_cam.min, originalRanges.selfi_cam.max) * weights.selfi_cam,
        normalize(battery, originalRanges.battery.min, originalRanges.battery.max) * weights.battery,
        normalize(price, originalRanges.price.min, originalRanges.price.max) * weights.price
    ];

    const centroids = {
        cluster_1: [0.549084, 0.506484, 0.142858, 0.077575, 0.803553, 0.437170, 0.355720, 0.010999],
        cluster_2: [0.711875, 0.315625, 0.178839, 0.087464, 0.531568, 0.212772, 0.506601, 0.080980],
        cluster_3: [0.837143, 0.608333, 0.510386, 0.103209, 0.711945, 0.409938, 0.616848, 0.262862]
    };

    function calculateDistance(point1, point2) {
        return Math.sqrt(point1.reduce((sum, val, index) => sum + Math.pow(val - point2[index], 2) * weights[Object.keys(weights)[index]], 0));
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

    let message = '';

    switch (assignedCluster) {
        case 'cluster_1':
            message = 'Cluster 1: Pode representar dispositivos de entrada com baixo preço e especificações básicas.';
            break;
        case 'cluster_2':
            message = 'Cluster 2: Pode representar dispositivos de médio porte com especificações e preços intermediários.';
            break;
        case 'cluster_3':
            message = 'Cluster 3: Pode representar dispositivos premium com alta performance e preço elevado.';
            break;
    }

    document.getElementById('result').textContent = `Assigned Cluster: ${assignedCluster}\n${message}`;
});