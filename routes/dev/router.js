const express       = require('express');
const router = express.Router();
const textController = require('../../controllers/textController');

router.get("/Serial1",textController.Serial1)// 测试区分环境
router.get("/Serial2",textController.Serial2)// 操作mongdb库
router.get("/Serial3",textController.Serial3)// 控制cookie 信息的。 
router.get("/Serial4",textController.Serial4)// 中间件捕获方法中抛出的错误
router.get("/Serial5",textController.Serial5)//
router.get("/Serial6",textController.Serial6)//
router.get("/Serial7",textController.Serial7)//
router.get("/Serial8",textController.Serial8)//

module.exports = router;