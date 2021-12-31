import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
      const workingDirectory: string | undefined = tl.getInput('workingDirectory', true);
      console.log('Looking into', workingDirectory);
    }
    catch (err : any) {
      tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
