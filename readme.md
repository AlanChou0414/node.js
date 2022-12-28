process
  行程

thread
  執行緒

-------------------------
輸出給前端
  res.end()
  res.send()
  res.render()
  res.json()

-------------------------
前端傳入的資料
  req.query  // 取得 query string parameters
  req.body   // 表單資料
  req.file   // 上傳單一檔案時
  req.files   // 上傳多個檔案時

-------------------------
RESTful API 簡略的規則:

GET    /product        # 取得資料列表
GET    /product/:pid   # 取得單筆資料

POST   /product        # 新增資料
PUT    /product/:pid   # 修改資料
DELETE /product/:pid   # 刪除資料

-------------------------

