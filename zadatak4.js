const fs = require('fs');

const { exec } = require('child_process');


async function writeFile2() {

    const randomContent = "test test test";

    const randomFileName = `zad4.txt`;

    fs.writeFileSync(randomFileName, randomContent)
    
    exec(`ls`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error opening file: ${err}`);
          return;
        }
        console.log(stdout.replace(/\n/g,','));
      });


}

writeFile2()
