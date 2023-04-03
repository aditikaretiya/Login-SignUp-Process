var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_myapp1'
});

connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to Database" + err);
  } else {
    console.log("Connection established");
  }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/pro-add', function(req, res, next) {
  connection.query("select * from tbl_subcategory ", function (err, result) {
    if (err) return err;
    console.log(result);
  res.render('add-product',{mydata:result});
  });
  
});

router.get('/view-product', function(req, res, next) {
  res.render('pro-view');
});

router.post('/productprocess', function(req, res, next) {
    var a = req.body.txt1;
    var b = req.body.txt2;
    var c = req.files.file123;
    var filename = req.files.file123.name;
    var d = req.body.txt3;
    var e = req.body.txt4;
    connection.query("insert into tbl_product(pro_name,pro_price,pro_photo,pro_subcategoryid,pro_details) values(?,?,?,?,?)", [a, b, filename, d, e], function (err, result) {
      if (err) return err;
      console.log("Record inserted");
      c.mv("public/upload/"+filename,function(){
        console.log("File Upload");
      });
      
      res.redirect('/pro-view');
  })
});

router.get('/pro-view', function(req, res, next) {
connection.query("select * from tbl_product", function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('view-product', { mydata:result });
  })
});

router.get('/pro-delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("delete from tbl_product where pro_id= ?",[id], function (err, result) {
    if (err) return err;
    res.redirect('/pro-view');
  })
});

router.get('/pro-edit/:id', function (req, res, next) {
  //connection.query("select * from tbl_subcategory ", function (err, result) {
    //if (err) return err;
    //console.log(result);
  //res.render('edit-product',{mydata:result});
  //});
  var id = req.params.id;
  console.log(id);
  connection.query("select * from tbl_product where pro_id= ?",[id], function (err, result) {
    if (err) return err;
    connection.query("select * from tbl_subcategory ", function (err, result1) {
      if (err) return err;
    console.log(result);
    res.render('edit-product',{mydata:result,mydata1:result1});
  })
})
});

router.post('/pro-updateprocess/:id', function (req, res, next) {
  var id = req.params.id;
  var txt1 = req.body.txt1;
  var txt2 = req.body.txt2;
  var c = req.files.file123;
  var filename = req.files.file123.name;
  var txt3 = req.body.txt3;
  var txt4 = req.body.txt4;
  console.log(id);
  connection.query("update tbl_product set pro_name = ?,pro_price = ?, pro_photo = ?, pro_subcategoryid = ?, pro_details = ? where pro_id= ?",[txt1,txt2,filename,txt3,txt4,id], function (err, result) {
    if (err) return err;
    console.log(result);
    c.mv("public/upload/"+filename,function(){
      console.log("File Upload");
    });
    
    res.redirect('/pro-view');
  })
});

router.get('/add-user', function(req, res, next) {
  res.render('add-user');
});

router.get('/user-add', function(req, res, next) {
  res.render('add-user');
});

router.get('/view-user', function(req, res, next) {
  res.render('user-view');
});

router.post('/userprocess', function(req, res, next) {
    var a = req.body.txt1;
    var b = req.body.txt2;
    var c = req.body.txt3;
    var d = req.body.txt4;
    var e = req.body.txt5;
    var f = req.body.txt6;
    
    connection.query("insert into tbl_user(user_name,user_gender,user_email,user_password,user_mobile,user_address) values(?,?,?,?,?,?)", [a, b, c, d, e, f], function (err, result) {
      if (err) return err;
      console.log("Record inserted");
      res.redirect('/user-view');
  })
});

router.get('/user-view', function(req, res, next) {
connection.query("select * from tbl_user", function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('view-user', { mydata:result });
  })
});

router.get('/user-delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("delete from tbl_user where user_id= ?",[id], function (err, result) {
    if (err) return err;
    res.redirect('/user-view');
  })
});

router.get('/user-edit/:id', function (req, res, next) {
  //connection.query("select * from tbl_user", function (err, result) {
    //if (err) return err;
    //console.log(result);
    //res.render('edit-user', { mydata:result });
  //})
  var id = req.params.id;
  console.log(id);
  connection.query("select * from tbl_user where user_id= ?",[id], function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('edit-user',{mydata:result});
  })
});

router.post('/user-updateprocess/:id', function (req, res, next) {
  var id = req.params.id;
  var txt1 = req.body.txt1;
  var txt2 = req.body.txt2;
  var txt3 = req.body.txt3;
  var txt4 = req.body.txt4;
  var txt5 = req.body.txt5;
  var txt6 = req.body.txt6;
  console.log(id);
  connection.query("update tbl_user set user_name = ?, user_gender = ?, user_email = ?, user_password = ?, user_mobile = ?, user_address = ? where user_id= ?",[txt1,txt2,txt3,txt4,txt5,txt6,id], function (err, result) {
    if (err) return err;
    console.log(result);
    res.redirect('/user-view');
  })
});

router.get('/add-category', function(req, res, next) {
  res.render('add-category');
});

router.get('/cg-add', function(req, res, next) {
  res.render('add-category');
});

router.get('/view-category', function(req, res, next) {
  res.render('cg-view');
});

router.post('/categoryprocess', function(req, res, next) {
  var a = req.body.txt1;
  var b = req.files.file123;
  var filename = req.files.file123.name;
  connection.query("insert into tbl_category(cg_name,cg_photo) values(?,?)", [a, filename], function (err, result) {
    if (err) return err;
    console.log("Record inserted");
    b.mv("public/upload/"+filename,function(){
      console.log("File Upload");
    });
    
    res.redirect('/cg-view');
})
});

router.get('/cg-view', function(req, res, next) {
connection.query("select * from tbl_category", function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('view-category', { mydata:result });
  })
});

router.get('/cg-delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("delete from tbl_category where cg_id= ?",[id], function (err, result) {
    if (err) return err;
    res.redirect('/cg-view');
  })
});

router.get('/cg-edit/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("select * from tbl_category where cg_id= ?",[id], function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('edit-category',{mydata:result});
  })
});

router.post('/cg-updateprocess/:id', function (req, res, next) {
  var id = req.params.id;
  var txt1 = req.body.txt1;
  var b = req.files.file123;
  var filename = req.files.file123.name;
  console.log(id);
  connection.query("update tbl_category set cg_name = ?, cg_photo = ? where cg_id= ?",[txt1,filename,id], function (err, result) {
    if (err) return err;
    console.log(result);
    b.mv("public/upload/"+filename,function(){
      console.log("File Upload");
    });
    
    res.redirect('/cg-view');
  })
});

router.get('/add-subcategory', function(req, res, next) {
     res.render('add-subcategory');
});

router.get('/subcg-add', function(req, res, next) {
  connection.query("select * from tbl_category ", function (err, result) {
    if (err) return err;
    console.log(result);
  res.render('add-subcategory',{mydata:result});
  })
});

router.get('/view-subcategory', function(req, res, next) {
  res.render('subcg-view');
});

router.post('/subcategoryprocess', function(req, res, next) {
  var a = req.body.txt1;
  var b = req.files.file123;
  var filename = req.files.file123.name;
  var c = req.body.txt2;
  connection.query("insert into tbl_subcategory(subcg_name,subcg_photo,subcg_categoryid) values(?,?,?)", [a, filename, c], function (err, result) {
    if (err) return err;
    console.log("Record inserted");
    b.mv("public/upload/"+filename,function(){
      console.log("File Upload");
    });
    
    res.redirect('/subcg-view');
})
});

router.get('/subcg-view', function(req, res, next) {
connection.query("select * from tbl_subcategory", function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('view-subcategory', { mydata:result });
  })
});

router.get('/subcg-delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("delete from tbl_subcategory where subcg_id= ?",[id], function (err, result) {
    if (err) return err;
    res.redirect('/subcg-view');
  })
});

router.get('/subcg-edit/:id', function (req, res, next) {
 // connection.query("select * from tbl_category ", function (err, result) {
   // if (err) return err;
    //console.log(result);
  //res.render('edit-subcategory',{mydata:result});
  //})
  var id = req.params.id;
  console.log(id);
  connection.query("select * from tbl_subcategory where subcg_id= ?",[id], function (err, result) {
    if (err) return err;
  connection.query("select * from tbl_category ", function (err, result1) {
    if (err) return err;
    console.log(result);
    res.render('edit-subcategory',{mydata:result,mydata1:result1});
  })
})
});

router.post('/subcg-updateprocess/:id', function (req, res, next) {
  var id = req.params.id;
  var txt1 = req.body.txt1;
  var b = req.files.file123;
  var filename = req.files.file123.name;
  var txt2 = req.body.txt2;
  console.log(id);
  console.log(req.body);
  connection.query("update tbl_subcategory set subcg_name = ?, subcg_photo = ?, subcg_categoryid = ? where subcg_id= ?",[txt1,filename,txt2,id], function (err, result) {
    if (err) return err;
    console.log(result);
    b.mv("public/upload/"+filename,function(){
      console.log("File Upload");
    });
    
    res.redirect('/subcg-view');
  })
});


  


  


  


router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signupprocess', function (req, res, next) {
  var name = req.body.txt1;
  var gender = req.body.txt2;
  var email = req.body.txt3;
  var password = req.body.txt4;
  var mobile  = req.body.txt5;
  var address = req.body.txt6;

  connection.query("insert into tbl_admin(admin_name,admin_gender,admin_email,admin_password,admin_mobile,admin_address) values(?,?,?,?,?,?)", [name, gender, email, password, mobile, address], function (err, result) { 
    if (err) return err
       res.redirect('/login');
       
    })
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/loginprocess', function (req, res, next) {
  var email = req.body.txt1;
  var password = req.body.txt2;

  connection.query("select * from tbl_admin where admin_email = ? and admin_password = ?", [email, password],
    function (err, result) {
      console.log(result.length);
      console.log(result);

      if (result.length > 0) {
        //Store id in Session
        req.session.userid = result[0].admin_id;
        req.session.username = result[0].admin_name;
        res.redirect('index');
      } else {
        res.send("Login Failed");
      }

    });
});

router.get('/index', function (req, res, next) {

  if (req.session.userid) {   //Fetch Name from Session Variable
    var name = req.session.username;
    res.render('index', { uname: name });
  } else {
    res.redirect('login');
  }

});

router.get('/changepassword', function (req, res, next) {
  res.render('changepassword');
});

router.post('/changepasswordprocess', function (req, res, next) {
  var opass = req.body.txt1;
  var npass = req.body.txt2;
  var cpass = req.body.txt3;
  var uid = req.session.userid;
  //Fetch Old Password 
  if (uid) {
    connection.query("select * from tbl_admin where admin_id = ?", [uid], function (err, result) {
      var opassdb = result[0].admin_password; // Opass

      if (opass == opassdb) {
        if (npass == cpass) {
          connection.query("update tbl_admin set admin_password = ? where admin_id = ?", [npass, uid], function (err, result) {
            res.send("Password changed");
          });
        } else {
          res.send("New and Confirm password not match");
        }
      } else {
        res.send("Old password not match");
      }
    });

  } else {
    res.redirect('/login');
  }
});

router.get('/forgotpassword', function (req, res, next) {
  res.render('forgotpassword');
});

router.post('/forgotpasswordprocess', function (req, res, next) {
  var txt1 = req.body.txt1;
  connection.query("select * from tbl_admin where admin_email = ?", [txt1], function (err, result) {

    if (result.length > 0) {
      var password = result[0].admin_password;
      //Password Message 
      var msg = "Your Password is " + password;
      //Mail Code
      const nodemailer = require("nodemailer");
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "aditikaretiya8@gmail.com", // generated ethereal user
            pass: "eszbrolszrbnhcye        ", // generated ethereal password
          },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'aditikaretiya8@gmail.com', // sender address
          to: txt1, // list of receivers
          subject: "Forgot Password", // Subject line
          text: msg, // plain text body
          html: msg, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      main().catch(console.error);

    }else{
      res.send("User Not Found");
    }

  });


});



module.exports = router;
