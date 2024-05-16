
module.exports = (app) => {
  const imgDB = require("./imgDB.js");
  const conn = imgDB.init();
  const fs = require('fs');
  const path = require('path');
  const multer = require('multer'); // 이미지, 동영상 등 업로드 시 필요
  //const imgDB = require('./imgDBcontroller.js');

  const uploadDir = path.join(__dirname, 'CaptureImg');

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now(); // 타임스탬프를 이용하여 파일 이름 생성
      const extension = path.extname(file.originalname); // 원본 파일의 확장자를 가져옴
      const filename = `captured_image_${timestamp}${extension}`;
      req.filename = filename;
      req.timestamp = timestamp;
      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage });


  // 이미지 경로DB 전부 조회

  app.get('/imgS', (req, res) => {
    var sql = "SELECT * FROM images_schema.images";//blobpractice.blob";
    conn.query(sql, function (err, result) {
      if (err) console.log("query is not excuted: " + err);
      else res.send(result);
    });
  })

  //삽입
  app.post('/upload', upload.single('image'), (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // Vue.js 애플리케이션의 주소로 변경
    res.header('Access-Control-Allow-Credentials', true);
    console.log('Image uploaded successfully');

    // jsp는 \를 이스케이프 문자로 처리해버려서 mysql에 삽입할때 \\\\로 바꿔줘야함
    let uploadDirEscaped = uploadDir.replace(/\\/g, "\\\\");
    uploadDirEscaped = uploadDirEscaped + '\\\\' + req.filename;

    const queryString = `INSERT INTO blobpractice.blob VALUES ('${req.timestamp}','${uploadDirEscaped}')`;
    conn.query(queryString, (error, results) => {
      if (error) {
        console.error('Error inserting filename into database:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('File uploaded successfully and filename inserted into database');
      }
    });
  });

  //test이미지 삽입(디버깅용)
  app.get('/testimg', (req, res) => {
    const filePath = "C:\\Users\\Owner\\Desktop\\capture 1.png"
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        conn.end();
        return;
      }

      // 이미지 데이터를 테이블에 삽입
      const sqlQuery = 'INSERT INTO Images (Id, Data) VALUES (?, ?)';
      const values = ['1', data];

      conn.query(sqlQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into the table:', err);
          conn.end();
          return;
        }
        console.log('Data inserted successfully:', results);

        // 연결 종료
        conn.end();
      });
    });
  })

  app.get('/image/:id', (req, res) => {
    const imageId = req.params.id;

    conn.query('SELECT * FROM images_schema.images WHERE Id = 1', (err, results) => {
      if (err) {
        console.error('Error fetching image data:', err);
        res.status(500).send('Error fetching image data');
        return;
      }

      if (results.length === 0 || !results[0].Data) { // 이미지 데이터가 없는 경우 처리
        res.status(404).send('Image not found');
        return;
      }

      const imageData = results[0].image_data.toString('base64'); // 이미지 데이터를 Base64로 인코딩
      const src = `data:image/jpeg;base64,${imageData}`; // Base64 데이터를 이미지 URL로 변환

      res.send(`<img src="${src}" alt="Image">`); // 이미지를 HTML로 응답
    });
  });

  app.get('/build', (req, res) => {
    //execute OS Command    
    const { exec } = require('child_process');
    const inferencefile_loaction = '../../ai-masking/inference.py';
    const im_path1 = './CaptureImg/thor.png  '; //source
    const im_path2 = '../../ai-masking/img/structure/wavy.png'; //target style
    const im_path3 = '../../ai-masking/img/structure/wavy.png'; //color
    const output_dir = './OutputDir/'; //output
    //python inference.py --im_path1 ./img/input/thor_face.png --im_path2 ./img/structure/wavy.png --im_path3 ./img/custom/custom.png --output_dir ./img/output/
    exec(`python ${inferencefile_loaction} --im_path1 ${im_path1} --im_path2 ${im_path2} --im_path3 ${im_path3} --output_dir ${output_dir}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
    res.json({ "message": "빌드 성공" });
  })
}
