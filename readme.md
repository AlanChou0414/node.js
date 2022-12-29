### process
  - 行程

### thread
  - 執行緒

-------------------------
### 輸出給前端
  - res.end()
  - res.send()
  - res.render()
  - res.json()
  - res.redirect()

-------------------------
### 前端傳入的資料
  - req.query   // 取得 query string parameters
  - req.params  // 網址列上的參數
  - req.body    // 表單資料
  - req.file    // 上傳單一檔案時
  - req.files   // 上傳多個檔案時
  - req.session // 使用 express-session 時

-------------------------
### RESTful API 簡略的規則:
  - GET    /product        # 取得資料列表
  - GET    /product/:pid   # 取得單筆資料
  - POST   /product        # 新增資料
  - PUT    /product/:pid   # 修改資料
  - DELETE /product/:pid   # 刪除資料

-------------------------

### Homework
  1. address-book list  先做生日轉換
  2. 寫 html 用 ajax 呼叫 list api 呈現畫面

