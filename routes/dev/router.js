const express       = require('express');
const router = express.Router();
const textController = require('../../controllers/textController');

router.get("/Serial1",textController.Serial1)// 测试区分环境
router.get("/Serial14",textController.Serial14)// 测试区分环境
router.get("/Serial2",textController.Serial2)// 操作mongdb库
router.get("/Serial3",textController.Serial3)// 控制cookie 信息的。 
router.get("/Serial4",textController.Serial4)// 中间件捕获方法中抛出的错误
router.get("/Serial5",textController.Serial5)// 可读流， 写入流。 
router.get("/Serial6",textController.Serial6)// send write 
router.get("/Serial7",textController.Serial7)//  fenci
router.get("/Serial8",textController.Serial8)// 
router.get("/Serial9",textController.Serial9)// gm 画图片
router.get("/Serial10",textController.Serial10)//  mongdb  多表联查 同库， 异库， 聚合， 关联
router.get("/Serial11",textController.Serial11)//   读文件， 调用百度接口
router.get("/Serial12",textController.Serial12)//  调用百度接口脚本
router.get("/Serial13",textController.Serial13)//  调用百度接口脚本
router.get("/hello",textController.hello)//  模拟远程调用
router.get("/log",textController.log)//  模拟远程调用
router.get("/for",textController.for)//  模拟远程调用
router.get("/aline",textController.aline)//  模拟远程调用
router.get("/douyin",textController.douyin)//  模拟远程调用



router.get("/add",textController.add)//  模拟远程调用


module.exports = router;