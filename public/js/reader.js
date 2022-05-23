const scanner = new Instascan.Scanner({
    video: window.document.getElementById("camera")
});

scanner.addListener("scan", decodificacao => {
    const resultado = window.document.getElementById("decodificacao");
    resultado.value = decodificacao;
});
    
Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else if (cameras.length > 1) {
        scanner.start(cameras[1]);
    } else {
        window.alert("[ERRO] Câmera não identificada neste dispositivo!");
    }
});