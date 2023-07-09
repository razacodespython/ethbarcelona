// const { execSync } = require('child_process');
const { createServer } = require('http');
const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
// const installBinaries = () => {
//     try {
//       // Execute the first command
//     //   execSync('curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash', { stdio: 'inherit' });
    
//       // Execute the second command
//     //   execSync('noirup -v 0.6.0', { stdio: 'inherit' });

      
  
//       console.log('Binary installation completed successfully');
//     } catch (error) {
//       console.error('An error occurred during binary installation:', error.message);
//     }
//   };

//   const executeSourceCommand = () => {
//     try {
//       execSync('source /Users/razazaidi/.zshrc', { stdio: 'inherit', shell: '/bin/zsh' });
//       console.log('Command executed successfully');
//       console.log()
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

  // const executeCommand = () => {
  //   try {
  //     const output = execSync('/Users/razazaidi/.nargo/bin/nargo prove p').toString();
  //     console.log('Output:', output);
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

//   const executeSourceNoir = () => {
//     try {
//     execSync('~/.nargo/bin/nargo --version', { stdio: 'inherit' });
//       console.log('Noirup Command executed successfully');
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };
  

  
  // Call the function

//   installBinaries();

//   executeSourceCommand();
//   checkNoir();
  // executeCommand();
//   executeSourceNoir();


app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('Server started on http://localhost:3000');
  });
});
