let { PythonShell } = require('python-shell')

PythonShell.run('head.py', null, (err, data) => {
    if (err) throw err;

    console.log(data);
});