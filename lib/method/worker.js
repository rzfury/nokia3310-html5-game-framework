let workers = [];

function CreateWorker(scriptDir) {
    const worker = new Worker(scriptDir);
    workers.push(worker);

    return worker;
}

function GetWorker(id) {
    return workers[id];
}
