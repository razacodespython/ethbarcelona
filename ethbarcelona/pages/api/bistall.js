// import { exec } from 'child_process';

// export default function handler(req, res) {
//   const packageName = 'https://raw.githubusercontent.com/noir-lang/noirup/main/install';
//   const command = 'curl';
//   const args = ['-L', packageName];

//   const installProcess = spawn(command, args);

//   installProcess.on('close', (code) => {
//     if (code === 0) {
//       res.status(200).json({ message: 'Binary installed successfully' });
//     } else {
//       res.status(500).json({ message: 'Installation failed' });
//     }
//   });

// }


// import { exec } from 'child_process';

// export default function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const command = 'curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install';

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//     console.log(`stdout: ${stdout}`);
//     return res.status(200).json({ message: 'Installation completed successfully' });
//   });
// }

