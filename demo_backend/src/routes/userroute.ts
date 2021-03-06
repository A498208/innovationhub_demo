var express = require('express');
var router = express.Router();
import { UserService } from "../service/user.service"
import { DBHelper } from '../utils/dbhelper';
import { User } from '../entity/user';
import { Department } from "src/entity/department";
const userService: UserService = new UserService(new DBHelper("DLC000G4C59H2LD", 1433, "sa", "123456!Q@W", "innovationhub",));
router.post('/', (req, res) => {  
  console.log("add user")
  console.log(req.body);
  const body = req.body
  const user: User = new User()
  user.name = body.name
  user.gender = body.gender
  user.age = body.age
  userService.createUser(user).then((data) => {
    if (data) {
      res.send(data)
    } else {
      res.send("error")
    }
  });
  // const department: Department = new Department()
  // department.departname = "CIO"
  // department.description = "slfjlskfs";
  // userService.createOrUpdateEntity<Department>(department).then((data) => {
  //   if (data) {
  //     res.send(data)
  //   } else {
  //     res.send("error")
  //   }
  // });
});

router.get("/id/:id", (req, res) => {
  console.log(req.params.id)
  userService.findUserById(req.params.id).then((user) => {
    if(user){
      res.send(user)  
    }else {
      res.send("error")
    }
  })
});
  router.delete("/id/:id", (req, res) => {
    console.log(req.params.id)
    userService.deleteuser(req.params.id).then((user) => {
      if(user){
        res.send(user)  
      }else {
        res.send("error")
      }
    })
});

router.get("/nagen/:name/:gender", (req, res) => {

  userService.findUserByNameAndGender(req.params.name, req.params.gender).then((users) => {
    if(users) {
      res.send(users)
    }
  })
})
router.get("/test", (req, res) => {
  userService.addUserCascade().then((user) => {
    if(user) {
      res.send(user)
    }
  })
})
module.exports = router
