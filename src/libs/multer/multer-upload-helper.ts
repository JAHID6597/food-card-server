// import multer from 'multer';
// import path from 'path';

// export class MulterUploadHelper {
//   public multerUpload() {
//     return multer({
//       storage: multer.diskStorage({}),
//       limits: {
//         fileSize: 2 * 1024 * 1024,
//       },
//       fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname);

//         if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
//           cb(new Error('Only images are allowed!'), false);
//           return;
//         }

//         cb(null, true);
//       },
//     });
//   }
// }
